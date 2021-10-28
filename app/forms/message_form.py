from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, StringField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    receiver_id = IntegerField('receiver_id', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    room_id = StringField('room_id', validators=[DataRequired()])
