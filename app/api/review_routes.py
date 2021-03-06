from flask import Blueprint, jsonify, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import User, Review, db
from flask_login import login_required
from app.forms.new_review import ReviewForm


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
@login_required
def reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def add_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            author_id=form.data['author_id'],
            reviewed_user_id=form.data['reviewed_user_id'],
            rating=form.data['rating'],
            comment=form.data['comment']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>/', methods=['PATCH'])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)

        review.author_id=form.data['author_id'],
        review.reviewed_user_id=form.data['reviewed_user_id'],
        review.rating=form.data['rating'],
        review.comment=form.data['comment']

        db.session.commit()
        return {'review': review.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/delete/<int:review_id>/', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'review deleted successfully'}
