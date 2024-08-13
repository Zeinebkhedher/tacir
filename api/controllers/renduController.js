const Rendu = require("../models/renduModel");
const Membres = require("../models/membreTacirModel");
const nodemailer = require("nodemailer");
const addRendu = async (req, res) => {
  try {
    const { titre, description, expirationDate, region,commentaire, destinataires } =
      req.body;

    // Find member IDs based on the emails provided in destinataires
    const members = await Membres.find({
      email: { $in: destinataires },
      role: "PorteurProjet",
    }).select("_id email");

    if (members.length === 0) {
      return res.status(400).json({
        message: "No PorteurProjet members with the provided emails found",
      });
    }

    // Create a new Rendu instance with the found member IDs
    const newRendu = new Rendu({
      titre,
      description,
      expirationDate,
      commentaire,
      region,
      destinataires: members.map((member) => member._id),
    });

    const createdRendu = await newRendu.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zeinebkheder8@gmail.com",
        pass: "nrrp wryu mrhm lmdy",
      },
    });

    // Send email to each valid destinataire
    const mailOptions = {
      from: "your-email@gmail.com",
      to: members.map((m) => m.email),
      subject: "nouveau Rendu",
      text: `nouveau travail à faire est déposé\n\nTitle: ${titre}\nDescription: ${description}\nExpiration Date: ${expirationDate}\nCommentaire: ${commentaire}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json(createdRendu); // Return the created rendu in the response
  } catch (error) {
    console.error("Error adding rendu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Controller function to delete a rendu by ID
const deleteRendu = async (req, res) => {
  try {
    const { renduId } = req.params;

    const deletedRendu = await Rendu.findByIdAndDelete(renduId);

    if (!deletedRendu) {
      return res.status(404).json({ message: "Rendu not found" });
    }

    res.status(200).json({ message: "Rendu deleted successfully" });
  } catch (error) {
    console.error("Error deleting rendu:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update the expiration date of a rendu
const updateExpirationDate = async (req, res) => {
  try {
    const { renduId } = req.params;
    const { expirationDate } = req.body;

    const updatedRendu = await Rendu.findByIdAndUpdate(
      renduId,
      { expirationDate },
      { new: true }
    );

    if (!updatedRendu) {
      return res.status(404).json({ message: "Rendu not found" });
    }

    res.status(200).json(updatedRendu);
  } catch (error) {
    console.error("Error updating expiration date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath); // Corrected path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage: storage }).single("program");

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ message: "Error uploading file", error: err.message });
    }

    try {
      const { renduId } = req.params;
      const file = {
        filename: req.file.filename,
        path: req.file.filename, // Save only the filename
      };

      const rendu = await Rendu.findById(renduId);
      if (!rendu) {
        return res.status(404).json({ message: "Rendu not found" });
      }

      rendu.files.push(file);
      await rendu.save();

      res.status(200).json(rendu);
    } catch (error) {
      console.error("Error in uploadFile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

const getAllRendus = async (req, res) => {
  try {
    const rendus = await Rendu.find();
    res.status(200).json(rendus);
  } catch (error) {
    console.error("Error fetching rendus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const fs = require("fs");

const downloadFile = (req, res) => {
  try {
    const { filePath } = req.params;
    const decodedFilePath = decodeURIComponent(filePath);
    const fullFilePath = path.join(__dirname, "../uploads", decodedFilePath);

    if (fs.existsSync(fullFilePath)) {
      res.download(fullFilePath, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).json({ message: "Error downloading file" });
        }
      });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error in downloadFile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Example for a new API endpoint to get rendus for a specific recipient
const getRendusForUser = async (req, res) => {
  try {
    const userId = req.auth.membreId; // Use req.auth
    const rendus = await Rendu.find({ destinataires: userId });
    res.status(200).json(rendus);
  } catch (error) {
    console.error("Error fetching rendus for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getRendusByRegion = async (req, res) => {
  try {
    const { region } = req.query; // Extract region from query parameters

    if (!region) {
      return res
        .status(400)
        .json({ message: "Region query parameter is required" });
    }

    // Find rendus filtered by region
    const rendus = await Rendu.find({ region });

    if (rendus.length === 0) {
      return res
        .status(404)
        .json({ message: "No rendus found for this region" });
    }

    res.status(200).json({ status: "success", data: rendus });
  } catch (error) {
    console.error("Error fetching rendus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addRendu,
  deleteRendu,
  updateExpirationDate,
  uploadFile,
  getAllRendus,
  downloadFile,
  getRendusForUser,
  getRendusByRegion,
};
