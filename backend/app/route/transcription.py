import asyncio
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.deepgram_service import transcribe_audio_file
from app.models import Transcription
from app import db

transcription_bp = Blueprint('transcription', __name__)


@transcription_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    current_user_identity = get_jwt_identity()
    user_id = current_user_identity['id']

    file_buffer = file.read()
    mimetype = file.mimetype

    try:
        # Run the async function in a new event loop
        transcript, duration = asyncio.run(
            transcribe_audio_file(file_buffer, mimetype))

        if transcript is None:
            return jsonify({'error': 'Failed to transcribe audio'}), 500

        # Save transcription to database
        new_transcription = Transcription(
            filename=file.filename,
            transcript_text=transcript,
            duration=duration,
            user_id=user_id
        )
        db.session.add(new_transcription)
        db.session.commit()

        return jsonify({'transcription': transcript}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
