/**
 * OTP Email Template
 * @param {string} otp - The 6-digit OTP code 
 * @param {string} type - The type of request (Verification/Password Reset)
 */
const getOTPTemplate = (otp, type = "Verification") => {
  const title = type === "Verification" ? "Verify Your Account" : "Reset Your Password";
  const message = type === "Verification" 
    ? "Welcome to Qrave! Please use the following code to complete your registration." 
    : "We received a request to reset your password. Use the code below to proceed.";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Qrave OTP</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #000000;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #ffffff;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          text-align: center;
        }
        .logo {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #FFD700;
          margin-bottom: 30px;
          text-transform: uppercase;
        }
        .card {
          background: #111111;
          border: 1px solid #222222;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #ffffff;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #aaaaaa;
          margin-bottom: 30px;
        }
        .otp-container {
          background: #1a1a00;
          border: 2px dashed #FFD700;
          padding: 20px;
          border-radius: 8px;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: 12px;
          color: #FFD700;
          margin: 0;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #555555;
        }
        .expiry {
          color: #888888;
          font-size: 14px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">QRAVE</div>
        <div class="card">
          <h1>${title}</h1>
          <p>${message}</p>
          <div class="otp-container">
            <h2 class="otp-code">${otp}</h2>
          </div>
          <p class="expiry">This code will expire in 10 minutes.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Qrave. All rights reserved.<br>
          If you didn't request this code, please ignore this email.
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getOTPTemplate };
