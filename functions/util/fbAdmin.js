const fbAdmin = require('firebase-admin')
const firebase = require('firebase')
const firebaseConfig = require('../config/firebaseConfig.json')
firebase.initializeApp(firebaseConfig)
fbAdmin.initializeApp(firebaseConfig)
const db = firebase.firestore()

module.exports = {fbAdmin, firebase, db}