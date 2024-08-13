const Formation = require("../models/formationModel"); // Assuming your model file is in the same directory
const nodemailer = require("nodemailer");
const PorteurProjet = require("../models/membreTacirModel"); // Assuming you have a model for Porteur Projet
const Membre = require('../models/membreTacirModel'); // Assuming you renamed the model
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const generatePassword = require("generate-password");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zeinebkheder8@gmail.com",
		pass: "nrrp wryu mrhm lmdy",
  },
});

const generateRandomPassword = () => {
  return generatePassword.generate({
    length: 12,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
  });
};

exports.getAcceptedFormations = async (req, res) => {
  try {
    // Obtenez le token du header Authorization
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    // Décodez le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const participantId = decodedToken.membreId;

    console.log('Participant ID:', participantId); // Log du participant ID

    // Recherchez les formations acceptées
    const acceptedFormations = await Formation.find({
      'participants': { $elemMatch: { participant: participantId, status: 'accepté' } },
    });

    console.log('Formations acceptées:', acceptedFormations); // Log des formations acceptées

    res.status(200).json(acceptedFormations);
  } catch (error) {
    console.error('Error fetching accepted formations:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des formations acceptées', error: error.message });
  }
};

exports.acceptBeneficiary = async (req, res) => {
  try {
    const { beneficiaryId, formationId } = req.params;
    const { nom, prenom, email } = req.body;

    // Log input data
    console.log('Request body:', req.body);
    console.log('Request params:', req.params);

    // Validate input
    if (!nom || !prenom || !email) {
      return res.status(400).json({ message: "Nom, prénom, et email sont requis" });
    }

    // Generate password and hash it
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create and save new member
    const newMember = new Membre({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hashedPassword,
      sexe: null,
      dateNaissance: null,
      nationalite: null,
      CIN: null,
      taille: null,
      situationPerso: null,
      connaissanceMusic: null,
      activite: null,
      telephone: null,
      role: "beneficiaireFormation",
      statut: null,
      pupitre: null
    });

    const savedMember = await newMember.save();

    // Log saved member details
    console.log('Saved member:', savedMember);

    // Send email to new member
    const emailBody = `
      Bonjour ${savedMember.prenom} ${savedMember.nom},<br>
      Félicitations ! Votre demande de participation a été acceptée.<br>
      Voici vos informations de connexion :<br>
      Email : ${savedMember.email}<br>
      Mot de passe : ${randomPassword}<br>
      Cordialement,<br>
      L'équipe de formation
    `;
    await sendEmail(savedMember.email, "Informations d'inscription", emailBody);

    // Log formation before update
    const formationBeforeUpdate = await Formation.findById(formationId);
    console.log('Formation before update:', formationBeforeUpdate);

    // Update beneficiary status
    const result = await Formation.findByIdAndUpdate(
      formationId,
      { $set: { "beneficiaire.$[elem].status": "accepted" } },
      { arrayFilters: [{ "elem._id": beneficiaryId }], new: true }
    );

    // Log result after update
    console.log('Result after update:', result);

    if (!result) {
      return res.status(404).json({ message: "Formation or beneficiary not found" });
    }

    res.status(200).json({
      message: "Beneficiary accepted and email sent",
      member: savedMember
    });
  } catch (error) {
    console.error("Error accepting beneficiary:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.refuseBeneficiary = async (req, res) => {
  const { formationId, beneficiaryId } = req.params;

  try {
    const formation = await Formation.findOne({ _id: formationId, 'beneficiaire._id': beneficiaryId });

    if (!formation) {
      return res.status(404).send('Formation or beneficiary not found');
    }

    const beneficiary = formation.beneficiaire.id(beneficiaryId);
    if (!beneficiary) {
      return res.status(404).send('Beneficiary not found');
    }

    beneficiary.status = 'rejected';
    await formation.save();

    // Send refusal email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: beneficiary.email,
      subject: 'Votre demande de formation est refusée',
      text: `
        Cher(e) ${beneficiary.prenom} ${beneficiary.nom},

        Nous regrettons de vous informer que votre demande de participation à la formation a été refusée.

        Nous vous souhaitons une bonne continuation.

        Cordialement,
        L'équipe de formation
      `,
    });

    res.send('Beneficiary refused and email sent');
  } catch (error) {
    console.error('Error refusing beneficiary:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.sendAcceptanceEmail = async (participant, formation) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: participant.email,
    subject: `Votre demande de formation est acceptée!`, // Subject line
    text: `
      Cher(e) ${participant.prenom} ${participant.nom},

      Nous avons le plaisir de vous informer que votre demande de participation à la formation suivante a été acceptée :

      Formation: ${formation.Name}
      Date de début: ${formation.Date}

      Veuillez vérifier votre calendrier pour plus de détails.

      Cordialement,
      L'équipe de formation
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Acceptance email sent successfully");
  } catch (error) {
    console.error("Error sending acceptance email:", error);
  }
};

exports.acceptParticipant = async (req, res) => {
  const { formationId } = req.params;
  const { participantId } = req.body;

  try {
    const formation = await Formation.findById(formationId);
    if (!formation) {
      return res.status(404).send('Formation not found');
    }

    const participant = formation.participants.id(participantId);
    if (!participant) {
      return res.status(404).send('Participant not found');
    }

    participant.accepted = true;
    await formation.save();

    // Send email to participant
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: participant.email,
      subject: `Votre demande de formation est acceptée!`, // Subject line
      text: `
        Cher(e) ${participant.prenom} ${participant.nom},
  
        Nous avons le plaisir de vous informer que votre demande de participation à la formation suivante a été acceptée :
  
        Formation: ${formation.Name}
        Date de début: ${formation.Date}
  
        Veuillez vérifier votre calendrier pour plus de détails.
  
        Cordialement,
        L'équipe de formation TACIR
      `,   };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent:', info.response);
    });

    res.status(200).send('Participant accepted');
  } catch (error) {
    console.error('Error accepting participant:', error);
    res.status(500).send('Server error');
  }
};

exports.refusParticipant = async (req, res) => {
  const { formationId } = req.params;
  const { participantId } = req.body;

  try {
    const formation = await Formation.findById(formationId);
    if (!formation) {
      return res.status(404).send('Formation not found');
    }

    const participant = formation.participants.id(participantId);
    if (!participant) {
      return res.status(404).send('Participant not found');
    }

    participant.status = 'refused';
    await formation.save();

    // Send email to participant
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: participant.email,
      subject: 'Votre demande de formation est refusée',
      text: `
        Cher(e) ${participant.prenom} ${participant.nom},

        Nous vous remercions pour votre intérêt pour notre formation.

        Nous regrettons de vous informer que nous ne pouvons pas accepter votre demande pour cette session. Nous comprenons que cette nouvelle puisse être décevante et vous encourageons à postuler à de futures sessions qui pourraient mieux correspondre à vos disponibilités et intérêts.

        Merci de votre compréhension et nous espérons avoir l'occasion de vous accueillir lors d'une prochaine formation.

        Cordialement,
        L'équipe de formation TACIR
      `  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent:', info.response);
    });

    res.status(200).send('Participant refused');
  } catch (error) {
    console.error('Error refusing participant:', error);
    res.status(500).send('Server error');
  }
};

exports.createFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json({ status: "success", data: formation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.refuseParticipant = async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const participant = await Participant.findById(participantId);

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // Update the participant's status to refused
    participant.status = 'refused';
    await participant.save();

    // Fetch the related formation details
    const formation = await Formation.findById(participant.formationId);

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    // Send the refusal email
    await sendRefusalEmail(participant, formation);

    res.status(200).json({ message: "Participant refused and notified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const sendAcceptanceEmail = async (participant, formation) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: participant.email,
    subject: `Your application for ${formation.Name} has been accepted`,
    text: `Dear ${participant.prenom} ${participant.nom},

Congratulations! Your application for the formation "${formation.Name}" has been accepted.

Formation Start Date: ${formation.Date}

Please check your calendar for more details.

Best regards,
Your Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Acceptance email sent successfully");
  } catch (error) {
    console.error("Error sending acceptance email:", error);
  }
};

exports.sendRefusalEmail = async (participant, formation) => {
  const mailOptions = {
    from: 'zeinebkheder8@gmail.com',
    to: participant.email,
    subject: `Your application for ${formation.Name} has been refused`,
    text: `Dear ${participant.prenom} ${participant.nom},

We regret to inform you that your application for the formation "${formation.Name}" has been refused.

Thank you for your interest.

Best regards,
Your Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Refusal email sent successfully");
  } catch (error) {
    console.error("Error sending refusal email:", error);
  }
};


exports.addParticipantToFormation = async (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  try {
    // Find the formation by its ID
    const formation = await Formation.findById(id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Add the participant as an object to the participants array
    formation.participants.push({ Name: fullName, email });

    // Save the updated formation document
    await formation.save();

    res.status(200).json({ status: "success", data: formation });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to add participant to the formation",
    });
  }
};

exports.addBeneficiaire = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, numTel, motivation, adressePostale } = req.body;

  try {
    // Validate request body
    if (
      !nom ||
      !prenom ||
      !email ||
      !numTel ||
      !motivation ||
      !adressePostale
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // Find the formation by its ID
    const formation = await Formation.findById(id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Check if email already exists in beneficiaire array
    const beneficiaireExists = formation.beneficiaire.some(
      (b) => b.email === email
    );
    if (beneficiaireExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists in beneficiaire",
      });
    }

    // Add the beneficiaire to the beneficiaire array
    formation.beneficiaire.push({
      nom,
      prenom,
      email,
      numTel,
      motivation,
      adressePostale,
    });

    // Save the updated formation document
    const updatedFormation = await formation.save();

    res.status(200).json({ status: "success", data: updatedFormation });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === "ValidationError") {
      res.status(400).json({
        status: "error",
        message: "Validation error: " + error.message,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      res.status(400).json({
        status: "error",
        message: "Duplicate field error: " + JSON.stringify(error.keyValue),
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to add beneficiaire to the formation",
      });
    }
  }
};
exports.getBeneficiairesByFormation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find formation by ID and populate the beneficiaries
    const formation = await Formation.findById(id).select("beneficiaire");

    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Send beneficiaries data
    res.status(200).json({ status: "success", data: formation.beneficiaire });
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch beneficiaries" });
  }
};
// Get all formations
exports.getAllFormations = async (req, res) => {
  try {
    const { region } = req.query; // Extract region from query parameters

    // Construct filter object
    let filter = {};
    if (region) {
      filter.region = region; // Filter by region if provided
    }

    // Fetch formations from the database based on the filter
    let formations = await Formation.find(filter);

    // Check the date of each formation and update the status
    formations.forEach(async (formation) => {
      if (new Date(formation.Date) < new Date()) {
        formation.status = "Past";
        await formation.save(); // Save the updated formation to the database
      }
    });

    // Re-fetch formations to include the updated ones
    formations = await Formation.find(filter);
    res.status(200).json({ status: "success", data: formations });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// Get a single formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }
    res.status(200).json({ status: "success", data: formation });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update a formation
exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }
    res.status(200).json({ status: "success", data: formation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete a formation
exports.deleteFormation = async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getParticipantsByFormationId = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the formation by its ID
    const formation = await Formation.findById(id).populate("participants");

    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Return the participants of the formation
    res.status(200).json({ status: "success", data: formation.participants });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch participants for the formation",
    });
  }
};
exports.getFormationsWithAcceptedBeneficiaires = async (req, res) => {
  try {
    const formations = await Formation.find({
      'beneficiaire.status': 'accepted'
    });
    res.status(200).json({ status: 'success', data: formations });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch formations with accepted beneficiaries' });
  }
};

exports.getParticipantsAndBeneficiariesByFormationId = async (req, res) => {
  const { id } = req.params;

  try {
    const formation = await Formation.findById(id);

    if (!formation) {
      return res.status(404).json({ status: 'fail', message: 'Formation not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        participants: formation.participants,
        beneficiaires: formation.beneficiaire,
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch participants and beneficiaries',
    });
  }
};

exports.updateBeneficiaireStatus = async (req, res) => {
  const { formationId, beneficiaireId } = req.params;
  const { status } = req.body;

  try {
    const formation = await Formation.findById(formationId);
    if (!formation) {
      return res.status(404).json({ status: "fail", message: "Formation not found" });
    }

    const beneficiaire = formation.beneficiaire.id(beneficiaireId);
    if (!beneficiaire) {
      return res.status(404).json({ status: "fail", message: "Beneficiaire not found" });
    }

    beneficiaire.status = status;
    await formation.save();

    res.status(200).json({ status: "success", data: beneficiaire });
  } catch (error) {
    console.error("Error updating beneficiaire status:", error);
    res.status(500).json({ status: "error", message: "Failed to update beneficiaire status" });
  }
};