const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    //fetch data
    const { firstName, lastName, email, password } = req.body;

    //validation
    if (!firstName || !lastName || !email || !password) {
      return res.json({
        success: false,
        message: "fill all fields",
      });
    }

    //check user is already registerd or not
    const Userexist = await User.findOne({ email });

    if (Userexist) {
      return res.json({
        success: false,
        message: "user is already registered go to login ",
      });
    }

    //hash password
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "error in hashpassword",
        error: err.message,
      });
    }

    //create entry

    const Entry = await User.create({
      firstName,
      lastName,
      password: hashpassword,
      email,
    });

    console.log(" create entry in db");

    res.status(200).json({
      success: true,
      message: "user successfully signup ",
      data: Entry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in controller code",
      Error: err.message,
    });
  }
};

//login

exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.json({
        success: false,
        message: "enter all fields ",
      });
    }

    //check user is registerd or not
    const userexist = await User.findOne({ email });

    if (!userexist) {
      return res.json({
        success: false,
        message: "user didnot registerd",
      });
    }

    //verify password
    const verifyPassword = bcrypt.compare(password, userexist.password);

    console.log("check password is right or wrong ");
    if (!verifyPassword) {
      res.status(400).json({
        success: false,
        message: "password is wrong ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in cotroller code ",
      Error: err.message,
    });
  }
};
