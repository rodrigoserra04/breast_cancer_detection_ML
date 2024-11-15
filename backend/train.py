from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.model_selection import GridSearchCV
import pandas as pd
import numpy as np
import joblib

# Load the dataset
df = pd.read_csv("breast_cancer_data.csv")
X = df.drop("target", axis=1)
y = df["target"]

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Hyperparameter tuning for Random Forest
rf_params = {'n_estimators': [50, 100, 200], 'max_depth': [4, 8, 16]}
rf_model = GridSearchCV(RandomForestClassifier(random_state=42), rf_params, cv=3, scoring='accuracy')
rf_model.fit(X_train, y_train)

# Train Logistic Regression
lr_model = LogisticRegression(random_state=42, max_iter=500)
lr_model.fit(X_train, y_train)

# Train XGBoost
xgb_model = XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss')
xgb_model.fit(X_train, y_train)

# Evaluate all models
models = {"Random Forest": rf_model.best_estimator_, "Logistic Regression": lr_model, "XGBoost": xgb_model}

for name, model in models.items():
    print(f"Evaluation for {name}:")
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

# Save the best-performing model
best_model = rf_model.best_estimator_
joblib.dump(best_model, "breast_cancer_model.pkl")
print("Best model saved as breast_cancer_model.pkl")
