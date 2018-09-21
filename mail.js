// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.Client("6e1273da-19c3-44ca-9eaf-623e1b4d34f5");

client.sendEmail({
  "From": "adam@mindfitnessmethod.com",
  "To": "adam@mindfitnessmethod.com",
  "Subject": "Test",
  "TextBody": "Hello from Postmark!"
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
