from flask import Blueprint, jsonify
from app.models import User, Request
from flask_login import login_required
# from app.api.route_helpers import get_distance
from app.api.route_helpers import Haversine


request_routes = Blueprint('requests', __name__)


@request_routes.route('/')
def requests():
    requests = Request.query.all()
    return {"requests": [request.to_dict() for request in requests]}


@request_routes.route('/near/<int:user_id>/')
def close_requests(user_id):
    reqList = []
    requestDistance = {}
    user = User.query.get(user_id)
    user_info = [user.lat, user.lon]
    reqs = Request.query.all()
    for req in reqs:
        req_info = [req.user.lat, req.user.lon]
        distance = Haversine(user_info, req_info).miles
        if distance <= req.user.range and user_id != req.user_id:
            requestDistance[req.id] = distance
            reqList.append(req)
    return {"closeRequests": [rqst.to_dict() for rqst in reqList], "requestDistance": requestDistance}
