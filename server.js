// DEPENDENCIES
const express = require('express')

// CONFIGURATION
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const app = express()


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })
  
// Breads
const breadsController = require('./controllers/breads_controllers.js')
  app.use('/breads', breadsController)
  
  //bakers
  const bakersController = require('./controllers/bakers_controllers.js')
  app.use ('/bakers', bakersController)
  //404 page\
  
  app.get('*', (req, res)=>{
    res.send('404')
  })

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})