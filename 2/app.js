const express = require("express");
const app = express();
const login = require('./controllers/login-controller')
const signup = require('./controllers/signup-controller')
const{ isEmpty , isPassword ,isEmail}= require('./controllers/validation')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.post('/login',isEmpty("username"),isEmpty("password"),login)




app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post('/signup/user', isEmpty("username"),isPassword("password"),isEmail("email"),signup)


app.all("*",(req,res)=>{
  res.status(404).json({
    status:"fail",
    message:"cant find"
  })
})

app.listen(3000, () => {
  console.log("server running on port 3000....");
});
