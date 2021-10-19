from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime



class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reviewed_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Integer, nullable=False)
    author = db.relationship('User', back_populates='reviews_created', foreign_keys=author_id)
    reviewed_user = db.relationship('User', back_populates='reviews_recieved', foreign_keys=reviewed_user_id)
    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'reviewedUserId': self.reviewed_user_id,
            'rating': self.rating,
            'comment': self.comment,
            'author': self.author,
            'createdAt': self.time_created,
            'updatedAt': self.time_updated
        }
