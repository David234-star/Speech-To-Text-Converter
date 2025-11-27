from dotenv import load_dotenv
import os
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env'))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('SECRET_KEY')
    # Use Supabase/Postgres if DATABASE_URL is set, otherwise use local SQLite
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')


class DevelopmentConfig(Config):
    DEBUG = True
