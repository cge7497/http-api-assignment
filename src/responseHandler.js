const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const respondJSON = (request, response, status, jsonObject) => {
    console.log(jsonObject);
    const headers = {
        'Content-Type': 'application/json',
    };

    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(jsonObject));
    response.end();
}

const respondXML = (request, response, status, xmlString) => {
    console.log(xmlString)
    const headers = {
        'Content-Type': 'text/xml',
    };

    //send response with xml object
    response.writeHead(status, headers);
    response.write(xmlString);
    response.end();
}

const getSuccess = (request, response, type) => {
    if (type === 'text/xml') {
        const xmlResponse = '<response><message> This is a successful response</message></response>';
        respondXML(request, response, 200, xmlResponse);
    } else { //defaults to JSON if no type was specified, as described by assignment.
        const responseJSON = {
            message: 'This is a successful response'
        };
        respondJSON(request, response, 200, responseJSON);
    }
};

const getBadRequest = (request, response, type, queryParams) => {
    let statusCode = 400;
    let showID = true;
    let _message = 'Missing valid query paramater set to true.';
    if (queryParams.valid === 'true') {
        statusCode = 200;
        showID = false;
        _message = 'This request has the required parameters.';
    }

    if (type === 'text/xml') {
        let xmlResponse;
        //include the badRequest error id if showID is true, meaning the request did not have the valid parameter.
        if (showID)
            xmlResponse = `<response><message>${_message}</message><id>badRequest</id></response>`;
        else
            xmlResponse = `<response><message>${_message}</message></response>`;
        respondXML(request, response, statusCode, xmlResponse);
    } else {
        const responseJSON = {
            message: _message,
        };
        if (showID) responseJSON.id = 'badRequest';
        respondJSON(request, response, statusCode, responseJSON);
    }
};

const getUnauthorized = (request, response, type, queryParams) => {
    let statusCode = 401;
    let showID = true;
    let _message = 'Missing loggedIn parameter set to yes.';
    if (queryParams.loggedIn === 'yes') {
        statusCode = 200;
        _message = 'You have successfully viewed the content.';
        showID = false;
    }
    if (type === 'text/xml') {
        let xmlResponse;
        if (showID)
            xmlResponse = `<response><message>${_message}</message><id>unauthorized</id></response>`;
        else
            xmlResponse = `<response><message>${_message}</message></response>`;
        respondXML(request, response, statusCode, xmlResponse);
    } else {
        const responseJSON = {
            message: _message,
        };
        if (showID) responseJSON.id = 'unauthorized'
        respondJSON(request, response, statusCode, responseJSON);
    }
};
const getForbidden = (request, response, type) => {
    if (type === 'text/xml') {
        const xmlResponse = `<response><message>You do not have access to this content.</message>
        <id>forbidden</id></response>`;
        respondXML(request, response, 403, xmlResponse);
    } else {
        const responseJSON = {
            message: 'You do not have access to this content.',
            id: 'forbidden',
        };
        respondJSON(request, response, 403, responseJSON);
    }
};

const getInternal = (request, response, type) => {
    if (type === 'text/xml') {
        const xmlResponse = `<response><message>Internal Server Error. 
        Something went wrong.</message><id>internalError</id></response>`;
        respondXML(request, response, 500, xmlResponse);
    } else {
        const responseJSON = {
            message: 'Internal Server Error. Something went wrong.',
            id: 'internalError',
        };
        respondJSON(request, response, 500, responseJSON);
    }
};

const getNotImplemented = (request, response, type) => {
    if (type === 'text/xml') {
        const xmlResponse = `<response><message>A get request for this page has not been implemented yet.
        Check again later for updated content.</message><id>notImplemented</id></response>`;
        respondXML(request, response, 501, xmlResponse);
    } else {
        const responseJSON = {
            message: 'A get request for this page has not been implemented. Check again later for updated content.',
            id: 'notImplemented',
        };
        respondJSON(request, response, 501, responseJSON);
    }
};

const notFound = (request, response, type) => {
    if (type === 'text/xml') {
        const xmlResponse = `<response><message>The page you are looking for was not found.
        </message><id>notFound</id></response>`;
        respondXML(request, response, 404, xmlResponse);
    } else {
        const responseJSON = {
            message: 'The page you are looking for was not found.',
            id: 'notFound',
        }
        respondJSON(request, response, 404, responseJSON);
    };
}

module.exports = {
    getSuccess,
    getBadRequest,
    getUnauthorized,
    getForbidden,
    getInternal,
    getNotImplemented,
    notFound
};