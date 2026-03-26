const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    // Automatically strip spaces from App Passwords if present
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '',
  },
  connectionTimeout: 10000, // 10 seconds timeout
});

async function sendEmail({ to, subject, text, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("CRITICAL ERROR: EMAIL_USER or EMAIL_PASS environment variables are missing!");
    throw new Error("Email service is not configured on the server.");
  }

  const mailOptions = {
    from: `"Qrave Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    console.log(`Attempting to send email to: ${to}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Sending Failed:", error);
    throw error;
  }
}

module.exports = sendEmail;
