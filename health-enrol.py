from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'FOHealth')
COLLECTION_NAME = 'ProjectEnrol'

# A constant that defines the record fields that we wish to retrieve.
FIELDS = {
    'Academic_Year': True,
    'Course': True,
    'Stage_Code': True,
    'Withdrawals': True,
    'Course_Stage': True,
    'Mode_Group': True,
    'Level_Group': True,
    'Fees_Status': True,
    'Gender': True,
    'Ethnicity_Group': True,
    'White_BME': True,
    'Disability_description': True,
    'Disability_YN': True,
    'Age': True,
    'Reason_for_Leaving': True,
    'Enrolments': True,
    '_id': False,
}


@app.route('/')
def home():
    return render_template('home.html')


@app.route("/dash")
def dash():
    """
   A Flask view to serve the main dashboard page.
   """
    return render_template("dash.html")


@app.route("/FOHealth/projects")
def health_projects():
    """
   A Flask view to serve the project data from
   MongoDB in JSON format.
   """
    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=15000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))

if __name__ == "__main__":
    app.run(debug=True)
