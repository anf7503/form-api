const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);
const js = fs.readFileSync(`${__dirname}/../client/client.js`);
const form = fs.readFileSync(`${__dirname}/../client/form.html`);
const formJS = fs.readFileSync(`${__dirname}/../client/form.js`);


const serveFile = (response, contentType, file) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(file);
  response.end();
};

// returns the index
const getIndex = (request, response) => {
  serveFile(response, 'text/html', index);
};

// returns the form html
const getForm = (request, response) => {
  serveFile(response, 'text/html', form);
};

// returns the css styles
const getStyles = (request, response) => {
  serveFile(response, 'text/css', styles);
};

// returns the javascript file
const getJS = (request, response) => {
  serveFile(response, 'application/javascript', js);
};

// returns the javascript file for the form
const getFormJS = (request, response) => {
  serveFile(response, 'application/javascript', formJS);
};

module.exports = {
  getIndex,
  getForm,
  getStyles,
  getJS,
  getFormJS
};
