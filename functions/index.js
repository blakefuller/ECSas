const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./config/ecsas-4e69c-firebase-adminsdk-mnrod-832fa60090.json')

const express = require('express')
const app = express()

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
})

// GET - get all current announcements
app.get('/anncs', (req, res) => {
   admin
      .firestore()
      .collection('announcements')
      .get()
      .then(data => {
         let anncs = []
         data.forEach(doc => {
            anncs.push(doc.data());
         });
         return(res.json(anncs))
      })
      .catch(err => {
         console.error(err);
      })
})

// GET - get announcement by ID
app.get('/anncs/:anncId', (req, res) => {
   admin
      .firestore()
      .collection('announcements')
      .doc(req.params.anncId)
      .get()
      .then(doc => {
         return(res.json(doc.data()))
      })
      .catch(err => {
         console.error(err);
      })
})

// POST - submit new announcement
app.post('/anncs', (req, res) => {

   const newAnnc = {
      category: req.body.category,
      audience: req.body.audience,
      evnt_title: req.body.evnt_title,
      evnt_date: req.body.evnt_date,
      evnt_loc: req.body.evnt_loc,
      cont_name: req.body.cont_name,
      cont_email: req.body.cont_email,
      num_weeks: req.body.num_weeks,
      description: req.body.description,
      url: req.body.url,
      sub_name: req.body.sub_name,
      sub_email: req.body.sub_email,
      timestamp: new Date().toISOString()
   }

   admin
      .firestore()
      .collection('announcements')
      .add(newAnnc)
      .then(doc => {
         res.status(201).json({message: `document ${doc.id} created successfully`});
      })
      .catch(err => {
         res.status(500).json({error: 'something went wrong'});
         console.error(err);
      })
})

// PATCH - update 

exports.api = functions.https.onRequest(app);