const express    = require('express');
const bodyParser = require('body-parser')
const jwt        = require('jsonwebtoken');
const fs         = require('fs'); 
const app        = express();
const PORT       = 3000;
const {getUsers, deleteUser, createUser, getImage, getCreditCardInfo} = require ("./Model/user");

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html');  }); 
app.get("/users", getUsers ); 
//app.post("/users", isAuthorized, createUser);
app.get("/users/:userID/images", isAuthorized, getImage );


//app.post('/users', (req, res) => { console.log(req.body); });

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

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token      = jwt.sign({"body":"stuff"}, privateKey, {algorithm: 'HS256'});
    res.send(token);
})

function isAuthorized(req, res, next) {
    if(typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');

        jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, decoded) => {
            if(err) {
                res.status(500).json({ error: "Not Authorized"})
            }
            console.log(decoded);

            return next();
        })
    } else {
        res.status(500).json({ error: "Not Authorized"})
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
        res.sendStatus(403);
    }
}

app.listen(PORT, () => console.log(`Server runing on port: http://localhost:${PORT}`)); 