const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const responseHandler = require('./responseHandler.js');

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
};

const onRequest = (request, response) => {
  // Parsing info from the url.
  // The URL may have two implemented query paramaters: logged in or valid.
  const parsedUrl = url.parse(request.url);
  const queryParams = query.parse(parsedUrl.query);
  const type = request.headers.accept;

  console.dir(parsedUrl.pathname);
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, type, queryParams);
  } else {
    urlStruct.notFound(request, response, type);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
