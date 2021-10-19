from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired



class TradeForm(FlaskForm):
    latitude = StringField('latitude', validators=[DataRequired()])
    longitude = StringField('longitude', validators=[DataRequired()])
    location_range = IntegerField('location_range', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
