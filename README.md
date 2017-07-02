# Health-enrolments

# Data Visualisation Stream2 Project
### Introduction
The faculty of Health dashboard contains interactive charts and graphs based on the data set from the University of Northampton Student Records (Enrolment). The faculty has access to the data which allows further exploring of the recruitment and enrolment dimensions to improve student quality numbers, expectations and experience.

The downloaded data is converted into a CSV file. The file is then imported into a MongoDB as a csv file using this command:

```mongoimport -d FOHealth -c projects --type csv --file C:\Users\User\Desktop\FOH\healthEnrolData.csv --headerline``` to create a database and a collection

### Requirements
* Use school of Health(University of Northampton) enrolment data for international and national student recruitment insight programme.
* Use Python Flask micro Framework which include standard folder static and templates.
* Create a two page application, introduction and dashboard page
* The data as a true reflection of data stored in the student records and downloaded and stored in MongoDB
* Dashboard need dc.js, d3.js, crossfilter.js (third part js files) to build the front end UI and need also third part css files for styling the graphs and charts

### Structure
The structure of the project includes in the the static folder, vendor JavaScript libraries d3.js, dc.js, crossfilter.js etc and css files bootstrap.min.js, dc.css and keen-dashboards.css.
The main project components include:
* **the graph.js** which makes creating charts and graphs easy,
* **health-enrol.py** to create routes and data connection, and
* **the HTML templates**(index.html, main.html, dash.html) where tables and graphs are displayed

### Creating the Dashboard
* Select  Python flask micro framework for the server and set up virtualenv to ensure other module are easily imported into  [Flask](http://flask.pocoo.org/)
* set up connection to database, port and collection call is initialised
* Define field that will be used in the dashboard creation
* In this analysis the following attributes/fields are used:
'Academic_Year': True, 	'Course': True, 	'Stage_Code': True, 	'Withdrawals': True, 	'Course_Stage': True, 	'Mode_Group': True, 	'Level_Group': True, 	'Fees_Status': True, 	'Gender': True, 	'Ethnicity_Group': True, 	'White/BME': True, 	'Disability_description': True, 	'Disability_YN': True, 	'Age': True, 	'Reason_for_Leaving': True, 	'Enrolments': True, 	'_id': False.
* Define the routes to render the HTML templates
* Create HTML templates used to structure the dashboard using bootstrap
* Use graph.js to define the type of graphs
* Add the requirements file which upholds a list of modules necessary for the project
* Connect to the database and extract the data from FOHealth database
* D3.js - used to render interactive charts based on data. D3 creates svg based charts which are passed into html div blocks, [d3.js](https://d3js.org/).
* Dc.js -  used as a wrapper for D3.js. This allows to add the basic chart parameters to the code to get them up and running and allows making plotting charts easier [dc.js](https://dc-js.github.io/dc.js/).
* Crossfilter.js - JavaScript based library used to explore large data sets. In this project used for slicing and dicing FOHealth data. Enables drill down based analysis and two way binding [crossfilter.js](http://square.github.io/crossfilter/).
* queue.js -This function processes data at the API level and insert it into the data variable using the queue library for asynchronous loading. Its job is to wait until the data is available from each API before passing on the combined data for processing. [queue.js](https://github.com/d3/d3-queue)
* Dc.css - contains the styling directives for our dc charts.
* keen.js - a dashboard template library. [keen.js](https://keen.io/).
* bootstrap - used in conjunction with keen.js to layout the dashboard elements.
* MongoDB - A No-SQL database which is a repository for the project data [mongoDB](https://www.mongodb.com/)
* Dashboard deployed by Heroku

