const { fbAdmin, db } = require('./fbAdmin')

// middleware to authenticate protected API actions
//    this function is provided as the second argument
//    in any protected api route
exports.fbAuth = (req, res, next) => {
   if(req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer ')) {
         idToken = req.headers.authorization.split('Bearer ')[1];
   } else {
      console.error('No token found')
      return(res.status(403).json({error: 'Unauthorized'}))
   }
   fbAdmin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
         req.user = decodedToken;
         console.log(decodedToken)
         return db.collection('admins')
            .where('userId', '==', req.user.uid)
            .limit(1)
            .get()
      })
      .then(data => {
         req.user.name = data.docs[0].data().name;
         return next();
      })
      .catch(err => {
         console.error('Error while verifying token ', err);
         return res.status(403).json(err);
      })
}