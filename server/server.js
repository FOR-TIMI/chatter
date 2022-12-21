const express = require('express');
const app = express();

//file Path and port number
const path = require('path');
const PORT = process.env.PORT || 3001;

//our database configuration
const db = require('./config/connection');

//routes
const routes = require('./routes')

// Middleware for parsing out data
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


//To setup our routes
app.use(routes);


//Initiallize database and server
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`🌍 Server running on port ${PORT}`)
    })
})







