const { db } = require('../util/fbAdmin')

//* ~~~ Archive Routes ~~~ *//

// ARCHIVE - archive announcement by ID
exports.archiveAnnc = (req, res) => {
   // get annc by ID and store data
   db
      .collection('announcements')
      .doc(req.params.anncId)
      .get()
      .then(doc => {
         if(!doc.exists) {
            res.status(404).json({error: `Document ${doc.id} not found`});
            return;
         }
         // if the document is found, add it to 'archive' collection:
         db
            .collection('archive')
            .add(doc.data())
            .then(doc => {
               res.status(201).json({message: `Document ${doc.id} ` +
                                    'archived successfully'});
            })
            .catch(err => {
               console.error(err);
            })
         // delete the document from 'announcements' collection:
         db
            .collection('announcements')
            .doc(doc.id)
            .delete()
            .then(() => {
               res.status(204).send()
            })
            .catch(err => {
               console.error(err);
            })
      })
      .catch(err => {
         console.error(err);
      })
}

// GET - get all archived announcements
exports.getAllArchAnncs = (req, res) => {
   db
      .collection('archive')
      .get()
      .then(data => {
         let anncs = []
         data.forEach(doc => {
            anncs.push({id: doc.id, ...doc.data()});
         });
         return(res.json(anncs))
      })
      .catch(err => {
         console.error(err);
      })
}

// get archived announcement by ID
exports.getArchAnnc = (req, res) => {
   db
      .collection('archive')
      .doc(req.params.anncId)
      .get()
      .then(doc => {
         if(!doc.exists) {
            res.status(404).json({error: `Document ${doc.id} not found`});
            return;
         }
         return(res.json({id: doc.id, ...doc.data()}))
      })
      .catch(err => {
         console.error(err);
      })
}

// DELETE - delete announcement by ID from archive
exports.deleteArchAnnc = (req, res) => {
   db
      .collection('archive')
      .doc(req.params.anncId)
      .delete()
      .then(() => {
         res.status(204).send()
      })
      .catch(err => {
         res.status(404).json({error: 'Document not found'});
         console.error(err);
      })
}