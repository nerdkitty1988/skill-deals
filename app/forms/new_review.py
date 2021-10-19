from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def rating_restraint(form, field):
    # Checking if username is already in use
    rating = field.data
    wrong_range = rating < 0 or rating > 10
    if wrong_range:
        raise ValidationError('Must be a number between 0 and 10')

class ReviewForm(FlaskForm):
    author_id = IntegerField('author_id', validators=[DataRequired()])
    reviewed_user_id = IntegerField('reviewed_user_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), rating_restraint])
    comment = TextAreaField('comment', validators=[DataRequired()])
