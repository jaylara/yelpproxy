// dependencies
const yelp = require('yelp-fusion');
const app = require('express')();
const bodyParser = require('body-parser');

require('dotenv').config();
// app config
//const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

//executes handling of a promise. responds with successful data output
// or error message in json
var handleClientAction = (res, promise) => {
	promise.then(response => {
			res.json(response.jsonBody);
	}).catch(e => {
			res.json(e);
	});
}//end of handleClientAction()

// define a root route:
app.get('/', (req, res) => {
	res.send('Try /search, /');
});

//get access token using a promise
const yelpClientPromise = yelp.accessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
	.then(res => {
		return yelp.client(res.jsonBody.access_token);
	}).catch(e => {
		console.log(e);
		res.status(500).send('Could not get Yelp Access Token');
	});

//Simple search. handles query strings.
//simplest query requires value for [location] or [latitude]+[longitude] values.
app.get('/search',(req, res) => {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.search(req.query));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
});//end of GET/search route

//Phone search. handles query strings.
//simplest query needs value for [phone] value (ex: +14157492060).
app.get('/phone',(req, res) => {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.phoneSearch(req.query));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
});//end of GET/phone route


//TODO: needs some work. https://www.yelp.com/developers/documentation/v3/business_reviews
//reviews search. handles query strings.
//simplest query needs value for [term] value (ex: ).
app.get('/reviews',(req, res) => {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.reviews(req.query.term));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
});//end of GET/reviews route


//autocomplete search. handles query strings.
//simplest query requires value for [text] value (ex: pizza).
app.get('/autocomplete',(req, res) => {
	yelpClientPromise.then(client => {
		handleClientAction(res, client.autocomplete(req.query.text));
	}).catch(err => {
		res.status(500).send('Could not get Yelp client');
	});
});//end of GET/reviews route




// start app
app.listen(port, function(err) {
	if (err) {
		console.log(`Error starting server on port ${port}`, err);
	} else {
		console.log(`Server running on port ${port}.`);
	}
});
