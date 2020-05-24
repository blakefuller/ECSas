const functions = require('firebase-functions')
const firebaseConfig = require('./config/firebaseConfig.json')
const firebase = require('firebase')
const app = require('express')()
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// GET - get all current announcements
app.get('/anncs', (req, res) => {
   db
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
   db
      .collection('announcements')
      .doc(req.params.anncId)
      .get()
      .then(doc => {
         if(!doc.exists) {
            res.status(404).json({error: `Document ${doc.id} not found`});
            return;
         }
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

   db
      .collection('announcements')
      .add(newAnnc)
      .then(doc => {
         res.status(201).json({message: `Document ${doc.id} created successfully`});
      })
      .catch(err => {
         res.status(500).json({error: 'Something went wrong, post not created'});
         console.error(err);
      })
})

// PUT - update announcement by ID
app.put('/anncs/:anncId', (req, res) => {
   const updatedAnnc = {
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

   db
      .collection('announcements')
      .doc(req.params.anncId)
      .update(updatedAnnc)
      .then(result => {
         res.status(200).json(
            {
               id: req.params.anncId,
               time: result.writeTime.toDate(),
               message: 'Document sucessfully updated'
            }
         )
      })
      .catch(err => {
         res.status(404).json({error: 'Document not found'});
         console.error(err);
      })
})

// DELETE - delete announcement by ID
app.delete('/anncs/:anncId', (req, res) => {
   db
      .collection('announcements')
      .doc(req.params.anncId)
      .delete()
      .then(result => {
         res.status(200).json(
            {
               id: req.params.anncId,
               time: result.writeTime.toDate(),
               message: 'Document sucessfully deleted'
            }
         )
      })
      .catch(err => {
         res.status(404).json({error: 'Document not found'});
         console.error(err);
      })
})

exports.api = functions.https.onRequest(app);