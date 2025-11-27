from deepgram import DeepgramClient
import os
API_KEY = os.environ.get('DEEPGRAM_API_KEY')

# For uploaded files


async def transcribe_audio_file(file_buffer, mimetype):
    try:
        deepgram = DeepgramClient(API_KEY)
        source = {'buffer': file_buffer, 'mimetype': mimetype}
        options = {
            "model": "nova-2",
            "smart_format": True,
        }
        response = await deepgram.listen.prerecorded.v("1").transcribe_file(source, options)
        transcript = response.results.channels[0].alternatives[0].transcript
        duration = response.metadata.duration
        return transcript, duration
    except Exception as e:
        print(f"Deepgram Prerecorded Error: {e}")
        return None, None

# For real-time streaming


def initialize_deepgram_live():
    try:
        deepgram = DeepgramClient(API_KEY)
        dg_connection = deepgram.listen.live.v("1")
        options = {
            "model": "nova-2",
            "language": "en-US",
            "smart_format": True,
            "encoding": "linear16",
            "sample_rate": 16000,
        }
        dg_connection.start(options)
        return dg_connection
    except Exception as e:
        print(f"Deepgram Live Connection Error: {e}")
        return None
