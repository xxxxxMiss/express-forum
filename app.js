const fs = require('fs')
const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const formidable = require('express-formidable')
const flash = require('connect-flash')
const router = require('./routes')
const config = require('./config')
const pkg = require('./package')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))

// flash() requires session, 
// so you must mounted session middleware before flash
app.use(flash())

// mounted form middleware
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/upload'),
  keepExtensions: true
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  // caution
  next()
})

app.locals.cfg = {
  title: pkg.name,
  description: pkg.description
}

router(app)

app.listen(config.port)

module.exports = app