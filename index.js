const express = require('express')
const path = require('path')
const Airtable = require('airtable');
const dotenv = require('dotenv');
const functions = require('./functions');
const PORT = process.env.PORT || 5000
const app = express();

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});