const express = require('express')
const path = require('path')
const Airtable = require('airtable');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
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

app.use(express.json())

app.get('/api/bouldering', (req,res) => {
    const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
    const routes = [];
    base('Bouldering').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

        const map = records.filter((record, i) => {
          record.fields.index = i + 1;
          record.fields.Color = functions.convertColors(record.fields.Color.replace(/\s/g, ''));
          return record.fields['On Wall'];
        });
        // This function (`page`) will get called for each page of records.
        routes.push(...map);
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

app.get('/api/wall/:wall', (req,res) => {
  const wall = req.params.wall;
  if (wall === 'Top-Roping' || wall === 'Lead') {
    const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
    const routes = [];
    base(wall).select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
  
        const filteredRecoreds = records.filter((record, i) => {
          record.fields.index = i + 1;
          return record.fields['On Wall'];
        });
        // This function (`page`) will get called for each page of records.
        routes.push(...filteredRecoreds);
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
  }
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

app.get('/api/reviews', (req,res) => {
  const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
  const reviews = [];
  base('Reviews').select({
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {

      // This function (`page`) will get called for each page of records.
      reviews.push(...records);

      fetchNextPage();

  }, function done(err) {
      if (err) { 
        console.error(err) 
      } else {
        res.send(reviews); 
    }
  });
});

app.post('/api/reviews', (req, res) => {
  const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');
  if(req.body.Rating) {
    req.body.Rating = parseInt(req.body.Rating);
  }

  if(req.body.Attempts) {
    req.body.Attempts = parseInt(req.body.Attempts);
  }

  base('Reviews').create([
    {
      "fields": req.body
    },
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    } else {
      res.status(200).send();
    }
  });
});

app.post('/api/email', async(req, res) => {
  const base = new Airtable({apiKey: process.env.VUE_APP_AIRTABLE_API_KEY}).base('appJF67FB8VuGSvDx');

  let resolveEmails = new Promise((resolve, reject) => {
      let emailList = [];
      base('Email-Contact-List').select({
        view: "Grid view"
      }).eachPage(function page(emails, fetchNextPage) {

          // This function (`page`) will get called for each page of records.
          emailList.push(...emails);

          fetchNextPage();

      }, function done(err) {
          if (err) { 
            reject(err);
          } else {
            emailList = emailList.map(record => {
              return record.fields.email;
            });
            resolve(emailList);
        }
      });
  });

  let emails = await resolveEmails;

  if(req.body) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: 'climber.crowd.contact@gmail.com',
             pass: 'climbingiscool123'
         }
     });

     var mailOptions = {
      from: 'climber.crowd.contact@gmail.com',
      to: emails.toString(),
      subject: `From: ${req.body.email} Subject: ${req.body.subject}`,
      text: req.body.content,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).send();
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send();
      }
    });
  }
});

app.get('/*', express.static('dist'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});