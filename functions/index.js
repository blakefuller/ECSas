const functions = require('firebase-functions')
const app = require('express')()
const {  getAllAnncs,
         getAnnc,
         submitAnnc,
         updateAnnc } = require('./routes/anncs')
const {  getAllArchAnncs,
         getArchAnnc,
         archiveAnnc,
         deleteArchAnnc } = require('./routes/archive')
const { adminLogin } = require('./routes/adminLogin')
const { fbAuth } = require('./util/fbAuth')

//* ~~~ Announcements Routes ~~~ *//
app.get('/anncs', fbAuth, getAllAnncs)
app.get('/anncs/:anncId', fbAuth, getAnnc)
app.post('/anncs', submitAnnc)
app.put('/anncs/:anncId', fbAuth, updateAnnc)

//* ~~~ Archive Routes ~~~ *//
app.get('/archive', fbAuth, getAllArchAnncs)
app.get('/archive/:anncId', fbAuth, getArchAnnc)
app.put('/archive/:anncId', fbAuth, archiveAnnc)
app.delete('/archive/:anncId', fbAuth, deleteArchAnnc)

//* ~~~ Admin Routes ~~~ *//
app.post('/admin-login', adminLogin)

module.exports.api = functions.https.onRequest(app);