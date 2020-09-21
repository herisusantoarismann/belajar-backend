const http = require("http");
const fs = require("fs");

function HandleRequest(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });

  fs.readFile("./index.html", null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("<b>File Not Found!</b>");
    } else {
      res.write(data);
    }

    res.end();
  });
}

const server = http.createServer(HandleRequest);

server.listen(8000, function () {
  console.log("Sedang berjalan di port 8000");
});
