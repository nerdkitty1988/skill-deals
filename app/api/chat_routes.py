from flask import Blueprint, jsonify, session, request
from flask_login.utils import login_required
from app.models import User, Message, db
from sqlalchemy import desc, or_
from flask_login import login_required
from collections import defaultdict
from app.forms.message_form import MessageForm
from app.api.auth_routes import login, validation_errors_to_error_messages


chat_routes = Blueprint('chats', __name__)


@chat_routes.route('/<roomId>/')
@login_required
def get_messsages(roomId):
    messages = Message.query.filter(Message.room_id == roomId ).order_by(Message.time_created).all()
    return {'messages': [message.to_dict() for message in messages]}


@chat_routes.route('/')
@login_required
def get_user_chats():
    user_id = session['_user_id']
    messages = Message.query.filter((Message.sender_id == user_id) | (Message.receiver_id == user_id) ).order_by(Message.time_created).all()
    rooms = defaultdict(list)

    for message in messages:
        rooms[str(message.room_id)].append(message.to_dict())

    return {'chats': rooms}


@chat_routes.route('/', methods=['POST'])
@login_required
def post_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            sender_id = form.data['sender_id'],
            receiver_id = form.data['receiver_id'],
            content = form.data['content'],
            room_id = form.data['room_id']
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401


@chat_routes.route('/<int:chat_id>/', methods=['DELETE'])
@login_required
def delete_chat(chat_id):
    message = Message.query.get(chat_id)
    db.session.delete(message)
    db.session.commit()
    return {'message': 'chat deleted successfully'}

@chat_routes.route('/read/<int:chat_id>/', methods=['PATCH'])
@login_required
def mark_read(chat_id):
    message = Message.query.get(chat_id)
    message.read = True
    db.session.commit()
    return {'message': message.to_dict()}
