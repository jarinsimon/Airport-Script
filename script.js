const Amadeus = require("amadeus");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3500;

// const amadeus = new Amadeus({
// 	clientId: process.env.API_KEY,
// 	clientSecret: process.env.API_SECRET
// });

var server = app.listen(PORT, function () {
	console.log(`Server running on Port ${PORT}`);
});

app.get('/', function (req, res){
	res.send('Server is working');
});
