const express = require("express");
const router = express.Router();
const { browseService } = require("../services");

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
}

function authenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect(`/sign_in?redirect=${req.path}`);
  }
  next();
}

router.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

router.get("/", function (req, res) {
  res.render("index", { title: "HOME" });
});

router.get("/sign_in", isLoggedIn, function (req, res) {
  res.render("sign_in", { title: "SIGN IN" });
});

router.get("/sign_up", isLoggedIn, function (req, res) {
  res.render("sign_up", { title: "SIGN UP" });
});

router.get("/sign_out", function (req, res) {
  req.session.user = undefined;
  req.session.save();
  res.redirect("/");
});

router.get("/create_campaign", authenticated, function (req, res) {
  res.render("create_campaign", { title: "CREATE CAMPAIGN" });
});

router.get("/campaigns", async function (req, res) {
  const { data, total } = await browseService.findCategories("campaigns", {
    offset: 0,
    limit: 25,
  });

  res.render("campaigns", { title: "CAMPAIGNS", campaigns: data });
});

module.exports = router;
