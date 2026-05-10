const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {

  try {

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "CC96 OTP Verification",

      html: `
        <div style="font-family:sans-serif;">
          <h2>CC96 Verification OTP</h2>
          <h1>${otp}</h1>
          <p>Do not share this OTP.</p>
        </div>
      `,
    });

    console.log("OTP Sent");

  } catch (error) {

    console.log(error);
  }
};

module.exports = sendOtp;