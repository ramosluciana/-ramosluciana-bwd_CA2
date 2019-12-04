var http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'), //The path module provides utilities for working with file and directory paths
    express = require('express'), //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
    fs = require('fs'), //This module allows to work witht the file system: read and write files back
    xmlParse = require('xslt-processor').xmlParse, //This module allows us to work with XML files
    xsltProcess = require('xslt-processor').xsltProcess, //The same module allows us to utilise XSL Transformations
    xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

var router = express(); //The set our routing to be handled by Express
var server = http.createServer(router); //This is where our server gets created

router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}
//We define the root of our website and render index.html located inside the views folder
router.get('/', function(req, res){

    res.render('index');

})
//We define a new route /get/html to be rendering our HTML table that is being generated by applying XSL file to XML
router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'}); //We are responding to the client that the content served back is HTML and the it exists (code 200)

    var xml = fs.readFileSync('carameluBakery.xml', 'utf8'); //We are reading in the XML file
    var xsl = fs.readFileSync('carameluBakery.xsl', 'utf8'); //We are reading in the XSL file
    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //Execute Transformation

    res.end(result.toString()); //We render the result back to the user converting it to a string before serving


});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {
    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('carameluBakery.xml', function(err, result) {
      if (err) throw (err);
      //This is where you pass on information from the form inside index.html in a form of JSON and navigate through our JSON (XML) file to create a new entree object
      result.carameluBakery.section[obj.sec_n].entree.push({'prodTitle': obj.prodTitle, 'price': obj.price, 'description': obj.description}); //If your XML elements are differet, this is where you have to change to your own element names
      //Converting back to our original XML file from JSON
      jsToXmlFile('carameluBakery.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  };

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('carameluBakery.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.carameluBakery.product-type[obj.section].product[obj.entree];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('carameluBakery.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

});

//This is where we as the server to be listening to user with a specified IP and Port
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});


            