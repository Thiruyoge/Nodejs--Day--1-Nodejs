//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
const path = require('path');
var fs = require('fs'); //require file system object

const folderPath = path.join(__dirname, 'textFiles');

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

app.use((req, res, next) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    next();
  });

  
app.post('/createFile', (req, res) => {

    const currentTime = new Date();
const hours = currentTime.getHours().toString().padStart(2, '0');
const minutes = currentTime.getMinutes().toString().padStart(2, '0');
const seconds = currentTime.getSeconds().toString().padStart(2, '0');

const formattedTime = `${hours}-${minutes}-${seconds}`;


    const fileName = `${formattedTime}.txt`;
    const filePath = path.join(folderPath, fileName);
  
    fs.writeFile(filePath, formattedTime, (err) => {
      if (err) {
        return res.status(500).send('Error creating file');
      }
      res.status(200).send('File created successfully');
    });
  });

  app.get('/getAllFiles', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading files');
      }
      res.status(200).json({ files });
    });

    console.log(folderPath);
  });

  
// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})