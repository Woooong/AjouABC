from flask_sqlalchemy import SQLAlchemy
from passlib.hash import bcrypt
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.encrypt(password)

    def __repr__(self):
        return '<User %r>' % self.username
