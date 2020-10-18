const { getUsers, FreeUser, PaymentUser } = require("./../Model/user.js");

module.exports = {
    getInterests(req, res) {
        let interests = getUsers();
        return res.status(200).send(interests);
    },
    deleteInterest(req, res) {

    },
    createInterest(req, res) {
        
    }
}