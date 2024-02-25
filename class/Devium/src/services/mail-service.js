const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth:{user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,}
    
},
  
);

const sendMail = async ({ to, subject, html }) => {
  return transport.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: subject,
    html,
  });
};

module.exports = {
    sendMail,
}