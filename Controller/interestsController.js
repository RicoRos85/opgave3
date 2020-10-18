const { getUsers, FreeUser, PaymentUser } = require("./../Controller/userController.js");    

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