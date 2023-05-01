const functions = require("firebase-functions");
const admin = require('firebase-admin');
const rateLimit = require('express-rate-limit')
const app = require('express')();
const cors = require('cors');

admin.initializeApp({projectId: 'library-companion-1049c'})

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
 standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
 legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors(), limiter);

const validateFirebaseIdToken = async (req, res, next) => {
 try {
  const token = req.headers?.authorization;
  functions.logger.log(token)
  req.user = await admin.auth().verifyIdToken(token);
  return next();
 } catch (error) {
  return res.status(403).json(error);
 }
}

exports.api = functions.https.onRequest(app);

app.post('/CreateUser', validateFirebaseIdToken, (req, res) => {
 var user = req.body;
 admin.firestore().collection('Users').doc(user.id)
     .set({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: false,
      joinDate: new Date(),
      imageUrl: "https://st4.depositphotos.com/3369547/29902/v/450/depositphotos_299027320-stock-illustration-silhouette-person-avatar-isolated-icon.jpg"
     })
 res.send("done")
})