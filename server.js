const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5500;

const server = http.createServer((req, res) => {
    let filePath = __dirname + '/agriculture-project' + (req.url === '/' ? '/index.html' : req.url);

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Set the content type based on the file extension
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data, 'utf8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
