//let User = require('../Model/user.js');
const { getUsers, FreeUser, PaymentUser } = require("./../Model/user.js");


// module.exports = userController;

module.exports = {
    getUsers(req, res) { 
        let users = getUsers();
        return res.status(200).send(users);
    },
    deleteUser(req, res) {
        let users  = getUsers();
        const userID = req.params.userID; 
        for(i = 0; i < users.length; i++) {
            if(users[i].userID == userID) {
                users.splice(i,1);
                return res.status(200).send("User deleted");
            } 
        }
        return res.status(404).send("User do not exist.");
    },
    createUser(req, res) {
        let users = getUsers();
        let user3 = new FreeUser("Rico", "Rosenkrans", 30, "Male");
        users.push(user3);
        return res.status(201).send(user3);
    },
    getImage(req, res) {
        let users  = getUsers();
        let userID = req.params.userID;
        for(i = 0; i < users.length; i++) {
            if(users[i].userID == userID) {
                return res.status(200).send(users[i].image);
            }
        }
    },
    getCreditCardInfo(req, res) {
        let users  = getUsers();
        let userID = req.params.userID;
        let paymentUser = PaymentUser;

        for(i = 0; i < users.length; i++) {
            if(users[i].userID == userID) {
                return res.status(200).send(users[i].cardId);   
            }
        }
    }
}

//console.log(users[0]);