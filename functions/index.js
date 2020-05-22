const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = '/home/blakefuller/.firebase/ecsas-4e69c-firebase-adminsdk-mnrod-832fa60090.json'
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
   response.send("Hello world");
});

// get all current announcements
exports.getAnncs = functions.https.onRequest((req, res) => {
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

// submit new announcement
exports.createAnnc = functions.https.onRequest((req, res) => {
   const newAnnc = {
      audience: req.body.audience,
      category: req.body.category
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