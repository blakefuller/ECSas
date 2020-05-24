const functions = require('firebase-functions')
const firebaseConfig = require('./config/firebaseConfig.json')
const firebase = require('firebase')
const Joi = require('@hapi/joi')
const model = require('./anncModel')
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
   // validate request body against announcement model
   const result = model.schema.validate(req.body);
   if (result.error) {
      res.status(400).json({message: result.error.details[0].message});
   } else {
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
   }
})

// PUT - update announcement by ID
app.put('/anncs/:anncId', (req, res) => {
   // validate request body against announcement model
   const result = model.schema.validate(req.body);
   if (result.error) {
      res.status(400).json({message: result.error.details[0].message});
   } else {
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
            res.status(204).send()
         })
         .catch(err => {
            res.status(404).json({error: 'Document not found'});
            console.error(err);
         })
   }
})

// DELETE - delete announcement by ID
app.delete('/anncs/:anncId', (req, res) => {
   db
      .collection('announcements')
      .doc(req.params.anncId)
      .delete()
      .then(() => {
         res.status(204).send()
      })
      .catch(err => {
         res.status(404).json({error: 'Document not found'});
         console.error(err);
      })
})

// LOGIN - login function for admin user
app.post('/admin-login', (req, res) => {
   // validate that email and password are passed
   const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
   })
   const result = schema.validate(req.body);
   if (result.error) {
      res.status(400).json({message: result.error.details[0].message});
   } else {
      firebase
         .auth()
         .signInWithEmailAndPassword(req.body.email, req.body.password)
         .then(data => {
            return data.user.getIdToken();
         })
         .then(token => {
            return res.json({token});
         })
         .catch(err => {
            console.error(err);
            if(err.code === 'auth/wrong-password') {
               return res.status(403).json({general: 'Incorrect password'});
            }
            return res.status(500).json({error: err.code});
         })
   }
})

exports.api = functions.https.onRequest(app);