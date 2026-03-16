const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Qrave SMTP Test",
      text: "If you see this, your email configuration is working!",
    });
    console.log("Email sent successfully:", info.messageId);
    process.exit(0);
  } catch (err) {
    console.error("Email test failed:", err);
    process.exit(1);
  }
}

testEmail();
