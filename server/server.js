
/*================== Clobal Imports =================*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const sanitizeMongo = require('express-mongo-sanitize')


const path = require('path')


const db = require('./config/db')
const PORT = process.env.PORT || 3001






/*================== Configurations =================*/

/*================== Environment Variables config for development =================*/
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

/*================== Express config =================*/
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(helmet());

app.use(cors());


const imageUrls = [
    'https://res.cloudinary.com/diskudcr3/',
    'https://i.stack.imgur.com'
]

app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc: [],
        connectSrc: ["'self'"],
        scriptSrc: ["'unsafe-inline'", "'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com/','https://fonts.gstatic.com/s/poppins/'],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://res.cloudinary.com/diskudcr3/", 
            'https://i.stack.imgur.com',
        ],
        fontSrc: ["'self'",  'https://fonts.googleapis.com/','https://fonts.gstatic.com/s/poppins/'],
    }
}))


app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))


//Sanitize url
app.use(sanitizeMongo({replaceWith: '_'}))

app.use(express.static(path.join(__dirname + '/public')))

//Routes
app.use(require('./routes'))



/*================== MONGODB =================*/
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`🌍💥 Server running on port ${PORT}`)
    })
})


