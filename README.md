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
* Dashboard need dc.js, d3.js, crossfilter.js, intro.js (third part js files) to build the front end UI and need also third part css files for styling the graphs and charts

### Structure
The structure of the project includes in the the static folder, vendor JavaScript libraries d3.js, dc.js, crossfilter.js etc and css files bootstrap.min.js, dc.css and keen-dashboards.css.
The main project components include:
* **the graph.js** which makes creating charts and graphs easy,
* **health-enrol.py** to create routes and data connection, and
* **the HTML templates**(index.html, main.html, dash.html) where charts and graphs are displayed

### Creating the Dashboard
* Select  Python flask micro framework for the server and set up virtualenv to ensure other module are easily imported into  [Flask](http://flask.pocoo.org/)
* Set up connection to database, port and collection call is initialised
* Define field that will be used in the dashboard creation
* In this analysis the following attributes/fields are used: Academic_Year, Course,	Stage_Code, Withdrawals, Course_Stage, Mode_Group, Level_Group, Fees_Status, Gender, Ethnicity_Group, White/BME, Disability_description, Disability_YN, Age, Enrolments.
* Define the routes to render the HTML templates
* Create HTML templates to structure the dashboard using bootstrap to ensure responsiveness on different device sizes
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
* Intro.js - this is a library to create a step-by-step guide that assigns interactive pop-up tooltip on the graph with useful information to the user [Intro.js](https://www.http://introjs.com/).

### Testing
#### Examples of errors/bugs encountered and tools used:
* First bug *Failed to load resource: the server responded with a status of 404 (Not Found)*.
- resolved **Loading d3.js, dc.js and cross filter in the index.html as scripts. Data was reloaded and the error was resolved**
* Second most *popular errors were Typos and missing semi colons in Graph.js*
- resolved **Used JSHint to verify code and highlight missing semi-colons and typos and other errors**
* Thirdly, problem with pie chart text not showing, went to previous commit which was good. Problem came at recommitting the changed graphs -error * head detached at commit*
- used google **to check stack overflow  which advised to use * git checkout master * then git add**
* Fourthly, one main python problem was "Uncaught RangeError: Maximum call stack size exceeded"
- Learned how the name stack overflow came about. After trying to figure out what the issue was and how to solve it to no avail, my mentor Yoni Lavi walked me through and showed me how to ue the inspector to drill down. The issue was the field names in the health-enrol.py were not the same as in the data-set. Corrections were made and when run again the problem was resolved.
* Testing was on going using developer and debugging tools in console. These included:
- live editing using the web inspector following error messages in the console. I set breakpoints, which provided an easy way to navigate my code in graph.js.
- used conditional breakpoint to check why the graphs labels where not showing combined with CSS selector managed to identify the use of a color object.
- Using the console, console log() to check whether data was loaded.
- In python used debugger to stop at a moment and check particular elements
- Some solutions were provided on Code Institute slack from other students and mentors (not easy to track though).
* The site responsiveness was tested on: [Responsive checker](http://responsivedesignchecker.com/). for windows 10 firefox, chrome, iphone S6 and on galaxy tablet.

### Deploying to Heroku
* The first thing is to make sure the project is up to date locally as well as in git (remote)
* Next sign in on [Heroku](https://signup.heroku.com/)
* Using the command line type ```heroku create``` to create a new application on heroku
* The new application is listed in the heroku Dashboard. My new app is found here [Health](https://lit-cliffs-50689.herokuapp.com/)
* For the app to work properly, activate virtualenv and then add Gunicorn ```pip install gunicorn``` in Python. This is for running HTTP servers on the operating systems
* Next add to the project folder the requirement.txt file ```pip freeze --local > requirement.txt``` This ensures all dependencies for the project are added
* For version control heroku creates the git instance that is available in the settings of heroku dashboard
* next is to init in git ```git init```
* ```git remote add heroku https://git.heroku.com/lit-cliffs-50689.git```
* ```git commit```
* ```git push heroku master```
* next is to deploy the MongoDB
* First Install **mLab MongoDB** from [here](https://elements.heroku.com/addons/mongolab)
* Using **mLab MongoDB** link create a new user and a new collection
* Add the csv file that was used in the project
* ```mongoimport -h <hostname> -d <dbname> -c <collectionname> -u <dbuser> -p <dbpassword> --file C:\Users\User\Desktop\FOH\healthEnrolData.csv --type csv –headerline```
* The hostname and dbname comes from the command created in heroku
* complete all sections
* To ensure data is loaded go to mongo management studio and connect - new connection
* Change settings to set the environment variable for Mongo URI, DBS-NAME.
* Push to heroku master
* Check if the app is working

### Instructions for cloning the project
Getting started is simple. You can clone the Health-enrol repository and add the required dependencies.

#### Prerequisites
You must have git to clone the health enrol repository. If you do not have git account set up from here [Git](https://git-scm.com/)

Clone the Health-enrol repository:

```git clone https://github.com/Mauya/health-enrol.git```

Install and activate virtualenv to your project

Install the dependencies file:

```pip install -r requirements.txt```

This list all dependencies required by the project using Flask micro-Framework

Next step is to Upload data located in the project folder as a CSV.file

The CSV file is small and will only take a few seconds to load. Use the following:
mongoimport -d FOHealth -c projects --type csv --file folder/file.csv –headerline```

Use the local server to see the project.

Heroku Application:
To browse the deployed app [click here](https://lit-cliffs-50689.herokuapp.com/)

### Acknowledgement
* Yoni Lavi (Mentor) for providing easy to follow steps for debugging in the web inspector mostly. Also for encouraging me to look at errors and bugs as opportunities.
* Contribution from my fellow students on slack whenever I posed a query.

### References

