# Geolocation backend

To start developing run `npm install` and then `npm run start:nodemon`

## Prerestiques.

You will need docker container for MySQL database. Make sure you have docker installed and then run this command in terminal:

```docker run --name=mysql1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_ROOT_HOST=% -d mysql/mysql-server:8.0```

Connect to Docker.
To create MySQL database and table you have to execute these SQL commands:

```
CREATE DATABASE geolocations
DEFAULT CHARACTER SET = 'utf8mb4';
```

```
CREATE TABLE geolocations(  
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    locationId int,
    name VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT);
```
