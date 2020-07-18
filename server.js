//Install express server
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontend-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/frontend-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen( PORT , () => {
    console.log('App running on port : ' + PORT)
});