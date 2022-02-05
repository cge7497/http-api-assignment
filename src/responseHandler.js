const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respondJSON = (request, response, status, object) => {
    //object for our headers
    //Content-Type for json
    const headers = {
        'Content-Type': 'application/json',
    };

    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
}

const respondXML= (request, response, status, object) => {
    //object for our headers
    //Content-Type for json
    const headers = {
        'Content-Type': 'application/json',
    };

    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
}

const getSuccess = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getBadRequest = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(style);
    response.end();
};

const getUnauthorized = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(style);
    response.end();
};
const getForbidden = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getInternal = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
      };
    respondJSON(request, response, 404, responseJSON);
};

const getNotImplemented = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
      };
    respondJSON(request, response, 404, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
      };
    respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    notFound
};