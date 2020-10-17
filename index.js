const express = require('express');
const jwt     = require('jsonwebtoken');
const fs      = require('fs'); 
const app     = express();
const PORT    = 3000;

let userController = require('./Controller/userController');

app.get('/', userController); 



//app.use(bodyParser.json());

//app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello from Homepage'));

app.get('/secret', isAuthorized, (req, res) => {
    res.json({"message": "Super Secret Message"})
})

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

app.listen(PORT, () => console.log(`Server runing on port: http://localhost:${PORT}`)); 