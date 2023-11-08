// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server object
var server = http.createServer(function(request, response){
    // 2.1 parse url
    var parsedUrl = url.parse(request.url);
    // 2.2 get path
    var resource = parsedUrl.pathname;
    console.log(resource);
    // 2.3 get query string as object
    var query = qs.parse(parsedUrl.query);
    console.log(query);
    // 2.4 get method
    var method = request.method;
    console.log(method);
    // 2.5 set response header
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 2.6 send response
    response.end('Hello World');
});
// 3. start server
server.listen(8080, function(){
    console.log('Server is running...');
});


