const fbAdmin = require('firebase-admin')
const firebase = require('firebase')
const firebaseConfig = require('../config/firebaseConfig.json')
const serviceAccount = require('../config/serviceAccount.json')
firebase.initializeApp(firebaseConfig)
fbAdmin.initializeApp({
   credential: fbAdmin.credential.cert(serviceAccount),
   databaseURL: firebaseConfig.databaseURL
})
const db = fbAdmin.firestore()

module.exports = {fbAdmin, firebase, db}