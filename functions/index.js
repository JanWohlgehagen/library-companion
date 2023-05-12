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


app.put('/Avatar', validateFirebaseIdToken, async (req, res) => {
    var img = req.rawBody;
    var userid = req.headers.userid;

    const bucket = admin.storage().bucket('gs://library-companion-1049c.appspot.com/');
    const file = bucket.file(`avatars/${userid}.jpg`)
    const stream = file.createWriteStream({
        resumable: false
    });

    stream.write(Buffer.from(img));
    stream.end();

    const [uploadResult] = await file.getMetadata();

    await admin.firestore().collection('User').doc(userid)
        .update({
            imageUrl: uploadResult.mediaLink
        })
    res.send(uploadResult.mediaLink)
})

app.put('/Email', async (req, res) => {
    var userid = req.body.userid
    var new_email = req.body.email


    await admin.firestore().collection('User').doc(userid)
        .update({
            email: new_email
        })
    res.send()
})