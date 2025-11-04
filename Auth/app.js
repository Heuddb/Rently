const express = require("express");
const home = require("./routes/home");
const auth = require("./routes/auth");
const app = express();
const register = require("./routes/register")
const myHome = require('./routes/myHome');
const mongoose = require('mongoose');
const mongo_url = 'mongodb+srv://root:root@cluster0.tosyv7y.mongodb.net/root?retryWrites=true&w=majority&appName=Cluster0';
// express session
const session = require('express-session');
// mongodb session
const mongodb_session = require('connect-mongodb-session')(session)
  
const mongoStore = new mongodb_session({
  uri:mongo_url,
  collection:'sessions'
})

app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from the public directory
app.use(express.static("public"));

// req body 
const body = require('body-parser');
app.use(body.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store:mongoStore

}))


app.use(home);
app.use(auth);
app.use(register);
app.use(myHome)


const PORT = 3000;


mongoose.connect(mongo_url).then(()=>{
  app.listen(PORT, () => {
  console.log(`server has started on http://localhost:${PORT}`);
});
}).catch((err)=>{
  console.log(err);
})

