const functions = require('firebase-functions')
const app = require('express')()
const {  getAllAnncs,
         getAnnc,
         submitAnnc,
         updateAnnc,
         deleteAnnc,
         archiveAnnc } = require('./routes/anncs')
const { adminLogin } = require('./routes/adminLogin')
const { fbAuth } = require('./util/fbAuth')

//* ~~~ Announcements Routes ~~~ *//

app.get('/anncs', fbAuth, getAllAnncs)
app.get('/anncs/:anncId', fbAuth, getAnnc)
app.post('/anncs', submitAnnc)
app.put('/anncs/:anncId', fbAuth, updateAnnc)
app.put('/anncs/archive/:anncId', fbAuth, archiveAnnc)
app.delete('/anncs/archive/:anncId', fbAuth, deleteAnnc)

//* ~~~ Admin Routes ~~~ *//

app.post('/admin-login', adminLogin)

module.exports.api = functions.https.onRequest(app);