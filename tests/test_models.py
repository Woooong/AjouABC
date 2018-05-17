import json
import bcrypt
import pyexcel as pexcel
from datetime import datetime
from models import db, User, SALT, Emotion, Question
from flask import Flask, session


def test_user():
    name = 'ryun'
    passwd = 'aloha'
    u = User(username=name, password=passwd)
    assert u.username == name
    assert u.password == bcrypt.hashpw(passwd.encode(), SALT)


def test_create_emotion():
    str = '''{
            "anger": 0.037,
            "contempt": 0.001,
            "disgust": 0.015,
            "fear": 0.001,
            "happiness": 0.939,
            "neutral": 0.001,
            "sadness": 0.0,
            "surprise": 0.007
          }'''

    u = User(username='ryun', password='aloha')
    e = Emotion(user=u, emotion_json=str, res='', date=datetime.now().strftime("%Y-%m-%d %H:%M"))

    parsed = json.loads(str)
    assert parsed['anger'] == e.anger
    assert parsed['contempt'] == e.contempt
    assert parsed['disgust'] == e.disgust
    assert parsed['fear'] == e.fear
    assert parsed['happiness'] == e.happiness
    assert parsed['neutral'] == e.neutral
    assert parsed['sadness'] == e.sadness
    assert parsed['surprise'] == e.surprise

    assert datetime.now().strftime("%Y-%m-%d %H:%M") == e.date


def test_user_create_emotion():
    u = User(username='ryun', password='aloha')
    u.id = 1
    str = '''{
        "anger": 0.037,
        "contempt": 0.001,
        "disgust": 0.015,
        "fear": 0.001,
        "happiness": 0.939,
        "neutral": 0.001,
        "sadness": 0.0,
        "surprise": 0.007
      }'''

    e = Emotion(user=u, emotion_json=str, res='', date=datetime.now())
    u.append_emotion(e)
    assert u.emotions[0] == e


def test_create_question():
    question = dict()

    records = pexcel.iget_records(file_name="questions.xls")
    # records = pexcel.iget_records(file_name="ABC_questions.xlsx")
    for record in records:
        question['q_content'] = record['질문']
        question['q_emotion'] = record['감정분류']
        question['q_tag1'] = record['태그1']
        question['q_tag2'] = record['태그2']
        q = Question(question=json.dumps(question))
        # db.session.add(q)
        # db.session.commit()

        print(question)