from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import Email


class EditProfileForm(FlaskForm):

    public_email = StringField('public_email', validators=[ Email()])
    address = StringField('address')
    range = IntegerField('range')
    profile_pic = StringField('profile_pic')
