const nodemailer = require('nodemailer')

// Load Email Template
const fs = require('fs').promises;
const handlebars = require('handlebars');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xhantisingatha@gmail.com',
    pass: 'fttn qwrm knbn ubtj',
  },
});

// redis.on('message', (channel, message) => {
//   console.log(message, "from subscriber");
//   // Parse the message into an object
//   const emailData = JSON.parse(message);
//   console.log(emailData, "parse json");
//   // Send the email
//   if (emailData.event_type === "welcome"){
//     sendEmail(emailData, "welcome-template");
//   } else if (emailData.event_type === "forgot_password"){
//     sendEmail(emailData, "forgot-password");  
//   }
  
// });

async function loadEmailTemplate(templateName, data) {
    const templateContent = await fs.readFile(templateName, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);
    return compiledTemplate(data);
}

// Send Email
async function sendEmail(emailData, templateName) {
  // Load the email template
  const template = await loadEmailTemplate(`./email-templates/${templateName}.hbs`, emailData);

  // Send the email
  await transporter.sendMail({
    from: 'xhantisingatha@gmail.com',
    to: 'xhantisingatha@gmail.com',
    subject: 'Email Sent via Pub/Sub',
    html: template,
  });

  console.log(`Email sent to ${emailData.to}`);
}

module.exports = { sendEmail }

// TODO: Add Email Templates
// Possible Emails Templates
    // Welcome email (triggered when user registers)
    // Password email (triggered when user resets password)
    // Hired bounty email (triggered whe a bounty hunter has been assigned the bounty)
    // Bounty completed email (triggered when bounty jod is completed)
    // Bounty Paid email (triggered when a bounty is paid)
