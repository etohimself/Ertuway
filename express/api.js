const express = require("express");
const app = express();
const port = 27469;
const crypto = require("crypto");
const {
  products,
  maincategories,
  subcategories,
  pagelist,
  eventlist,
} = require("./db.js");
const testaccount = {
  username: "testaccount@gmail.com",
  password: "123456abc",
};
var active_sessions = [];
const cors = require("cors");

function shuffleArr(array) {
  let myArray = [...array];
  for (var i = myArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = myArray[i];
    myArray[i] = myArray[j];
    myArray[j] = temp;
  }
  return myArray;
}

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

app.get("/products", (req, res) => {
  if (req.query.maincategory) {
    res
      .status(200)
      .json(products.filter((x) => x.maincategory == req.query.maincategory));
  } else {
    res.status(200).json(products);
  }
});

app.get("/maincategories", (req, res) => {
  res.status(200).json(maincategories);
});

app.get("/subcategories", (req, res) => {
  if (req.query.maincategory) {
    res
      .status(200)
      .json(
        subcategories.filter((x) => x.maincategory == req.query.maincategory)
      );
  } else {
    res.status(200).json(subcategories);
  }
});

app.get("/pagelist", (req, res) => {
  res.status(200).json(pagelist);
});

app.get("/eventlist", (req, res) => {
  res.status(200).json(eventlist);
});

app.get("/eventcategories", (req, res) => {
  let results = [];

  //For each event
  eventlist.forEach((ev) => {
    //Filter products for that event
    let evPd = products.filter((x) => x.saleReason == ev.eventName);
    //Get distinct subcategories
    let subcats = [
      ...new Set(
        evPd.map((x) =>
          subcategories.find((cat) => cat.shortname == x.subcategory)
        )
      ),
    ];

    //Add maximum discounts
    subcats = subcats.map((x) => {
      return {
        ...x,
        maxSale: evPd
          .filter((p) => p.subcategory == x.shortname)
          .sort((a, b) => (a.salePercentage > b.salePercentage ? -1 : 1))[0]
          .salePercentage,
      };
    });
    results.push({ event: ev, subcategories: shuffleArr(subcats) });
  });
  res.status(200).json(results);
});

app.get("/bestdeals", (req, res) => {
  if (req.query.category) {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.subcategory == req.query.category))
        .sort((a, b) => (a.salePercentage > b.salePercentage ? -1 : 1))
        .slice(0, 8)
    );
  } else {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.saleReason))
        .sort((a, b) => (a.salePercentage > b.salePercentage ? -1 : 1))
        .slice(0, 8)
    );
  }
});

app.get("/bestsellers", (req, res) => {
  if (req.query.category) {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.subcategory == req.query.category))
        .sort((a, b) => (a.soldCount > b.soldCount ? -1 : 1))
        .slice(0, 8)
    );
  } else {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.saleReason))
        .sort((a, b) => (a.soldCount > b.soldCount ? -1 : 1))
        .slice(0, 8)
    );
  }
});

app.get("/mostviewed", (req, res) => {
  if (req.query.category) {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.subcategory == req.query.category))
        .sort((a, b) => (a.viewCount > b.viewCount ? -1 : 1))
        .slice(0, 8)
    );
  } else {
    res.status(200).json(
      shuffleArr(products.filter((x) => x.saleReason))
        .sort((a, b) => (a.viewCount > b.viewCount ? -1 : 1))
        .slice(0, 8)
    );
  }
});

app.listen(port, () => {
  console.log(`Ertuway Backend up and running at port ${port}`);
});
