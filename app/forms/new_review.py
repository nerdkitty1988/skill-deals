from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, ValidationError


class ReviewForm(FlaskForm):
    author_id = IntegerField('author_id', validators=[DataRequired()])
    reviewed_user_id = IntegerField(
        'reviewed_user_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    comment = TextAreaField('comment', validators=[DataRequired()])
