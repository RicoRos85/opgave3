class User {
    constructor(userId, firstname, lastname, age, gender, member) {
        this.userId    = userId;
        this.firstname = firstname;
        this.lastname  = lastname;
        this.age       = age;
        this.gender    = gender;
        this.member    = member;
    }
} 

class PaymentUser extends User {
    constructor(userId, firstname, lastname, age, gender, member, cardId, expireDate) {
        super(userId, firstname, lastname, age, gender, member);
        this.cardId     = cardId;
        this.expireDate = expireDate;
    }
}

class FreeUser extends User {
    
}

module.exports = User;
module.exports = PaymentUser;