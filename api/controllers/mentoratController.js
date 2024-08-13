const nodemailer = require("nodemailer");
const Mentorat = require("../models/mentoratModel");
const Membres = require("../models/membreTacirModel");
const Output = require("../models/outputMentoratModel");
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
    const { titre, dateDebut, dateFin, description, region } = req.body;

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
      region,
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

const getMentoratsByRegion = async (req, res) => {
  try {
    const { region } = req.query; // Extract region from query parameters

    if (!region) {
      return res
        .status(400)
        .json({ message: "Region query parameter is required" });
    }

    // Find mentorats filtered by region
    const mentorats = await Mentorat.find({ region });

    if (mentorats.length === 0) {
      return res
        .status(404)
        .json({ message: "No mentorats found for this region" });
    }

    res.status(200).json({ status: "success", data: mentorats });
  } catch (error) {
    console.error("Error fetching mentorats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllMentorats = async (req, res) => {
  try {
    const mentorats = await Mentorat.find();
    res.status(200).json({ status: 'success', data: mentorats });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Assurez-vous que l'objet que vous essayez d'accéder est bien défini avant d'accéder à ses propriétés.
const getMentoratsForUser = async (req, res) => {
  try {
    console.log('user data', req.auth);  // Déboguer avec req.auth

    const userId = req.auth ? req.auth.membreId : null;
    console.log('id', userId);

    if (!userId) {
      return res.status(400).json({ message: "L'ID utilisateur est manquant." });
    }

    const mentorats = await Mentorat.find({ destinataires: userId });
    console.log("Mentorat data:", mentorats); // Ajoutez ce log pour vérifier les données

    res.json({ data: mentorats });
  } catch (error) {
    console.error("Erreur lors de la récupération des mentorats:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des mentorats." });
  }
};

const getMentoratById = async (req, res) => {
  try {
    const mentorat = await Mentorat.findById(req.params.mentoratId);
    if (!mentorat) return res.status(404).send('Mentorat non trouvé');
    res.json(mentorat);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};
const getMentoratWithOutputs = async (req, res) => {
  try {
    const { mentoratId } = req.params;
    console.log("mentoratId",mentoratId);
    const mentorat = await Mentorat.findById(mentoratId);
    console.log("mentorat",mentorat);
        if (!mentorat) {
      return res.status(404).json({ message: 'Creathon not found' });
    }

    const outputs = await Output.find({ mentoratId: mentoratId }).populate('porteurId', 'nom email'); // Assurez-vous que `porteurId` est une référence au modèle `MembreTacir`
console.log("outputs",outputs);

    res.status(200).json({ mentorat, outputs });
  } catch (error) {
    console.error("Error fetching creathon with outputs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createMentorat,
  sendMentoratEmails,
  getMentoratsByRegion,
  getAllMentorats,
  getMentoratsForUser,
  getMentoratById,
  getMentoratWithOutputs
};
