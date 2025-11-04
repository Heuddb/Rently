const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

let getAuth = (req, res, next) => {
  res.render("auth", { isLoggedIn: false, error: null });
};

let postAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid email or password");
     
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    
    req.session.isLoggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    res
      .status(401)
      .send("Invalid email or password")
      .render("auth", { isLoggedIn: false, error: [error.message] });
  }
};

let postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

let getSignup = (req, res, next) => {
  res.render("signup", {
    error: null,
    isLoggedIn: false,
    oldInput: {
      username: "",
      email: "",
      password: "",
    },
  });
};

// validation chains
const username = check("username")
  .notEmpty()
  .withMessage("username cannot be empty")
  .isLength({ min: 4 })
  .withMessage("username must be at least 4 characters long")
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage("username must not contain special characters or numbers")
  .trim();

const email = check("email")
  .notEmpty()
  .withMessage("email cannot be empty")
  .isEmail()
  .withMessage("please enter a valid email")
  .normalizeEmail();

const password = check("password")
  .notEmpty()
  .withMessage("Password cannot be empty")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")
  .matches(/^(?=.*[0-9])(?=.*[A-Z]).*$/)
  .withMessage(
    "Password must contain at least one uppercase letter and one number"
  );

const confirmPassword = check("confirm-password")
  .notEmpty()
  .withMessage("confirm password cannot be empty")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("passwords do not match");
    }

    return true;
  });

const accountType = check("accountType")
  .notEmpty()
  .withMessage("Account type must be selected")
  .isIn(["user", "host"])
  .withMessage("Invalid account type selected");

const terms = check("terms")
  .notEmpty()
  .withMessage("Terms and conditions must be accepted")
  .custom((value) => {
    if (value !== "on") {
      throw new Error("Terms and conditions must be accepted");
    }
    return true;
  })
  .withMessage("Terms and conditions must be accepted");

let postSignup = [
  username,
  email,
  password,
  confirmPassword,
  accountType,
  terms,

  (req, res, next) => {
    const { username, email, password, confirmPassword, accountType, terms } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("signup", {
        isLoggedIn: false,
        error: errors.array().map((err) => err.msg),
        oldInput: {
          username,
          email,
          password,
          confirmPassword,
          accountType,
        },
      });
    }
    console.log(req.body);

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        username,
        email,
        password: hashedPassword,
        accountType,
        termsAccepted: true,
      });

      user
        .save()
        .then(() => {
          console.log("User saved to database");
          console.log("user sign up sucessfulyy");
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          return res.status(422).render("signup", {
            isLoggedIn: false,
            error: [err],
            oldInput: {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              confirmPassword: req.body.confirmPassword,
              accountType: req.body.accountType,
            },
          });
        });
    });
  },
];
module.exports = { getAuth, postAuth, postLogout, getSignup, postSignup };
