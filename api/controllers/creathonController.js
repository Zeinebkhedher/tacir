const express = require("express");
const router = express.Router();
const Creathon = require("../models/creathonModel");
const Membre = require("../models/membreTacirModel");
const Saison=require("../models/saisonModel")
const addQrCodeToRepetition = require("../middlewares/createQrCodeMiddleware");
const {sendNotificationMiddleware} = require("../middlewares/sendNotificationMiddleware")
const { userSocketMap } = require("../utils/socket");

const genererListeMembres=async(pupitre,pourcentage)=>{
  const membresPupitre=await Membre.find({pupitre,role:{$in:['choriste']},statut:{$ne:'En congé'}})
  if (pourcentage > 0 && pourcentage <= 100 && membresPupitre.length > 0) {
  const nombreMembres=Math.ceil((pourcentage/100)*membresPupitre.length)
  const listeAleatoire=[]
  while(listeAleatoire.length<nombreMembres){
    const randomMembre=membresPupitre[Math.floor(Math.random()*membresPupitre.length)]
    if(!listeAleatoire.some((m)=>m.member.equals(randomMembre._id))){
      listeAleatoire.push({member:randomMembre._id})
    }
  }
  return listeAleatoire
}
else{
  return []
}
}
const createCreathon = async (req, res) => {
  try {
    
    const {titre,date,lieu,affiche}=req.body

   

    const creathon=new Creathon({
     titre,
      date,
      lieu,
      affiche
    })
    
    
    const nouveauCreathon= creathon;

    const currentSaison = await Saison.findOne({ saisonCourante: true });
    if (currentSaison) {
      currentSaison.creathons.push(nouvelleRepition);
      await currentSaison.save();
    }
    await creathon.save()

    req.creathonId = creathon._id;
    //await addQrCodeToRepetition.addQrCodeToRepetition(req, res, () => {});
  }catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const deleteRepetition=async(req,res)=>{
  try{
    const repetition=await Repetition.findByIdAndDelete({_id:req.params.id})
    if(repetition){
      return res.status(200).json({message:"Répétition annulée avec succées"})
    }
    else{
      return res.status(200).json({message:"Répétition n'existe pas"})
    }

  }
  catch(error){
    res.status(400).json({error:error.message})
  }
};
const getRepetitionById=async(req,res)=>{
  try{
    const repetition=await Repetition.findOne({_id:req.params.id}).populate({path:"concert",select:"titre"}).populate({path:"membres.member",select:"nom prenom email pupitre role"}).exec()
    if(repetition){

      
      
      repetition.membres.forEach((membre)=>{

        if(membre.member.pupitre==="soprano"){
          choristes["soprano"].push(membre.member)
        }
        else if(membre.member.pupitre==="ténor"){
          choristes["ténor"].push(membre.member)
        }
        else if(membre.member.pupitre==="alto"){
          choristes["alto"].push(membre.member)
        }
        else{
          choristes["basse"].push(membre.member)
        }
      })
      res.status(200).json({
        message:"Répétition trouvée",
        _id:repetition._id,
        concert:repetition.concert,
        lieu:repetition.lieu,
        DateRep:repetition.DateRep,
        HeureDeb:repetition.HeureDeb,
        HeureFin:repetition.HeureFin,
        QrCode:repetition.QrCode,
        membres:choristes,
      })
    }
    else{
      res.status(404).json({message:"Répétition non trouvée"})
    }
    
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
}
const getAllCreathons = async (req, res) => {
    try {
      const creathons = await Creathon.find().exec();
  
      if (!creathons || !Array.isArray(creathons)) {
        throw new Error("Aucun Creathon trouvé");
      }
  
      const formattedCreathons = creathons.map((creathon) => ({
        _id: creathon._id,
        titre: creathon.titre,
        date: creathon.date,
        lieu: creathon.lieu,
        affiche: creathon.affiche,
      }));
  
      res.status(200).json({
        message: "Données extraites avec succès",
        creathons: formattedCreathons,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const updateRepetition=async(req,res)=>{
  try{
    const repetition=await Repetition.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    if(!repetition){
      return res.status(404).json({message:"Répétition non trouvée"})
    }
    else{
      res.status(200).json({
        message:"Répétition modifiée avec succés",
        model:repetition,
        
      })
     
    }
    try {
      const memberIds = repetition.membres.map((member) => member.member);
  
      const members = await Membre.find({ _id: { $in: memberIds } });
      console.log(members)
      members.forEach(async (member) => {
        const memberSocketId = userSocketMap[member._id];

        if (memberSocketId) {
          req.notificationData = {
            userId: member._id,
            notificationMessage: `The repetition on ${repetition.DateRep.toLocaleDateString()} has been updated. It will start at ${repetition.HeureDeb.toLocaleTimeString()} and end at ${repetition.HeureFin.toLocaleTimeString()} at ${repetition.lieu}`
          };
          console.log(req.notificationData)
          await sendNotificationMiddleware(req, res, () => {});
        }
      });
    } catch (error) {
      console.error("Error sending notifications to members:", error);
    }
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
}

const listPresenceByPupitre = async (req, res) => {
  try {
    const { repetitionId } = req.params;
    const { pupitre } = req.query;

    const repetition = await Repetition.findById(repetitionId).populate('membres.member');

    const membresPupitre = repetition.membres.filter((membre) => membre.member.role === 'choriste' && membre.member.pupitre === pupitre);

  
    const presenceList = membresPupitre.map((membre) => {
      return {
        nom: membre.member.nom,
        prenom: membre.member.prenom,
      };
    });

    res.json({ presenceList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error });
  }
};

module.exports = {createCreathon,listPresenceByPupitre,deleteRepetition,getRepetitionById,getAllCreathons,updateRepetition};
