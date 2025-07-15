const axios = require('axios');

const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';
const LOG_URL = 'http://20.244.56.144/evaluation-service/logs';

// Replace these with your actual registration details
const registrationData = {
  email: "manishtiwarimdtrock@gmail.com",
  name: "Manish Tiwari",
  rollNo: "2294042",
  accessCode: "QAhDUr",
  clientID: "33132626-6dc5-437e-b341-8fb6a5591549",
  clientSecret: "amdHjzNkrkWQunDm"
};

let accessToken = null;
let tokenExpiry = null;

async function authenticate() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }
  try {
    const response = await axios.post(AUTH_URL, registrationData);
    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000; // Renew 1 min before expiry
    return accessToken;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

/**
 * Reusable log function to send logs to the test server.
 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - log level (error, fatal, info, etc.)
 * @param {string} packageName - package or module name
 * @param {string} message - descriptive log message
 */
async function log(stack, level, packageName, message) {
  try {
    const token = await authenticate();
    const logPayload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: packageName.toLowerCase(),
      message
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post(LOG_URL, logPayload, config);
    console.log(`Log sent successfully: ${response.data.message}`);
  } catch (error) {
    console.error('Failed to send log:', error.message);
  }
}

module.exports = {
  log
};
