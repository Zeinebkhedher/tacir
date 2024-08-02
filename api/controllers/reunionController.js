const Reunion = require("../models/reunionModel");
const Membres = require("../models/membreTacirModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zeinebkheder8@gmail.com",
    pass: "nrrp wryu mrhm lmdy",
  },
});

const sendReunionEmails = async (reunion, destinataires) => {
  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: destinataires.join(","), // List of recipients
    subject: `Invitation: ${reunion.titre}`, // Subject line
    text: `Vous êtes invités à la réunion

Reunion: ${reunion.titre}
Date: ${reunion.date}
Heure debut: ${reunion.heureDebut}
Heure Fin: ${reunion.heureFin}
Lien: ${reunion.link}

Veuillez nous rejoindre à temps.

Cordialement,
TACIRCREA    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

const createReunion = async (req, res) => {
  try {
    const { titre, date, heureDebut, heureFin, link, destinataires } = req.body;

    // Find member IDs based on provided emails
    const members = await Membres.find({
      email: { $in: destinataires },
    }).select("_id email");

    if (members.length !== destinataires.length) {
      return res
        .status(400)
        .json({ message: "One or more email addresses are invalid" });
    }

    const newReunion = new Reunion({
      titre,
      date,
      heureDebut,
      heureFin,
      link,
      destinataires: members.map((member) => member._id),
    });

    const createdReunion = await newReunion.save();

    const memberEmails = members.map((member) => member.email);
    await sendReunionEmails(createdReunion, memberEmails);

    res.status(201).json(createdReunion); // Return the created reunion in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReunion,
  sendReunionEmails,
};
