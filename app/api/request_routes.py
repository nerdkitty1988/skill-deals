from flask import Blueprint, jsonify, session, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.new_trade import TradeForm
from app.models import User, Request, db
from flask_login import login_required
# from app.api.route_helpers import get_distance
from app.api.route_helpers import Haversine


request_routes = Blueprint('requests', __name__)

@request_routes.route('/', methods=['POST'])
@login_required
def create_request():
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_request = Request(
            title = form.data['title'],
            description = form.data['description'],
            user_id = form.data['user_id']
        )
        db.session.add(new_request)
        db.session.commit()
        return new_request.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@request_routes.route('/')
def requests():
    requests = Request.query.all()
    return {"requests": [request1.to_dict() for request1 in requests]}


@request_routes.route('/near/<int:user_id>/')
def close_requests(user_id):
    reqList = []
    requestDistance = {}
    user = User.query.get(user_id)
    user_info = [user.lat, user.lon]
    reqs = Request.query.order_by(Request.time_created).all()
    for req in reqs:
        req_info = [req.user.lat, req.user.lon]
        distance = Haversine(user_info, req_info).miles
        if distance <= req.user.range and user_id != req.user_id:
            requestDistance[req.id] = distance
            reqList.append(req)
    return {"closeRequests": [rqst.to_dict() for rqst in reqList], "requestDistance": requestDistance}


@request_routes.route('/<int:request_id>/')
def single_request(request_id):
    return (Request.get(request_id).to_dict())
