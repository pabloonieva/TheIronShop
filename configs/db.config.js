const mongoose = require('mongoose');
const DB_NAME = 'ironshop-db';
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`Connected to ${DB_NAME} database.`);
    }).catch((error) => {
        console.error(`Database connection error: ${error}`);
    });
