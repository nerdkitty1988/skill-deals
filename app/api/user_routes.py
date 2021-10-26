from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.edit_profile_form import EditProfileForm
from app.models import User, db


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/edit/<int:id>/', methods=['PATCH'])
@login_required
def edit_user(id):
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.public_email = form.data['public_email']
        user.range = form.data['range']
        user.address = form.data['address']
        user.profile_pic = form.data['profile_pic']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>/')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
