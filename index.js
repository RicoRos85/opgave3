const express    = require('express');
const bodyParser = require('body-parser')
const jwt        = require('jsonwebtoken');
const fs         = require('fs'); 
const app        = express();
const PORT       = 3010;
/*** Require all Controllers containing all relevant functions ***/
const {getUsers, deleteUser, createUser, getImage, getCreditCardInfo} = require ("./Controller/userController");
const {getInterests, deleteInterest, createInterest} = require("./Controller/interestsController");
const {getMatches, deleteMatch, createMatch} = require("./Controller/matchesController");


// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html');  }); 

// CRUD Users
app.get("/users", getUsers ); 
app.delete("/users/:userID", isAuthorized, deleteUser );
app.post("/users", createUser );
app.get("/users/:userID/images", isAuthorized, getImage );
app.get("/users/:userID/creditcard", isAuthorized, getCreditCardInfo );

// CRUD Interests
app.get("/users/:userID/interests", isAuthorized, getInterests );
app.delete("/users/:userID/interests/:interest", isAuthorized, deleteInterest );
app.post("/users/:userID/interests", isAuthorized, createInterest );

// CRUD Matches 
app.get("/users/:userID/matches", isAuthorized, getMatches );
app.delete("/users/:userID/matches/:match", isAuthorized, deleteMatch );
app.post("/users/:userID/matches", isAuthorized, createMatch );


app.get('/secret', isAuthorized, (req, res) => {
    res.json({"message": "Super Secret Message"})
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post Created...", 
                authData
            });
        }
    });
});

// Use /api/login to creare the privateKey/token 
app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: "Rico",
        email: "rico@gmail.com"
    }
    // jwt sign function (payload, secretOrPrivateKey, [options], callback )
    jwt.sign({user}, 'secretkey', /*{expiresIn: '30s'},*/ (err, token) => {
        res.json({
            token
        });
    });
});

// Create the privateKey token
app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token      = jwt.sign({"body":"stuff"}, privateKey, {algorithm: 'HS256'});
    res.send(token);
});

// Check to see if privateKey is valid and verify
function isAuthorized(req, res, next) {
    if(typeof req.headers.authorization !== "undefined") {
        /* Split the string by each containing space, and select 
           the 2nd element (the token) in the newly created array */
        let token = req.headers.authorization.split(" ")[1];
        // Use fs to read the pem file
        let privateKey = fs.readFileSync('./private.pem', 'utf8');

        jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, decoded) => {
            if(err) {
                res.status(401).json({ error: "Not Authorized"})
            }
            // console.log(decoded);
            // Continue
            return next();
        })
    } else {
        res.status(401).json({ error: "Not Authorized"})
    }
}

// Verify Token
function verifyToken(req, res, next) {
    // First get header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        res.sendStatus(401).json({ error: "Token is not verified"});
    }
}

app.listen(PORT, () => console.log(`Server runing on port: http://localhost:${PORT}`)); 