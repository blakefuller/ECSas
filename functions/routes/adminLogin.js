const { firebase } = require('../util/fbAdmin')
const Joi = require('@hapi/joi')

// LOGIN - login function for admin user
exports.adminLogin = (req, res) => {
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
}