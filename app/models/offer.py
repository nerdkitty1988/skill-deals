from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime


class Offer(db.Model):
    __tablename__ = 'offers'

    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.String(20), nullable=False)
    longitude = db.Column(db.String(20), nullable=False)
    location_range = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='offers')


    def to_dict(self):
        return {
            'id': self.id,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'range': self.location_range,
            'title': self.title,
            'description': self.description,
            'userId': self.user_id,
            'user': self.user,
            'createdAt': self.time_created,
            'updatedAt': self.time_updated
        }
