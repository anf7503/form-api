const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const serveFile = (response, contentType, file) => {
    response.writeHead(200, { 'Content-Type': contentType });
    response.write(file);
    response.end();
}

// returns the index
const getIndex = (request, response) => {
    serveFile(response, 'text/html', index);
};

// returns the css styles
const getStyles = (request, response) => {
    serveFile(response, 'text/css', index);
};

module.exports = {
    getIndex,
    getStyles,
};