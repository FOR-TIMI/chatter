
/*================== Clobal Imports =================*/
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')


const path = require('path')





/*================== Configurations =================*/

/*================== Environment Variables config for development =================*/
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

/*================== Express config =================*/
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

//Routes
app.use(require('./routes'))





/*================== MONGODB =================*/
const PORT = process.env.PORT || 3001
const DB_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chatter';


mongoose
    .set('strictQuery', true)
    .connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌍💥 Server running on port ${PORT}`)
        })
    })
    .catch(err => console.log(err))




