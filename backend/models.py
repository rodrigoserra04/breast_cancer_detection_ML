from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, Text, Enum
from database import Base
from enum import Enum as PyEnum

class UserType(PyEnum):
    doctor = "doctor"
    patient = "patient"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)
    user_type = Column(Enum(UserType), nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, user_type={self.user_type})>"

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    input_features = Column(Text)
    prediction_result = Column(Text)
    created_at = Column(TIMESTAMP, nullable=False)
