from flask import Blueprint, jsonify
from app.models import User, Review
from flask_login import login_required


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
@login_required
def reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}
