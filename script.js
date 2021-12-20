const Amadeus = require("amadeus");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3500;

const amadeus = new Amadeus({
	clientId: process.env.API_KEY,
	clientSecret: process.env.API_SECRET
});

var server = app.listen(PORT, function () {
	console.log(`Server running on Port ${PORT}`);
});

app.get('/', function (req, res){
	res.send('Server is working');
});

app.get('/search', async(req, res) => {
	try {
		const { query } = req;
		const { data } = await amadeus.referenceData.locations.get({
			keyword: 's',
			subType: Amadeus.location.airport,
			countryCode: 'US',
			view: 'LIGHT',
		});
		res.json(data);
		//console.log(JSON.stringify(data));
		console.log(data.length)
		for (var i = 0; i < data.length; i++){
			console.log(data[i].address.cityName);
			console.log(data[i].name);
			console.log(data[i].iataCode);
			console.log('');
		}
	} catch (err) {
		console.error(err.res);
		res.json([]);
	}
});