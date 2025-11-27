from flask_socketio import emit
from . import socketio
from .services.deepgram_service import initialize_deepgram_live
from flask import request



# Dictionary to hold active Deepgram connections for each client
deepgram_connections = {}


def setup_deepgram_handlers(dg_connection, sid):
    """Sets up event handlers for a Deepgram live connection."""
    def on_transcript(self, result, **kwargs):
        transcript = result.channel.alternatives[0].transcript
        if len(transcript) > 0:
            emit('transcript_update', {'transcript': transcript}, room=sid)

    def on_error(self, error, **kwargs):
        print(f"\n[Deepgram ERROR] for client {sid}: {error}\n")

    dg_connection.on(deepgram.LiveTranscriptionEvents.Transcript, on_transcript)
    dg_connection.on(deepgram.LiveTranscriptionEvents.Error, on_error)


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    sid = request.sid
    dg_connection = initialize_deepgram_live()
    if dg_connection:
        deepgram_connections[sid] = dg_connection
        setup_deepgram_handlers(dg_connection, sid)
        options = {
            "model": "nova-2",
            "punctuate": True,
            "interim_results": True
        }
        dg_connection.start(options)
    else:
        print(f"Could not initialize Deepgram for client {sid}")


@socketio.on('stream_audio')
def handle_audio_stream(data):
    sid = request.sid
    if sid in deepgram_connections:
        deepgram_connections[sid].send(data)


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    sid = request.sid
    if sid in deepgram_connections:
        # Properly close the connection and remove it
        connection = deepgram_connections.pop(sid)
        connection.finish()
