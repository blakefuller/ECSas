const { db } = require('../util/fbAdmin')
const model = require('../util/anncModel')

//* ~~~ Announcements Routes ~~~ *//

// GET - get all current announcements
exports.getAllAnncs = (req, res) => {
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
}

// get announcement by ID
exports.getAnnc = (req, res) => {
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
}

// submit new announcement
exports.submitAnnc = (req, res) => {
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
}

// update announcement by ID
exports.updateAnnc = (req, res) => {
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
}
