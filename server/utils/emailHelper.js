const nodemailer = require("nodemailer");

const mailHelper = async (option) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
        }
    });
    const message = {
        from: "abhi234@gmail.com",
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    await transport.sendMail(message)
}

module.exports = mailHelper;