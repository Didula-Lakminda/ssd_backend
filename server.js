const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');

const https = require('https');

const fs = require('fs');

const path = require('path');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

//inject as middleware
app.use(passport.initialize());

require('./middlewares/Validate.token')(passport);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser:true, 
    useUnifiedTopology: true,
}, error => {
    if(error){
        console.log('Database connection failed' + error.message );
    } 
});

mongoose.connection.once('open', ()=>{
    console.log('Database connected successfully');
});

app.get("/", (req, res) => res.status(200).send("SSD"));

app.use('/api/users', require('./routes/Login_Routes/User_login.route'));
app.use('/api/users', require('./routes/Protected_Routes/User_Protected.route'));
app.use('/api/users', require('./routes/Register_Routes/User_Register.route'));

module.exports = app;

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  }, app);

  sslServer.listen(PORT, () => {

  console.log(`Secure app listening on port ${PORT}`)

});