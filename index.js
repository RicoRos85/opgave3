const express = require('express');
const app     = express();
const PORT    = 3000;

let userController = require('./Controller/userController');

app.get('/', userController); 



//app.use(bodyParser.json());

//app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello from Homepage'));

app.listen(PORT, () => console.log(`Server runing on port: http://localhost:${PORT}`)); 