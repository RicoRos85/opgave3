let User = require('../Model/user.js');

let users = [];
let User1 = new User(2736627, "Rico", "Rosenkrans", 30, "Mand", true, 2782, 92929);
let User2 = new User(2736628, "Ole", "Hansen", 34, "Mand", true, 2782, 92929);
let User3 = new User(2736629, "Helle", "Jørgensen", 23, "Kvinde", true, 2782, 92929);
users.push(User1,User2, User3);

function userController(req, res) {
    let elem = `<strong>ID:</strong> ${users}`;
    let appendElem = elem.appendChild;
    let displayUser = res.end(JSON.stringify(users));
    console.log(displayUser);
}

module.exports = userController;

console.log(users[0]);