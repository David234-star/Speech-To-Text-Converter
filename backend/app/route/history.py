from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Transcription
from app import db

history_bp = Blueprint('history', __name__)


@history_bp.route('/', methods=['GET'])
@jwt_required()
def get_history():
    current_user_identity = get_jwt_identity()
    user_id = current_user_identity['id']

    transcriptions = Transcription.query.filter_by(
        user_id=user_id).order_by(Transcription.created_at.desc()).all()

    return jsonify([t.to_dict() for t in transcriptions]), 200


@history_bp.route('/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_history_item(item_id):
    current_user_identity = get_jwt_identity()
    user_id = current_user_identity['id']

    item = Transcription.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        return jsonify({'message': 'Item not found or you do not have permission'}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Item deleted successfully'}), 200
