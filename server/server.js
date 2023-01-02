
/*================== Clobal Imports =================*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const helmet = require('helmet')
const csp = require('helmet-csp');


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

app.use(express.static(path.join(__dirname + '/public')))




/*================== Security ==================*/

app.use(helmet());

app.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ['https://res.cloudinary.com/diskudcr3/image/upload/*', 'https://i.stack.imgur.com']
    }
  }));

app.use(cors())

// app.use(cors({
//     origin: ['https://example.com', 'https://other-site.com']
//   }));



//Sanitize url
app.use(sanitizeMongo({replaceWith: '_'}))







//Routes
app.use(require('./routes'))



/*================== MONGODB =================*/
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`🌍💥 Server running on port ${PORT}`)
    })
})


