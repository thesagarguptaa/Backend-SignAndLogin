const express = require("express");
const router = express.Router();

// import controller
const { signUp, login } = require("../Controller/User");

//define API route

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
