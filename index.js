require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let mongoose = require('mongoose');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTOpology: true});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  newUrl: Number,
});

let Url = mongoose.model('url', urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', urlencodedParser,  async (req, res) => {
  const count = await Url.countDocuments({})/* .then((count) => {return count}) */.catch((err) => console.log(err))
  const urlPosted = req.body.url
  const urlCount = count + 1
  const urlObject = new URL(urlPosted)

  dns.lookup(urlObject.hostname, (err, add, fam) => {
    if(!err) {
      let url = new Url ({
        originalUrl: urlPosted,
        newUrl: urlCount
      })
      url.save()/* .then(savedDoc => console.log(savedDoc)) */
    
      res.json({
        original_url: urlPosted,
        short_url: urlCount
      })
    }else {
      res.json({
        error: 'invalid url'
      })
    }
  })
})

app.get('/api/shorturl/:number', (req, res) => {
  Url
    .findOne({newUrl: req.params.number})
    .then((found) => {
      res.redirect(found.originalUrl)
    })
    .catch((err) => console.log(err))
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
