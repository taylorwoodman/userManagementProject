const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const bcrypt = require("bcrypt");
const controller = require("./controller");
const session = require("express-session");
const notes = require("./notes");
const path = require("path");
const app = express();
require('dotenv').config();

massive(process.env.DATABASE_URL).then(db => {
  app.set("db", db)
  .catch(error => console.error(error));
});

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "*" }));

app.get("/isAuth", (req, res) => res.send(!!req.session.user));

app.get("/isAdmin", (req, res) => {
  if (req.session.user) {
    res.send(req.session.user.admin);
  } else {
    res.send(false);
  }
});


app.use("/loggedIn", controller.loggedIn);

app.get("/users", controller.getUsers);

app.post("/signup", controller.handleSignup);

app.post("/login", controller.handleLogin);

app.put("/users/:id", controller.handleEdit);

app.get("/logout", controller.handleLogout);

app.delete("/users/:id", controller.handleDelete);

app.get("/allUsers", controller.allUsers);

app.get("/notes", notes.getNotes);

app.put("/updateNote/:id", notes.updateNote);

app.post("/addNote", notes.addNotes);

app.delete("/deleteNote/:id", notes.deleteNotes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080, () => console.log("Listening"));
