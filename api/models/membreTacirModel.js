const mongoose=require('mongoose')
const membreTacirSchema=mongoose.Schema(
    {
       nom:{type:String,required:true},
       prenom:{type:String,required:true},
       email:{type:String,required:true,unique:true},
       password:{type:String,required:true},
       sexe:{type:String,enum:["Homme","Femme"],required:true},
       dateNaissance:{type:String,required:true},
       nationalite:{type:String,required:true},
       CIN:{type:String,required:true},
       taille:{type:Number},
       situationPerso:{type:String,required:true},
       telephone:{type:String,required:true},
       titre: {
        type: String,
        required: true,
      },
      descriptif: {
        type: String,
        required: true,
      },
      ideeProjet: {
        type: String,
        required: true,
      },
      lien: {
        type: String,
        required: true,
      },
      porteur: {
        type: Boolean,
        required: true,
      },
      membres: {
        type: [String],
        required: true,
      },
      aventure: {
        type: Boolean,
        required: true,
      },
      motivation: {
        type: String,
        required: true,
      },

       
    }  

)
module.exports=mongoose.model("Membre",membreTacirSchema)