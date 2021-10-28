from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField, StringField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired


class MessageForm(FlaskForm):
    sender_id = IntegerField('senderId', validators=[DataRequired()])
    receiver_id = IntegerField('receiverId', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired()])
    room_id = StringField('roomId', validators=[DataRequired()])
