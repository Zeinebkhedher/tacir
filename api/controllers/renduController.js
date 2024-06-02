const Rendu = require("../models/renduModel");

// Controller function to add a new rendu (submission)
const addRendu = async (req, res) => {
  try {
    const { titre, description, expirationDate } = req.body;

    const newRendu = new Rendu({
      titre,
      description,
      expirationDate,
    });

    const createdRendu = await newRendu.save();

    res.status(201).json(createdRendu);
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
        path: req.file.path,
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

module.exports = {
  addRendu,
  deleteRendu,
  updateExpirationDate,
  uploadFile,
  getAllRendus,
};
