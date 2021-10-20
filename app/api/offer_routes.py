from flask import Blueprint, jsonify
from app.models import User, Offer
from flask_login import login_required


offer_routes = Blueprint('offers', __name__)


@offer_routes.route('/')
def offers():
    offers = Offer.query.all()
    return {'offers': [offer.to_dict() for offer in offers]}
