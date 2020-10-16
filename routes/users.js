//import express from 'express';

const router = express.Router();

const users = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 24
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        age: 25
    }
]

// All routers in here are starting with /users
router.get('/', (req, res) => {
    
    res.send(console.log(users));  
}); 

router.post('/', (req, res) => {

}); 

export default router;