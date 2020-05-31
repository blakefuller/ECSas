const functions = require('firebase-functions')
const app = require('express')()
const {  getAllAnncs,
         getAnnc,
         submitAnnc,
         updateAnnc,
         deleteAnnc } = require('./routes/anncs')
const { adminLogin } = require('./routes/adminLogin')
const { fbAuth } = require('./util/fbAuth')

//* ~~~ Announcements Routes ~~~ *//

app.get('/anncs', getAllAnncs)
app.get('/anncs/:anncId', getAnnc)
app.post('/anncs', submitAnnc)
app.put('/anncs/:anncId', fbAuth, updateAnnc)
app.delete('/anncs/:anncId', fbAuth, deleteAnnc)

//* ~~~ Admin Routes ~~~ *//

app.post('/admin-login', adminLogin)

module.exports.api = functions.https.onRequest(app);