from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from .review import Review



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    public_email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.String(20), nullable=False)
    longitude = db.Column(db.String(20), nullable=False)
    profile_pic = db.Column(db.String(255), nullable=True)

    time_created = db.Column(DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now())

    reviews_recieved = db.relationship('Review', back_populates='reviewed_user', cascade="all, delete", foreign_keys=Review.reviewed_user_id)
    reviews_created = db.relationship('Review', back_populates='author', cascade="all, delete", foreign_keys=Review.author_id)

    offers = db.relationship('Offer', back_populates='user', cascade="all, delete")
    requests = db.relationship('Request', back_populates='user', cascade="all, delete")


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
            'email': self.email,
            'publicEmail': self.public_email,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'profilePic': self.profile_pic,
            'reviewsRecieved': self.reviews_recieved,
            'createdAt': self.time_created,
            'updatedAt': self.time_updated
        }
