from flask import Blueprint, jsonify
from app.models import User, Offer
from flask_login import login_required
from app.api.route_helpers import get_distance


offer_routes = Blueprint('offers', __name__)


@offer_routes.route('/')
def offers():
    offers = Offer.query.all()
    return {"offers": [offer.to_dict() for offer in offers]}


@offer_routes.route('/near/<int:user_id>/')
def close_offers(user_id):
    offerList = []
    offerDistance = {}
    user = User.query.get(user_id)
    offers = Offer.query.all()
    for offer in offers:
        distance = get_distance(user.zipcode, offer.zipcode)
        if distance <= offer.location_range:# and user_id != offer.user_id:
            offerDistance[offer.id] = distance
            offerList.append(offer)
    return {"closeOffers": [offr.to_dict() for offr in offerList], "offerDistance": offerDistance}
