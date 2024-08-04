const nodemailer = require("nodemailer");
const Mentorat = require("../models/mentoratModel");
const Membres = require("../models/membreTacirModel");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zeinebkheder8@gmail.com",
    pass: "nrrp wryu mrhm lmdy",
  },
});

// Function to send emails
const sendMentoratEmails = async (mentorat, destinataires, mentors) => {
  // Combine destinataires and mentors email addresses
  const allRecipients = [...destinataires, ...mentors];

  if (allRecipients.length === 0) {
    console.error("No recipients provided");
    return; // Exit early if there are no recipients
  }

  const mailOptions = {
    from: "zeinebkheder8@gmail.com", // Sender address
    to: allRecipients.join(","), // List of recipients
    subject: `Nouveau mentorat créé : ${mentorat.titre}`, // Subject line
    text: `Bonjour,

Session de mentorat:

Titre: ${mentorat.titre}
Date début: ${mentorat.dateDebut.toDateString()}
Date fin: ${mentorat.dateFin.toDateString()}
Description: ${mentorat.description}

Cordialement`,
  };

  try {
    console.log("Sending email with options:", mailOptions); // Debug log
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};


// Create Mentorat function
const createMentorat = async (req, res) => {
  try {
    const { titre, dateDebut, dateFin, description } = req.body;

    // Find member IDs based on the role "PorteurProjet"
    const destinataires = await Membres.find({ role: "PorteurProjet" }).select(
      "_id email"
    );

    if (destinataires.length === 0) {
      return res
        .status(400)
        .json({ message: "No members with the role 'PorteurProjet' found" });
    }

    // Find mentor IDs
    const mentors = await Membres.find({ role: "Mentor" }).select("email");

    // Create a new Mentorat instance with the found member IDs
    const newMentorat = new Mentorat({
      titre,
      dateDebut,
      dateFin,
      description,
      destinataires: destinataires.map((member) => member._id),
      mentors: mentors.map((mentor) => mentor._id),
    });

    // Save the mentorat to the database
    const createdMentorat = await newMentorat.save();

    // Send emails to both destinataires and mentors
    const destinataireEmails = destinataires.map((member) => member.email);
    const mentorEmails = mentors.map((mentor) => mentor.email);
    await sendMentoratEmails(createdMentorat, destinataireEmails, mentorEmails);

    res.status(201).json(createdMentorat); // Return the created mentorat in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllMentorats = async (req, res) => {
  try {
    // Fetch all mentorats from the database
    const mentorats = await Mentorat.find();

    res.status(200).json({ status: "success", data: mentorats });
  } catch (error) {
    console.error("Error fetching mentorats:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch mentorats" });
  }
};

module.exports = {
  createMentorat,
  sendMentoratEmails,
  getAllMentorats
};
