const paypal = require('paypal-express-checkout');
const PP_USER = 'pgonieva-facilitator_api1.gmail.com';
const PP_PW = '7N8ZQ2YDHBBVTDTZ';
const PP_SIGNATURE = 'AuO1vB7EOZLPTHEin2U0HXTQU6ZsAempXzkvF7n9qywdCo0WAGJxEdfQ';
// debug = optional, defaults to false, if true then paypal's sandbox url is used
// paypal.init('some username', 'some password', 'signature', 'return url', 'cancel url', debug);

const init = paypal.init(PP_USER, PP_PW, PP_SIGNATURE, 'http://localhost:3000/pp/ok', 'http://localhost:3000/pp/error', true);

module.exports = init;
