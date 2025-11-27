from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    transcriptions = db.relationship(
        'Transcription', backref='user', lazy=True, cascade="all, delete-orphan")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Transcription(db.Model):
    __tablename__ = 'transcriptions'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Float, nullable=True)
    transcript_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.filename,
            'date': self.created_at.strftime('%Y-%m-%d'),
            'duration': f"{int(self.duration // 60):02d}:{int(self.duration % 60):02d}" if self.duration else "N/A",
        }
