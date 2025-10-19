# Weather App
A weather forecast app, built in Express.js /MySQL and React / react-bootstrap

## Project API
https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
###### Note - API requires an API_KEY (free tier on signup). The visualcrossing API provides current weather data, daily / hourly historical, 15-day forecast and statistical forecast data (depending on dates requested), weather alerts and astronomical observations including sunrise, sunset and moon phases. ######

## Title of Project
Weather Forecast- https://weather.danlabs.dev

## Description
This web-app provides weather forecast information based on location provided by the user. It displays the current conditions with a weather alert (if any), a 24 hour-by-hour prognosis and a 15 day forecast.

## Features
- Single page application.
- Authentication / Authorization throughout the site. Users who are not logged in are still able to use the site, except from saving a location and retrieving/ deleting saved locations.
- Geolocation on initial load. The app retrieves browser's location based on the public user IP.
- Renders current weather conditions, 24 hr forecast and 15 days forecast.
- Option to save, retrieve and delete saved locations for logged in users.
- Imperial to metric data selector.
- Form data validation
- JSON schema validation
- Authentification persistence with localStorage
- Responsive content for different screen sizes.

## Tests
- server side tests include 7 suite tests located in different folders. From the backend folder they can be run individually:
> npm run test TEST_FILE
or all in one 
> npm run test
- More frontend tests to be included

## Used flow
At initial pageload the app retrieves the browser's geolocation and converts it into coordinates, which are fed into the weather API. This feature works if there are no ad-blocker or any service that would block the geolocation api. In case the geolocation api is blocked, the app will default to Denver, CO.
Multiple data points will be displayed, starting with current date and 12AM for the hourly forecast of the current date. Then user can select a specific day to get hourly forecast for that day.
For logged in users, the Navbar will show the option to save a location (the "resolved address" from the API), to list saved addresses and to delete an address from the list.

## APIs
The server API has the role to retrieve the data in bulk (10-15K lines of JSON), repackage it in a new JSON that contains only the data needed for the client. Express router serves the requests from the client API, delivering the specific weather data and user information. The client does not have access to the external API. It only exchanges information through the server API. The backend also provides a token for the logged in user that is received by the client api and used for accessing protected routes and for authentification persistence.

## Technology
- The backend is built on Node.js using Express.js and MariaDB (mysql) RDBMS. It uses JSON schema validation on the incoming data. It employs JWT for sharing tokens and bcrypt for hashing passwords.
- The frontend is built with React and uses react-bootstrap for styling.

## Install
The app needs a valid API key. A free key will be provided at signup - https://www.visualcrossing.com/sign-up
In the backend/config.js the API key is imported from secrets.js. Also you will need to set 3 more vars in same file or as ENV VARS - SECRET_key, DB_USER and DB_PASSWORD.
Create this file in the root of the project and set those values.
- perform a secure installation of MariaDB (multiple steps process).
- start MariaDB
> sudo service mysql start
- log in MariaDB with root account
> mariadb -u root -p
- create db user
> CREATE USER 'weather_user'@'localhost' IDENTIFIED BY 'your_password';
> GRANT ALL PRIVILEGES ON weather.* TO 'weather_user'@'localhost';
- create db
> CREATE DATABASE weather;
- verify db
> SHOW DATABASES;
- create tables by running the db seed file
> sudo mysql -u root -p < mysql_db.sql
- start backend and frontend servers


