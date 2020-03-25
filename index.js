const express = require('express')
const path = require('path')
const Airtable = require('airtable');
const dotenv = require('dotenv');
const cors = require('cors');
const functions = require('./functions');
const PORT = process.env.PORT || 5000;
const app = express();

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

dotenv.config();

app.use(express.static('dist'));

app.get('/api/routes', (req,res) => {
    const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
    const routes = [];
    base('Bouldering').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach((record, i) => {
          record.fields.index = i + 1;
          record.fields.Color = functions.convertColors(record.fields.Color.replace(/\s/g, ''));
        });
        // This function (`page`) will get called for each page of records.
        routes.push(...records);
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { 
          console.error(err) 
        } else {
          res.send(routes); 
      }
    });
});

app.get('/api/announcements', (req,res) => {
  const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
  const announcements = [];
  base('Announcements').select({
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.
      announcements.push(...records);

      fetchNextPage();

  }, function done(err) {
      if (err) { 
        console.error(err) 
      } else {
        res.send(announcements); 
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});