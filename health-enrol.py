from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'FOHealth'
COLLECTION_NAME = 'projects'

@app.route('/')
def home():
   return render_template('home.html')


@app.route("/dash")
def dash():
   """
   A Flask view to serve the main dashboard page.
   """
   return render_template("index.html")


@app.route("/FOHealth/projects")
def health_projects():
   """
   A Flask view to serve the project data from
   MongoDB in JSON format.
   """

   # A constant that defines the record fields that we wish to retrieve.
   FIELDS = {
      'Academic_Year': True, 'AOS_code': False, 'Full_description': True, 'Stage_code': True,
      'course_stage': True, 'Mode group': True, 'Level_group':True, 'School': False, 'Home/Overseas': True,
      'Gender': True, 'Ethnicity': True, 'White/BME': True, 'Disability_description': True, 'date_posted': True,
      'Disability_Y/N': True, 'Date_of Birth': False, 'Age':True, 'Postcode': True,
   }

   # Open a connection to MongoDB using a with statement such that the
   # connection will be closed as soon as we exit the with statement
   with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
      # Define which collection we wish to access
      collection = conn[DBS_NAME][COLLECTION_NAME]
      # Retrieve a result set only with the fields defined in FIELDS
      # and limit the the results to 55000
      projects = collection.find(projection=FIELDS, limit=15000)
      # Convert projects to a list in a JSON object and return the JSON data
      return json.dumps(list(projects))


if __name__ == "__main__":
   app.run(debug=True)

@app.route('/dash')
def dash():
   return render_template('dash.html')

if __name__ == '__main__':
   app.run(debug=False)