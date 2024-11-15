from sklearn.datasets import load_breast_cancer
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

# Loading the dataset and converting to a data frame
data = load_breast_cancer()
df = pd.DataFrame(data.data, columns=data.feature_names)
df['target'] = data.target
df.to_csv("breast_cancer_data.csv", index=False)

print(df.head())
print(df.info())
print(df['target'].value_counts())
df = pd.read_csv("breast_cancer_data.csv")

# Split data into features (X) and target (y)
X = df.drop("target", axis=1)
y = df["target"]

# Split into training and testing sets and normalizying the data with scaller
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled  = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
joblib.dump(X_train_scaled, "X_train.pkl")
joblib.dump(X_test_scaled, "X_test.pkl")
joblib.dump(y_train, "y_train.pkl")
joblib.dump(y_test, "y_test.pkl")
joblib.dump(scaler, "scaler.pkl")
