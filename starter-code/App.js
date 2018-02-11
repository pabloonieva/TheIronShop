//Express se instala con npm install express --save
//Archivos estáticos (CSS), han de guardarse en carpeta public
//Tenemos que decir donde están las views
const express = require(`express`);
const app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');

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
////Dev prints method, URL, status, response time and content length 
const morgan = require('morgan');
app.use(morgan(`dev`));



