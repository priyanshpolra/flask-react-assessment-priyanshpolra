import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # Using SQLite for simplicity
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "data.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # You can add a secret key if needed
    SECRET_KEY = "super-secret-key"
