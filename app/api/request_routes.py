from flask import Blueprint, jsonify
from app.models import User, Request
from flask_login import login_required


request_routes = Blueprint('requests', __name__)


@request_routes.route('/')
@login_required
def requests():
    requests = Request.query.all()
    return {'requests': [request.to_dict() for request in requests]}
