const Membres = require("../models/membreTacirModel");

// Controller function to get contacts by role
exports.getContactsByRole = async (req, res) => {
  const { role } = req.params;
  try {
    const contacts = await Membres.find({ role });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const nodemailer = require("nodemailer");

// Controller function to send messages to selected email addresses
exports.sendMessage = async (req, res) => {
  console.log("req.user:", req.user); // Log req.user to console

  const { emails, message } = req.body;

  // Check if emails and message are provided
  if (!emails || !message) {
    return res.status(400).json({ message: "Emails and message are required" });
  }

  // Ensure that req.user is defined and contains the user's information
  if (!req.auth || !req.auth.email) {
    return res.status(400).json({ message: "User information not available" });
  }

  const senderEmail = req.auth.email;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    // Your email SMTP configuration
    // Example using Gmail:
    service: "gmail",
    auth: {
      user: "zeinebkheder8@gmail.com",
      pass: "nrrp wryu mrhm lmdy",
    },
  });

  // Define email options
  let mailOptions = {
    from: senderEmail, // Sender address
    to: emails.join(", "), // Recipient list (comma-separated string)
    subject: "Message from Your Application", // Subject line
    text: `From: ${senderEmail}\n\n${message}`, // Plain text body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};
