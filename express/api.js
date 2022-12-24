const express = require("express");
const app = express();
const port = 27469;
const crypto = require("crypto");
const testaccount = {
  username: "testaccount@gmail.com",
  password: "123456abc",
};
var active_sessions = [];
const cors = require("cors");

function giveToken(username) {
  if (!username) return;
  let myToken = crypto.randomBytes(64).toString("hex"); //Generate a random token
  active_sessions = active_sessions.filter((x) => x.user != username); //Remove existing tokens for this user
  active_sessions.push({ user: username, token: myToken }); //Add the token generated to active sessions so we recognize it
  console.log(`User has logged in as ${username}!`);
  return myToken;
}

app.use(cors());

app.get("/", (req, res) => {
  if (!req.query.action) {
    res.status(400).json({
      status: "ACTION_REQURED",
      message: "Action parameter is mandatory for authentication API.",
    });
    return;
  }

  if (req.query.action == "login") {
    if (req.query.username && req.query.password) {
      if (
        req.query.username == testaccount.username &&
        req.query.password == testaccount.password
      ) {
        res.status(200).json({
          status: "LOGIN_SUCCESFUL",
          message: "Login was succesful!",
          token: giveToken(req.query.username),
        });
      } else {
        res.status(401).json({
          status: "BAD_CREDENTIALS",
          message: "Username or password combination was wrong!",
        });
      }
    } else {
      //Credentials missing, bad request
      res.status(400).json({
        status: "CREDENTIALS_REQUIRED",
        message: "Username and password must be provided for authentication.",
      });
    }
  } else if (req.query.action == "auth") {
    if (req.query.token) {
      let session = active_sessions.find((x) => x.token == req.query.token);
      if (session) {
        //Valid token
        res.status(200).json({
          status: "AUTH_SUCCESFUL",
          message: "User authentication succesful.",
          username: session.user,
        });
      } else {
        //Invalid token
        res.status(400).json({
          status: "BAD_AUTH",
          message: "Invalid token.",
        });
      }
    } else {
      res.status(400).json({
        status: "TOKEN_REQUIRED",
        message: "Token required.",
      });
    }
  } else {
    res.status(400).json({
      status: "INVALID_ACTION",
      message: "Invalid action.",
    });
  }
});

app.listen(port, () => {
  console.log(`Ertuway Backend up and running at port ${port}`);
});
