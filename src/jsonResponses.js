// local users
const users = {};

// sends the response
const respondJSON = (request, response, status, content) => {
  console.log(content);
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};
// sends a no body response
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// returns the users
const getUsers = (request, response) => {
  const responseJson = {
    users,
  };

  return respondJSON(request, response, 200, responseJson);
};

// return the users for HEAD requests
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// returns a not found request
const notReal = (request, response) => {
  const responseJson = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJson);
};

// returns a not found HEAD request
const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

// adds or updates a user
const addUser = (request, response, body) => {
  const responseJson = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJson.id = 'missingParams';
    return respondJSON(request, response, 400, responseJson);
  }

  let responseCode = 204;

  if (!users[body.name]) {
    responseCode = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJson.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJson);
  }

  return respondJSONMeta(request, response, responseCode);
};
// returns not found for any unspecified url
const notFound = (request, response) => {
  const responseJson = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJson);
};

// returns when Head request is not found
const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  addUser,
  notFound,
  notFoundMeta,
};
