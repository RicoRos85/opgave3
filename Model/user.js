///////////////////////////
//// User Class
///////////////////////////
class User {
 
    // Create arrays for each User attribute
    interests  = [];
    matches    = [];
    images     = [];
    creditCard = [];

    // Create the User constructor
    constructor(userId, firstname, lastname, age, gender) {
        this.userId    = userId;
        this.firstname = firstname;
        this.lastname  = lastname;
        this.age       = age;
        this.gender    = gender;
    }

    // Function for calculating User age in years.
    calculateAge() {
        let date_1   = new Date(age);
        let diff     = Date.now() - date_1.getTime();
        var age_date = new Date(diff);
        return Math.abs(age_date.getUTCFullYear() - 1970); 
    }

    // Function for checking if User has a valid age
    checkAge() {
        if(this.calculateAge < 18) {
            return "Sorry, you are to young";
        }
    }
} 


///////////////////////////
//// PaymentUser Class
///////////////////////////
class PaymentUser extends User {

    // Create the PaymentUser constructor
    constructor(userId, firstname, lastname, age, gender, cardId) {
        super(userId, firstname, lastname, age, gender);
        this.cardId     = cardId;
    }

    // Function for checking if Card Number is an integer 
    checkCard() {
        if(this.cardId.length != int) {
            return res.status(401).send("Card number must be 16 digits.");
        }
    }
}


///////////////////////////
//// FreeUser Class
///////////////////////////
class FreeUser extends User {
    constructor(userId, firstname, lastname, age, gender) {
        super(userId, firstname, lastname, age, gender);
    }  
}


///////////////////////////
//// Match Class
///////////////////////////
class Match {
    constructor(user) {
        this.user = user;
    }
}


///////////////////////////
//// Interests Class
///////////////////////////
class Interests {
    constructor(name) {
        this.name = name;
    }
}


///////////////////////////
//// Image Class
///////////////////////////
class Image {
    constructor(img) {
        this.img = img;
    }
}


///////////////////////////
//// CreditCard Class
///////////////////////////
class CreditCard {
    constructor(name, cardId, ccv) {
        this.name       = name;
        this.cardId     = cardId;
        this.ccv        = ccv;
    }
}


// Make functions/Classes ready for export
module.exports = {
    getUsers() { return users; },
    getInterests() {  return interests;  },
    getMatches() {  return matches;  },
    getImage() {  return image;  },
    getCreditCardInfo() {  return creditCards;  },

    User: User,
    FreeUser: FreeUser,
    PaymentUser: PaymentUser,
    Interests: Interests,
    Match: Match,
    Image: Image,
    CreditCard: CreditCard
}