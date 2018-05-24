from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email, EqualTo

class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('로그인')

class RegisterForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), Email()])
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('회원가입')

class ForgotPasswordForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), Email()])
    username = StringField('username', validators=[DataRequired()])
    submit = SubmitField('Submit')

class ResetPasswordForm(FlaskForm):
    password1 = PasswordField('password1', validators=[DataRequired()])
    password2 = PasswordField('repeat password', validators=[DataRequired(), EqualTo('password1')])
    submit = SubmitField('재설정')