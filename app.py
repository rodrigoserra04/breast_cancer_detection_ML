from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Loading the trained model and scaler
model = joblib.load("breast_cancer_model.pkl")
scaler = joblib.load("scaler.pkl")

class CancerFeatures(BaseModel):
    features: list

@app.post("/predict/")
def predict(data: CancerFeatures):
    """
    Predict whether the tumor is malignant or benign.
    """
    input_features = np.array(data.features).reshape(1, -1)
    scaled_features = scaler.transform(input_features)

    # Using the loaded model to make predictions
    prediction = model.predict(scaled_features)[0]
    result = "Malignant" if prediction == 1 else "Benign"

    return {"prediction": result}

@app.get("/")
def home():
    return {"message": "Breast Cancer Detection API is running!"}
