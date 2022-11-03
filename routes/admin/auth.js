const express = require("express");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");
const { check, validationResult } = require("express-validator");
const { handleErrors } = require("./middlewares");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser,
} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
  console.log("get signup");
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you were logout");
});

router.get("/signin", (req, res) => {
  console.log("get signin");
  res.send(signInTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(signInTemplate),
  async (req, res) => {
    console.log("post signin");
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email: email });

    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

module.exports = router;
