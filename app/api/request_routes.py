from flask import Blueprint, jsonify, request, session
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.new_trade import TradeForm
from app.models import User, Request, db
from flask_login import login_required
# from app.api.route_helpers import get_distance
from app.api.route_helpers import Haversine
from sqlalchemy import desc


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



@request_routes.route('/edit/<int:request_id>/', methods=['PATCH'])
@login_required
def update_request(request_id):
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        trade_request = Request.query.get(request_id)
        trade_request.title = form.data['title']
        trade_request.description = form.data['description']
        db.session.commit()
        return trade_request.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@request_routes.route('/')
def requests():
    reqList = []
    allRequestDistance = {}
    user_id = session['_user_id']
    current_user = User.query.get(user_id)
    user_info = [current_user.lat, current_user.lon]
    reqs = Request.query.order_by(Request.time_created).all()
    for req in reqs:
        req_info = [req.user.lat, req.user.lon]
        distance = Haversine(user_info, req_info).miles
        allRequestDistance[req.id] = distance
        reqList.append(req)
    return {"requests": [rqst.to_dict() for rqst in reqList], "allRequestDistance": allRequestDistance}


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
    single_request = Request.query.get(request_id)
    return {"request": single_request.to_dict()}


@request_routes.route('/delete/<int:request_id>/', methods=['DELETE'])
@login_required
def delete_request(request_id):
    request = Request.query.get(request_id)
    db.session.delete(request)
    db.session.commit()
    return {'message': 'request deleted successfully'}
