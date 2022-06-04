const express = require('express');
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) throw new Error('MONGODB_URL environment variable required.')

const client = new MongoClient(process.env.MONGODB_URL);
client.connect().then(client => {
  console.log('Connected successfully to server');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/raid/:area', (req, res) => {
    const raidLocation = req.params.area 
    console.log(raidLocation)  
  })

	app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
}).catch(console.error)
