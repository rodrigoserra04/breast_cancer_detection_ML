from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Load preprocessed data to train the model
X_train = joblib.load("X_train.pkl")
y_train = joblib.load("y_train.pkl")
X_test = joblib.load("X_test.pkl")
y_test = joblib.load("y_test.pkl")
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

joblib.dump(model, "breast_cancer_model.pkl")
print("Model saved as breast_cancer_model.pkl")
