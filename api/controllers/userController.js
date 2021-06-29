const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt")
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../radioApp.db"));
// Route handles goes underneath here...
const whoami = (req, res) => {
  res.json(req.session.user || null);
};
const login = (req, res) => {

  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = {
    $email: req.body.email
  };
  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({
        error: "This user doesn't exist"
      });
      return;
    }
  // Before login check the crypted password 
    req.body.password = Encrypt.encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password
      req.session.user = userInDB;
      res.json({
        success: "Successfull login",
        loggedInUser: userInDB
      })
    } else {
      res.status(401).json({
        error: "Wrong credentials"
      })
    }
  })
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({
    success: "Successfull Logout"
  });
}

const register = (req, res) => {
  let userToRegister = req.body;
  // Before trying to register the user, lets find out if the user already exists 
  let query = /*sql*/ `SELECT * FROM users WHERE email = $email`;
  let params = {
    $email: userToRegister.email
  };
  db.get(query, params, (err, result) => {
    if (result) {
      res.json({
        error: "A user with this email already exists"
      });
    } else {

      userToRegister.password = Encrypt.encrypt(userToRegister.password);
      query = /*sql*/ `INSERT INTO users (userName, email, password) VALUES ($userName, $email, $password)`;
      params = {
        $userName: userToRegister.userName,
        $email: userToRegister.email,
        $password: userToRegister.password,
      };
      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({
            error: err
          });
          return;
        }
        res.json({
          success: "Successfully registered User",
          lastID: this.lastID,
        })
      });
    }
  });
};

module.exports = {
  whoami,
  login,
  logout,
  register
};