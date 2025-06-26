from app import create_app
from app.models import db
import os

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully (if they didn't exist).")
    app.run(host="0.0.0.0", port=5000, debug=os.getenv("FLASK_DEBUG", "False") == "True")
   
