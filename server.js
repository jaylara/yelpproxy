// dependencies
const yelp = require('yelp-fusion');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
// app config
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//route variables
// define a root route:
app.get('/', (req, res) => {
	res.send('user /api');
});


app.get('/yelp',(req, res) => {
	const token = yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(response => {
  								console.log(response.jsonBody.access_token);
								}).catch(e => {
  								console.log(e);
								});

const client = yelp.client(token);

client.business('gary-danko-san-francisco').then(response => {
  		console.log(response.jsonBody.name);
		}).catch(e => {
  		console.log(e);
		});
	// let url = 'https://api.yelp.com/v2';
  //     axios.get(url,{
  //       //params
  //       'headers': {
  //         'Authorization': 'Bearer ' + this.access.access_token,
  //         'Access-Control-Allow-Origin' : '*',
  //         'Access-Control-Allow-Headers' : ['GET']
  //       }
  //     }).then((response)=>{
  //       console.log(response);
  //     }).catch(e=>e);
	// axios.get('http://api.icndb.com/jokes/random')
	// .then((response) =>{
	// 	console.log(response);
	// 	res.json(response.data);
	// })
	// .catch((error) => {
	// 	console.log(error);
	// })
});

// start app
app.listen(port, function(err) {
	if (err) {
		console.log(`Error starting server on port ${port}`, err);
	} else {
		console.log(`Server running on port ${port}.`);
	}
});
