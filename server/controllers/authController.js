const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const otpGenerator = require("otp-generator");

const sendOtp = require("../utils/sendOtp");


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // check existing
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // generate otp
    const otp = otpGenerator.generate(6, {

      upperCaseAlphabets: false,

      specialChars: false,
    });

    // create user
    const user = await User.create({

      name,
      email,

      password: hashedPassword,

      role,

      otp,

      isVerified: false,
    });

    // send otp
    await sendOtp(email, otp);

    res.status(200).json({

      success: true,

      message:
        "OTP sent to email",

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Signup Failed",
    });
  }
};


// VERIFY OTP
exports.verifyOtp = async (req, res) => {

  try {

    const {
      email,
      otp,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",
      });
    }

    if (user.otp !== otp) {

      return res.status(400).json({

        success: false,

        message: "Invalid OTP",
      });
    }

    user.isVerified = true;

    user.otp = "";

    await user.save();

    res.status(200).json({

      success: true,

      message: "OTP Verified",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "OTP Verification Failed",
    });
  }
};


// LOGIN
exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "User not found",
      });
    }

    // verify otp check
    if (!user.isVerified) {

      return res.status(400).json({

        success: false,

        message:
          "Please verify OTP first",
      });
    }

    // compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Credentials",
      });
    }

    // jwt token
    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Login Failed",
    });
  }
};