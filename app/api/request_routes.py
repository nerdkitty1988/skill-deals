from flask import Blueprint, jsonify
from app.models import User, Request
from flask_login import login_required
from app.api.route_helpers import get_coordinates, get_distance


request_routes = Blueprint('requests', __name__)


@request_routes.route('/')
def requests():
    requests = Request.query.all()
    return {'requests': [request.to_dict() for request in requests]}


@request_routes.route('/near/<int:user_id>')
def close_requests(user_id):
    reqList = []
    user = User.get(user_id)
    requests = Request.query.all()
    for request in requests:
        if get_distance(user.zipcode, request.zipcode) <= request.range:
            reqList.append(request)
    return {'closeRequests': [rqst.to_dict() for rqst in reqList]}
