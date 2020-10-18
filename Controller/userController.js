let User = require('../Model/user.js');
const { getUsers, FreeUser, PaymentUser } = require("./../index");

// let users = [];
// let User1 = new User(2736627, "Rico", "Rosenkrans", 30, "Mand", 2782, 92929);
// let User2 = new User(2736628, "Ole", "Hansen", 34, "Mand", true, 2782, 92929);
// let User3 = new User(2736629, "Helle", "Jørgensen", 23, "Kvinde", true, 2782, 92929);
// users.push(User1,User2, User3);

function userController(req, res) {
    let elem = `<strong>ID:</strong> ${users}`;
    let appendElem = elem.appendChild;
    let displayUser = res.end(JSON.stringify(users));
    console.log(displayUser);
}

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
        let user1 = new FreeUser("Rico", "Rosenkrans", 30, "Male");
        users.push(user1);
        return res.status(201).send(user1);
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