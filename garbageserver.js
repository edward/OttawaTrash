var sys = require('sys'), 
    http = require('http'),
    qs = require("querystring");
    
http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  if(req.method === 'POST') {
    var body = "";
    req.addListener('data', function(chunk) {
      body += chunk;
    }).addListener('end', function() {
      var query = qs.parse(body);
/*      sys.puts(sys.inspect(query));*/
      
      var addr = query.address;
      
      /*"www.ottawa.ca/cgi-bin/gc/gc.pl?sname=en&street=queen"*/
      
      var u = http.createClient(80, "www.ottawa.ca");
      var request = u.request("GET", "/cgi-bin/gc/gc.pl?sname=en&street=" + addr, {"host": "www.ottawa.ca"});
      request.addListener('response', function (response) {
        response.setBodyEncoding("utf8");
        
        garbageHtml = "";
        
        response.addListener("data", function (chunk) {
          garbageHtml += chunk;
        }).addListener("end", function() {
          
          // parse garbageHtml
          // res.write('You asked for ' + addr);
          
          var firstResult = garbageHtml.search(/ /);
          
          String.search(pattern)
          
          
          res.write(garbageHtml);
          res.close();
        });
      });
      request.close();
    });
  } else {
    res.write('                        \
      <form action="/" method="POST">              \
        <input type="text" name="address">            \
        <input type="submit">          \
      </form>                          \
    ');
    res.close();
  }
}).listen(8000);

sys.puts('Server running at http://127.0.0.1:8000/');