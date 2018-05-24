import json

from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()
SALT = b'$2b$12$lkx75uvI9VwWAAIErNb/7.'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    emotions = db.relationship('Emotion', backref='user', lazy=True)

    def __init__(self, username, email, password_text):
        self.username = username
        self.email = email
        self.password = self.set_password(password_text)

    def set_password(self, password_text):
        password = bcrypt.hashpw(password_text.encode('utf-8'), SALT)
        return password.decode('utf-8')

    def reset_password(self, password_text):
        password = bcrypt.hashpw(password_text.encode('utf-8'), SALT)
        return password.decode('utf-8')

    def __repr__(self):
        return '<User %r>' % self.username

    def append_emotion(self, e):
        e.user = self


class Emotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    anger = db.Column(db.Float)
    contempt = db.Column(db.Float)
    disgust = db.Column(db.Float)
    fear = db.Column(db.Float)
    happiness = db.Column(db.Float)
    neutral = db.Column(db.Float)
    sadness = db.Column(db.Float)
    surprise = db.Column(db.Float)
    result = db.Column(db.String(10))

    def __init__(self, user, emotion_json, res, date=datetime.now().strftime("%Y-%m-%d %H:%M")):
        self.user_id = user.id
        self.date = date
        self.result = res
        self._parse(emotion_json)
        # self._calculate_result()

    def _parse(self, emotion_json):
        e = json.loads(emotion_json)
        self.anger = e['anger']
        self.contempt = e['contempt']
        self.disgust = e['disgust']
        self.fear = e['fear']
        self.happiness = e['happiness']
        self.neutral = e['neutral']
        self.sadness = e['sadness']
        self.surprise = e['surprise']

    def _calculate_result(self):
        self.result = ''


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), unique=True, nullable=False)
    emotion = db.Column(db.String(10), nullable=True)
    tag1 = db.Column(db.String(50), nullable=True)
    tag2 = db.Column(db.String(50), nullable=True)

    def __init__(self, question, date=datetime.now()):
        q = json.loads(question)
        self.content = q['q_content']
        self.emotion = q['q_emotion']
        self.tag1 = q['q_tag1']
        self.tag2 = q['q_tag2']


class UserQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(Question.id), nullable=False)
    question_content = db.Column(db.String(1000), db.ForeignKey(Question.content))
    question_reply = db.Column(db.String(200), nullable=True)
    created = db.Column(db.DateTime, nullable=False)
    updated = db.Column(db.DateTime, nullable=False)

    def __init__(self, user, question, reply, date=datetime.now()):
        self.user_id = user.id
        self.question_id = question.id
        self.question_content = question.content
        self.question_reply = reply
        self.created = date
        self.updated = date
