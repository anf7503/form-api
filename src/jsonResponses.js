const users = {};

// send the response
const respond = (request, response, status, type, content) => {
    console.log(content);
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};

const getUsers = (request, response, acceptedTypes) => {
    const responseJson = {
        message: 'This is a successful response.',
    };

    // default (JSON) Path
    const resString = JSON.stringify(responseJson);

    return respond(request, response, 200, 'application/json', resString);
};

const notReal = (request, response, acceptedTypes, params) => {
    const responseJson = {
        message: 'You have successfully viewed the content.',
    };

    // handles if request does not contain a valid-true query parameter
    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJson.message = 'Missing loggedIn query parameter set to yes';
        responseJson.id = 'unauthorized';
        // XML Path
        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML += `<message>${responseJson.message}</message>`;
            responseXML += `<id>${responseJson.id}</id>`;
            responseXML += '</response>';

            return respond(request, response, 401, 'text/xml', responseXML);
        }
        const resString = JSON.stringify(responseJson);

        return respond(request, response, 401, 'application/json', resString);
    }

    // default (JSON) Path
    const resString = JSON.stringify(responseJson);

    return respond(request, response, 200, 'application/json', resString);
};

const addUser = (request, response, acceptedTypes, params) => {
    const responseJson = {
        message: 'Name and age are both required.',
        id: 'addUserMissingParams'
    };

    // default (JSON) Path
    const resString = JSON.stringify(responseJson);

    return respond(request, response, 400, 'application/json', resString);
};

const notFound = (request, response, acceptedTypes) => {
    const responseJson = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    // default (JSON) Path
    const resString = JSON.stringify(responseJson);

    return respond(request, response, 404, 'application/json', resString);
};

module.exports = {
    getUsers,
    notReal,
    addUser,
    notFound,
};