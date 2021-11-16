from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    room_id = db.Column(db.String, nullable=False)
    read = db.Column(db.Boolean, default=False)

    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    sender = db.relationship('User', back_populates='messages_sent', foreign_keys=sender_id)
    receiver = db.relationship('User', back_populates='messages_received', foreign_keys=receiver_id)


    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.sender_id,
            'receiverId': self.receiver_id,
            'roomId': self.room_id,
            'content': self.content,
            'createdAt': self.time_created,
            'sender': self.sender.to_author_dict(),
            'receiver': self.receiver.to_author_dict(),
            'read': self.read
        }
