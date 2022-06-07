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
  const db = client.db('raid')
  const collection = db.collection('area')

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index.ejs")
    })

app.get('/raid/:area', (req, res) => {
    const raidLocation = req.params.area 
    //console.log(raidLocation)
    //makes an array of every colelction document
    collection.find().toArray().then(results => {
        //makes an object of the document in the collection that shares a name
        // with the url (raidLocation)
        const areaObject = results.filter(obj => obj.areaName == raidLocation)[0];
        //renders the area with the corresponding object
        if(areaObject) res.render("area.ejs", {area: areaObject})
        else res.render('index.ejs') 
    })
    .catch(err => console.log(err))
    })

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
    }).catch(console.error)


