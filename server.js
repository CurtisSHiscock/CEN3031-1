/*
Curtis Hiscock
ID:2146-7806
8/27/08
CEN3031-1
A server that displays listings from a JSON file.
*/

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) 
{
	//Student is given this code to parse url
	var parsedUrl = url.parse(request.url);
	//If the parsed URL's pathname is 'listings' and the request methtod is 'GET', returns 200 and display data, else returns a 404 with body 'Bad gateway error'
	if (parsedUrl.pathname == '/listings' && request.method == "GET")
	{
		response.writeHead(200, {'Content-Type' : 'text/plain'});
		response.write(listingData);
		response.end();
	}
	else
	{
		response.writeHead(404, {'Content-Type' : 'text/plain'});
		response.write('Bad gateway error');
		response.end();
	}
  
};

fs.readFile('listings.json', 'utf8', function(err, data) 
{
	//Check for error then save the raw data into global variable listingData
	if(err) throw err;
	listingData=data;
	
	//Create Server
	server = http.createServer(requestHandler);
	//Start Server
	server.listen(port,function()
	{
		console.log('Server started, listening to port ' + port);
	})
});
