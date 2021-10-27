from flask import Blueprint, jsonify
from app.models import User, Request, Offer


search_routes = Blueprint('search', __name__)


@search_routes.route('/<searchTerm>')
def searchResults(searchTerm):
    offers_by_title = Offer.query.filter(Offer.title.ilike(f'{searchTerm}%'))
    offers = [offer.to_dict() for offer in offers_by_title]
    offers_by_description = Offer.query.filter(Offer.description.ilike(f'{searchTerm}%'))
    offerDescriptions = [offer.to_dict() for offer in offers_by_description]

    requests_by_title = Request.query.filter(Request.title.ilike(f'{searchTerm}%'))
    requests = [request.to_dict() for request in requests_by_title]
    requests_by_description = Request.query.filter(Request.description.ilike(f'{searchTerm}%'))
    requestDescriptions = [request.to_dict() for request in requests_by_title]

    users_by_username = User.query.filter(User.username.ilike(f'{searchTerm}%'))
    users = [user.to_dict() for user in users_by_username]
    users_by_username = User.query.filter(User.public_email.ilike(f'{searchTerm}%'))
    userEmails = [user.to_dict() for user in users_by_username]
    return {
        'offers': [*offers, *offerDescriptions],
        'requests': [*requests, *requestDescriptions],
        'users': [*users, *userEmails]
    }
