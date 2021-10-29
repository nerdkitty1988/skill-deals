from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, Email, NumberRange, ValidationError, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    public_email = StringField('public_email', validators=[DataRequired(), Email()])
    password = StringField('password', validators=[DataRequired(), Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", message='Password must be a minimum of 8 characters long, and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.')])
    address = StringField('address', validators=[DataRequired()])
    range = IntegerField('range', validators=[DataRequired(), NumberRange(min=1, max=None, message='Please enter at least 1 mile')])
    profile_pic = StringField('profile_pic')
