//Express se instala con npm install express --save
//Archivos estáticos (CSS), han de guardarse en carpeta public
//Tenemos que decir donde están las views
const express = require(`express`);
const app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
//Puede ser que la línea 9 y la 6 estén duplicando??
app.use(express.static(path.join(__dirname, 'public')));

//Path is used to work with file & directory paths
//View documentation at https://nodejs.org/docs/latest/api/path.html
//We normally use method .join -> path.join("hola", "adiós") returns hola/adios
const path = require(`path`);

//Favicon allows icon representation in webserver/search bar/ bookmark bar, among others
//Documentation: https://en.wikipedia.org/wiki/Favicon
const favicon = require('serve-favicon');
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Hay que ponerlo para tirar de ejs -> no lo termino de entender
app.set(`view engine`, `ejs`);

//Express Layouts es un módulo de npm que tendremos que instalar: npm install npm install --save express-ejs-layouts
//Tenemos que avisar donde esta layout, creamos carpeta dentro de views
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

//Requerimos bodyparser, que nos permite recibir el cuerpo de un form
//INstalamos: npm install --save body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Request Morgan to handle logs -- Prints in console the data we request
//Dev prints method, URL, status, response time and content length 
const morgan = require('morgan');
app.use(morgan(`dev`));

//Cookie-parser used to understanding cookies
const cookieParser = require(`cookie-parser`);
app.use(cookieParser());

//Body-parser used for body unde
const bodyParser = require(`body-parser`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Installing mongoose -> allows to interact with mongodb from .js and .ejs
const mongoose = require(`mongoose`);

//Express session allows us to save server side session information DOC->https://github.com/expressjs/session
//MongoStore se ocupa de almacenar la información de la sesión en curso *CONFIRIRMAR IDEA*
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
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
  }))
