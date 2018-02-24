const passport = require('passport');
const expressFlash = require('express-flash');
//const flash = require("connect-flash");
//Express se instala con npm install express --save
//Archivos estáticos (CSS), han de guardarse en carpeta public
//Tenemos que decir donde están las views
const express = require(`express`);

const dotEnv = require("dotenv").config(); 

//Path is used to work with file & directory paths
//View documentation at https://nodejs.org/docs/latest/api/path.html
//We normally use method .join -> path.join("hola", "adiós") returns hola/adios
const path = require(`path`);

//Favicon allows icon representation in webserver/search bar/ bookmark bar, among others
//Documentation: https://en.wikipedia.org/wiki/Favicon
const favicon = require('serve-favicon');

//Request Morgan to handle logs -- Prints in console the data we request
//Dev prints method, URL, status, response time and content length
const morgan = require('morgan');

//Cookie-parser used to understanding cookies
const cookieParser = require(`cookie-parser`);

//Requerimos bodyparser, que nos permite recibir el cuerpo de un form
//INstalamos: npm install --save body-parser
const bodyParser = require('body-parser');

//Express Layouts es un módulo de npm que tendremos que instalar: npm install npm install --save express-ejs-layouts
//Tenemos que avisar donde esta layout, creamos carpeta dentro de views
const expressLayouts = require('express-ejs-layouts');

//Installing mongoose -> allows to interact with mongodb from .js and .ejs
const mongoose = require(`mongoose`);

//Express session allows us to save server side session information DOC->https://github.com/expressjs/session
//MongoStore se ocupa de almacenar la información de la sesión en curso *CONFIRIRMAR IDEA*
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

require('./configs/db.config');
require('./configs/passport.config').setup(passport);

//Requerimos las rutas creadas
const auth = require('./routes/auth.routes');
const products = require('./routes/products.routes');
const shoppingCart = require('./routes/shoppingCart.routes');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

//View engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set(`view engine`, `ejs`);

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Super Secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

app.use('/', auth);
app.use('/', products);
app.use('/', shoppingCart);

app.get('/', (req, res, next) => {
  res.redirect("/home");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
