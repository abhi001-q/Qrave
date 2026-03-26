const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '',
  },
  debug: true,
  logger: true
});

// Verify connection configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Verification Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});

async function sendEmail({ to, subject, text, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("CRITICAL ERROR: EMAIL_USER or EMAIL_PASS environment variables are missing!");
    throw new Error("Email service is not configured on the server.");
  }

  // Debug log (can be seen in Render Logs)
  console.log(`Email Service: Attempting to send from ${process.env.EMAIL_USER} to ${to}...`);

  const mailOptions = {
    from: `"Qrave Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    console.log(`Attempting to send email to: ${to}...`);
    
    // Create a timeout promise (8 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timed out after 8 seconds')), 8000);
    });

    // Race the sendMail against the timeout
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      timeoutPromise
    ]);

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("SMTP Error Details:");
    console.error("- Message:", error.message);
    console.error("- Code:", error.code);
    throw error;
  }
}

module.exports = sendEmail;
