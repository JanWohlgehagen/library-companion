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
    res.send()
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


app.put("/updateBorrowedBooks", validateFirebaseIdToken, async(req, res) => {

        var userId = req.body.userId
        var borrowedBooks = req.body.borrowedBooks
    console.log(typeof borrowedBooks[0].book.releaseYear)
        //console.log(borrowedBooks)
        await admin.firestore().collection('User').doc(userId).update({
            books: borrowedBooks
        })
    res.send()
})

app.delete("/deleteUser", validateFirebaseIdToken, async (req,res) => {

    var userId = req.body.userId
    console.log(userId)

    res.send()

    await admin.firestore().collection('User').doc(userId).delete()

   await admin.auth().deleteUser(userId)

})

app.post("/createBook", validateFirebaseIdToken, async (req, res) => {
    var doc = await admin.firestore().collection('Book').add(req.body)
            await admin.firestore().collection("Book").doc(doc._resourcePath.id)
                .update({
                    id: doc._resourcePath.id
                })
    res.send(doc._resourcePath.id)
})



app.delete("/deleteBook/:bookId", validateFirebaseIdToken, async (req, res) => {
    const doc = await admin.firestore().collection("Book").doc(req.params.bookId).get();
try {
    const deleteResult = await admin.firestore().collection("Book").doc(doc.id).delete();
    return res.json(deleteResult);
} catch (e) {
    console.log(e)
}})

app.put("/updateBook", validateFirebaseIdToken, async (req, res) => {
    let book = req.body.book
    console.log("book = " + book)
    try {
        const updateResult = await admin.firestore().collection("Book").doc(book.id).set(book);
        return res.json(updateResult)
    } catch (e) {
        console.log(e)
    }
})

app.post("/sendMail", validateFirebaseIdToken, (req, res ) => {
    let book = req.body.borrowedBook
    let user = req.body.user

    let Email = {
        to: user.email,
        message:{
            subject: "Reminder to deliver book.",
            html: "Dear " + user.name + " <br> " +
                "You are due to deliver " + book.book.title + " you delivery date was: " + book.dueDate + "<br>" +
                "if you fail to deliver the book within 7 days, we will have to charge you with a fee of 50 dkr." +
                "We hope you will soon be able to deliver the book, if you have any troubles please contact with any of theese methods: <br><br>" +
                "Phone: +45 76 16 20 00 <br>"+
                "Email: Library-Companion@gmail.com <br>" +
                "Physical Adress: Nørregade 19, 6700 Esbjerg, Denmark <br> <br>" +
                "Kind Regards <br>" +
                "Library Companion"
        }
    }
    try {
        admin.firestore().collection("Mails").add(Email);

    }
    catch(e)
    {
        console.log(e)
    }
})

app.get("/books", (req, res) => {
    let books = []
    admin.firestore().collection("Book").onSnapshot(snapshot => {

        snapshot.docChanges().forEach(change => {
            let book = change.doc;
            if (change.type == "added") {
                this.books.push(book);
            }
            if (change.type == "modified") {
                const index = this.books.findIndex(document => document.id == change.doc.id);
                this.books[index] = book
            }
            if (change.type == "removed") {
                this.books = this.books.filter(ussr => ussr.id != book.id);
            }
        })
    })
    res.send(books)
})

app.put('/bookImage', async (req, res) => {
    var img = req.rawBody;
    var bookId = req.headers.bookid;
    console.log(req.headers.bookid)

    const bucket = admin.storage().bucket('gs://library-companion-1049c.appspot.com/');
    const file = bucket.file(`bookImages/${bookId}.jpg`)
    const stream = file.createWriteStream({
        resumable: false
    });

    stream.write(Buffer.from(img));
    stream.end();
    res.send()
})
