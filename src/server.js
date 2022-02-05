const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const responseHandler = require('./responseHandler.js');
const xmlHandler = require('./xmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': responseHandler.getSuccess,
    '/badRequest': responseHandler.getBadRequest,
    '/unauthorized': responseHandler.getUnauthorized,
    '/forbidden': responseHandler.getForbidden,
    '/internal': responseHandler.getInternal,
    '/notImplemented': responseHandler.getNotImplemented,
    notFound: responseHandler.notFound,
}

const onRequest = (request, response) => {
      //first we have to parse information from the url
    const parsedUrl = url.parse(request.url);
    const queryParams = query.parse(parsedUrl);

    if(urlStruct[parsedUrl.pathname]){
        urlStruct[parsedUrl.pathname](request, response);
      } else {
        urlStruct.notFound(request, response);
    };
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});