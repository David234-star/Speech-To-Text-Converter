from flask import Flask, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_socketio import SocketIO
from .config import DevelopmentConfig
from .models import db, bcrypt

# Initialize extensions without app context
migrate = Migrate()
jwt = JWTManager()
# Allow async_mode for performance with gevent
socketio = SocketIO(cors_allowed_origins="*", async_mode='gevent')


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with app
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app)

    with app.app_context():
        # Import blueprints
        from .route.auth import auth_bp
        from .route.transcription import transcription_bp
        from .route.history import history_bp

        # Import socket.io events
        from . import events

        # Register blueprints
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(transcription_bp, url_prefix='/api/transcribe')
        app.register_blueprint(history_bp, url_prefix='/api/history')

        # Create tables if using SQLite for the first time
        if app.config['SQLALCHEMY_DATABASE_URI'].startswith('sqlite'):
            db.create_all()

    return app
