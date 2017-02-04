var http = require('http');
var fs = require('fs');
var time = require("./time.js");
var port = process.env.PORT || 5000;

http.createServer(function(request, response) {


  if (request.url === '/') {
    response.writeHead(200, {"Content-type": "text/html"});
    var htmlContent = fs.readFileSync('./index.html');
    response.write(htmlContent);
  }
  else {
    response.writeHead(200, {"Content-Type": "application/json"});
    //timeRoute receives the extra input
    var timeRoute = request.url.replace("/", "");

    if (time.isTimestamp(timeRoute)) {

      var unixDate = new Date(parseInt(timeRoute) * 1000);
      var date = time.getDate(unixDate);

      response.write(time.viewJSON(timeRoute, date.fullDate));

    }
    else {
      timeRoute = decodeURI(timeRoute);
      var naturalDate = new Date(timeRoute);

      if (naturalDate == "Invalid Date") {
        response.write(time.viewJSON(null, null));
      } else {
        var date = time.getDate(naturalDate);
        response.write(time.viewJSON(date.unixTime, date.fullDate));
      }
    }
    
  }
  response.end();
}).listen(port);
console.log("Server listening to port 5000");