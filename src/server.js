const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// reassembles body so we can handle request
// reused from http api ii assignment
const parseBody = (request, response, handler) => {
  const body = [];

  // handles error
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // handles when data is received
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // handles when data is finished sending
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

// Handles Post Requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addForm') {
    parseBody(request, response, jsonHandler.addForm);
  }
};

// Handles Get Requests
const handleGet = (request, response, parsedUrl, params) => {
  // html responses
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/form.html') {
    htmlHandler.getForms(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getStyles(request, response);
  } else if (parsedUrl.pathname === '/client.js') {
    htmlHandler.getJS(request, response);
  } else if (parsedUrl.pathname === '/form.js') {
    htmlHandler.getFormJS(request, response);
  } 
  // json responses
  else if (parsedUrl.pathname === '/getForm') {
    jsonHandler.getForm(request, response, params);
  } else if (parsedUrl.pathname === '/getTitles') {
    jsonHandler.getTitles(request, response);
  } else {
    jsonHandler.notFound(request, response);
  }
};


// Handles Head Requests (These are not used)
const handleHead = (request, response, parsedUrl, params) => {
  // head requests
  if (parsedUrl.pathname === '/getForm') {
    jsonHandler.getFormMeta(request, response, params);
  } else if (parsedUrl.pathname === '/getTitles') {
    jsonHandler.getTitlesMeta(request, response);
  } 
  // any other head requests
  else {
    jsonHandler.notFoundMeta(request, response);
  }
};

// Handles incoming requests
const onRequest = (request, response) => {
  // logs url to console for debugging purposes
  console.log(request.url);

  // parses url to check the request sent
  const parsedUrl = url.parse(request.url);
  // parses url for additional parameters
  const params = query.parse(parsedUrl.query);

  // check if request handler exists. otherwise, goes to the get handler function
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl, params);
  } else {
    handleGet(request, response, parsedUrl, params);
  }
};

// start server
http.createServer(onRequest).listen(port, () => {
  // Debugging
  console.log(`Listening on 127.0.0.1:${port}`);
});
