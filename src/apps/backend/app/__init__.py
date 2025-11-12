from flask import Flask
from .database import db
from .config import Config
from flask_cors import CORS

# Import Blueprints
from .routes.tasks import tasks_bp
from .routes.comments import comments_bp


def create_app():
    app = Flask(__name__)

    # Load config
    app.config.from_object(Config)

    db.init_app(app)

    # Allow frontend
    CORS(app, resources={r"/*": {"origins": "*"}})


    @app.after_request
    def apply_cors(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        return response

    # Register Blueprints
    app.register_blueprint(tasks_bp)
    app.register_blueprint(comments_bp)

    return app
