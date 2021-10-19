from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import DateTime



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    private_email = db.Column(db.String(255), nullable=False, unique=True)
    public_email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.String(20), nullable=False)
    longitude = db.Column(db.String(20), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)
    reviews_recieved = db.relationship('Review', back_populates='reviewed_user', cascade="all, delete")
    reviews_created = db.relationship('Review', back_populates='author', cascade="all, delete")
    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'privateEmail': self.private_email,
            'publicEmail': self.public_email,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'profilePic': self.profile_pic,
            'reviewsRecieved': self.reviews_recieved,
            'createdAt': self.time_created,
            'updatedAt': self.time_updated
        }
