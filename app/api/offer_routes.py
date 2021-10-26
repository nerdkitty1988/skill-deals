from flask import Blueprint, jsonify, session, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.new_trade import TradeForm
from app.api.route_helpers import Haversine
from app.models import User, Offer, db
from flask_login import login_required
from sqlalchemy import desc
# from app.api.route_helpers import get_distance


offer_routes = Blueprint('offers', __name__)


@offer_routes.route('/', methods=['POST'])
@login_required
def create_offer():
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_offer = Offer(
            title=form.data['title'],
            description=form.data['description'],
            user_id=form.data['user_id']
        )
        db.session.add(new_offer)
        db.session.commit()
        return new_offer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@offer_routes.route('/edit/<int:offer_id>/', methods=['PATCH'])
@login_required
def update_offer(offer_id):
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        offer = Offer.query.get(offer_id)
        offer.title = form.data['title']
        offer.description = form.data['description']
        db.session.commit()
        return offer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@offer_routes.route('/')
def offers():
    offers = Offer.query.order_by(desc(Offer.time_created)).all()
    return {"offers": [offer.to_dict() for offer in offers]}


@offer_routes.route('/near/<int:user_id>/')
def close_offers(user_id):
    offerList = []
    offerDistance = {}
    user = User.query.get(user_id)
    user_info = [user.lat, user.lon]
    offers = Offer.query.order_by(Offer.time_created).all()
    for offer in offers:
        offer_info = [offer.user.lat, offer.user.lon]
        distance = Haversine(user_info, offer_info).miles
        if distance <= offer.user.range and user_id != offer.user_id:
            offerDistance[offer.id] = distance
            offerList.append(offer)
    return {"closeOffers": [offr.to_dict() for offr in offerList], "offerDistance": offerDistance}


@offer_routes.route('/<int:offer_id>/')
def single_offer(offer_id):
    offer = Offer.query.get(offer_id)
    return {"offer": offer.to_dict()}


@offer_routes.route('/delete/<int:offer_id>/', methods=['DELETE'])
@login_required
def delete_offer(offer_id):
    offer = Offer.query.get(offer_id)
    db.session.delete(offer)
    db.session.commit()
    return
