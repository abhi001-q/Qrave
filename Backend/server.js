require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Qrave server running on port ${PORT} (bound to 0.0.0.0)`);
  if (process.env.RENDER) {
    console.log("Detecting Render environment...");
  }
});

// Force keep-alive to debug why it's exiting cleanly
setInterval(() => {}, 3600000);
