from flask import Blueprint, request, jsonify
from app.models import User
from app import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 409

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(
            identity={'id': user.id, 'username': user.username})
        return jsonify(access_token=access_token, user={'username': user.username, 'email': user.email}), 200

    return jsonify({"message": "Invalid credentials"}), 401
