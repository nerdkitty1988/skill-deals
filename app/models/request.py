from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime


class Request(db.Model):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(10), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    location_range = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='requests')


    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'lat':  self.lat,
            'lon': self.lon,
            'range': self.location_range,
            'title': self.title,
            'description': self.description,
            'userId': self.user_id,
            'user': self.user.to_dict(),
            'createdAt': self.time_created,
            'updatedAt': self.time_updated
        }
