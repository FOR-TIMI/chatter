const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.MONGODB_URI  || 'mongodb://127.0.0.1:27017/chatter';



mongoose
    .set('strictQuery', true)
    .connect(DB_URL)

//To log mongo queries
mongoose.set('debug', true)


module.exports = mongoose.connection
