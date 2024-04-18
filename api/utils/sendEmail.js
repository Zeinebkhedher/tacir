const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (email, subject, text,attachments=[]) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
			  user: "zeinebkheder8@gmail.com",
			  pass: "nrrp wryu mrhm lmdy",
			},
		  });
		  const mailOptions={
			from: "your-email@example.com",
			to: email,
			subject: subject,
			html: text,

		  }
		if(attachments && attachments.length>0){
			mailOptions.attachments=attachments
		}
		await transporter.sendMail(mailOptions)
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};