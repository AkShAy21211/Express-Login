const express = require("express");
const router = express.Router();


const users = [
  {
    id: "user1",
    name: "Akshay",
    email: "akshay@gmail.com",
    password: "a123",
  },
  { id: "user2",
  name: "kiran",
  email: "kiran@gmail.com",
  password: "k123",

  }
 
];
/* GET home page. */
router.get("/", (req, res) => {

  if (req.session.user?.loggedin) {
    let userData = users.find((x) => x.id === req.session.user.id);
  
    res.render("home", { userData });
  } else {
    res.redirect("/login");
  }
  console.log(req.cookies);
});
router.get("/login", function (req, res) {
  if (req.session.user?.loggedin) {
    res.redirect("/");
  } else {
    res.render("login", { err: req.session.err });
    delete req.session.err;
  }

});

router.post("/login", function (req, res) {
  let { Email, Password } = req.body;
  let user = users.find((x) => x.email === Email && x.password === Password);
  if (user) {
    req.session.user = {
      id: user.id,
      loggedin: true,
    };
    res.redirect("/");
  } else {
    req.session.err = "Invalid Email or Password!";
    res.redirect("/login");
  }


});

router.get("/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/login");
});

module.exports = router;