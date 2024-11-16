from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel
import joblib, shap, json
import numpy as np
import pandas as pd
from io import StringIO
from sqlalchemy import create_engine
from database import get_db
from auth import UserCreate, Token, authenticate_user, create_access_token, get_current_user, get_password_hash
from models import User, Prediction
from config import DATABASE_URL
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# List of allowed origins (React frontend)
origins = [
    "http://localhost:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Loading the trained model and scaler
model = joblib.load("breast_cancer_model.pkl")
scaler = joblib.load("scaler.pkl")

# Initialize SHAP explainer
explainer = shap.Explainer(model)

# Database connection
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

# Feature names (for explainability)
df = pd.read_csv("breast_cancer_data.csv")
feature_names = df.columns[:-1]

# Pydantic model for input
class CancerFeatures(BaseModel):
    features: list

@app.get("/")
def home():
    return {"message": "Breast Cancer Detection API is running!"}


### **User Registration & Authentication Endpoints**

@app.post("/register/")
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    """
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    return {"message": "User registered successfully"}

@app.post("/login/", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    """
    Login and get access token.
    """
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token({"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


### **Prediction Endpoin**

@app.post("/predict/")
def predict(data: CancerFeatures, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Predict whether the tumor is malignant or benign.
    """
    input_features = np.array(data.features).reshape(1, -1)
    scaled_features = scaler.transform(input_features)

    # Using the loaded model to make predictions
    prediction = model.predict(scaled_features)[0]
    result = "Malignant" if prediction == 1 else "Benign"

    # Save the prediction to the database
    db_prediction = Prediction(user_id=user.id, input_features=str(data.features), prediction_result=result)
    db.add(db_prediction)
    db.commit()

    return {"prediction": result}


@app.post("/predict_batch/")
async def predict_batch(file: UploadFile = File(...), db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Predict for a batch of samples uploaded as a CSV file.
    """
    # Read the CSV file
    content = await file.read()
    df = pd.read_csv(StringIO(content.decode('utf-8')))

    # Preprocess and predict
    scaled_data = scaler.transform(df.values)
    predictions = model.predict(scaled_data)
    df["Prediction"] = ["Malignant" if p == 1 else "Benign" for p in predictions]

    # Log the batch predictions into the database
    for index, row in df.iterrows():
        db_prediction = Prediction(user_id=user.id, input_features=str(row.values), prediction_result=row["Prediction"])
        db.add(db_prediction)
    
    db.commit()

    # Return results
    return df.to_dict(orient="records")


### **Explanation Endpoint**
@app.post("/explain/")
def explain(data: CancerFeatures, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """
    Explain the prediction for the given features.
    """
    features = np.array(data.features).reshape(1, -1)
    scaled_features = scaler.transform(features)
    shap_values = explainer(scaled_features)
    shap_values_flat = shap_values[0].values.flatten()
    shap_summary = dict(zip(feature_names, [float(v) for v in shap_values_flat]))
    shap_summary_str = json.dumps(shap_summary)

    db_prediction = Prediction(user_id=user.id, input_features=str(data.features), prediction_result=shap_summary_str)
    db.add(db_prediction)
    db.commit()

    return {"explanation": shap_summary}