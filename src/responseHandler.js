const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respondJSON = (request, response, status, jsonObject) => {
    //object for our headers
    //Content-Type for json
    const headers = {
        'Content-Type': 'application/json',
    };

    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(jsonObject));
    response.end();
}

const respondXML= (request, response, status, xmlObject) => {
    const headers = {
        'Content-Type': 'application/xml',
    };

    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(xmlObject));
    response.end();
}

const getSuccess = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};

//how do I get query Parameter here? Should I include param library?
const getBadRequest = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};

const getUnauthorized = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};
const getForbidden = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};

const getInternal = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};

const getNotImplemented = (request, response) => {
    if (request.headers.type === 'application/xml'){
        const xmlResponse= '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlString);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
          };
        respondJSON(request, response, 200, responseJSON);
    }
};

//would it be optimal to just send back the same global responseJSON each time?
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