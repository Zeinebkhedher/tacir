const Joi = require("joi");
const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");
const Projet = require("../models/projetTacirModel");
const Candidats = require("../models/candidatModel");
const path = require("path");


const addAuditionInfo = async (req, res) => {
    try {
      const {
        projetId,
        candidatId,
        extraitChante,
        decision,
        remarque,
      } = req.body;
  
      const { error } = Joi.object({
        projetId: Joi.string().required(),
        candidatId: Joi.string().required(),
        extraitChante: Joi.string().required(),
        decision: Joi.string(),
        remarque: Joi.string(),
      }).validate(
        {
        projetId,
          candidatId,
          extraitChante,
          decision,
          remarque,
        },
        { abortEarly: false }
      );
  
      if (error) {
        return res.status(400).json({
          success: false,
          msg: `Validation error: ${error.details
            .map((detail) => detail.message)
            .join(", ")}`,
        });
      }
  
      const projet = await Projet.findById(projetId);
  
      if (!projet) {
        return res
          .status(404)
          .json({ success: false, msg: "projet not found." });
      }
  
      if (!projet.candidats.includes(candidatId)) {
        return res.status(400).json({
          success: false,
          msg: "Candidate not associated with this audition.",
        });
      }
  
      projet.candidatsInfo = projet.candidatsInfo || [];
  
      const projetInfoIndex = projet.candidatsInfo.findIndex(
        (info) => info && info.candidat && info.candidat.toString() === candidatId
      );
  
      if (projetInfoIndex !== -1) {
        projet.candidatsInfo[candidatInfoIndex] = {
          extraitChante,
          decision,
          remarque,
        };
      } else {
        projet.candidatsInfo.push({
          extraitChante,
          decision,
          remarque,
        });
      }
  
      await projet.save();
  
      res
        .status(200)
        .json({ success: true, msg: "projet information added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: error.message });
    }
  };

  module.exports = { addAuditionInfo};
