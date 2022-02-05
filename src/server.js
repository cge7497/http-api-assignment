const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    switch (request.url) {
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/2':

            break;
        case '/2':

            break;
        case '/2':

            break;
        case '/2':

            break;
        default:
            break;
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});