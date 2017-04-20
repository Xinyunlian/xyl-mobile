const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

// Serve up public/ftp folder
const serve = serveStatic('.', {'index': ['index.html', 'index.htm']});

// Create server
const server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res))
});

// Listen
server.listen(8887);