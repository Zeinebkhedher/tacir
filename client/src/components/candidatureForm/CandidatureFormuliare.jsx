/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidWinkSmile } from "react-icons/bi";
import {
  FcAddressBook,
  FcBusinessContact,
  FcCalendar,
  FcCallback,
  FcConferenceCall,
  FcContacts,
  FcDisplay,
  FcDribbble,
  FcFlashOn,
  FcGenericSortingDesc,
  FcGlobe,
  FcIdea,
  FcLink,
  FcPrevious,
  FcRating,
} from "react-icons/fc";
import { GiPerson } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { Transition } from "react-transition-group";
import note from "../../assets/img/tacir_logo.jpg";
import confirm from "../../assets/img/valide.png";

const CandidatureFormulaire = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    CIN: "",
    telephone: "",
    sexe: "",
    nationalite: "",
    dateNaissance: "",
    situationPerso: "",
  });
  const [formData2, setFormData2] = useState({
    titre: "",
    descriptif: "",
    ideeProjet: "",
    lien: "",
    porteur: "",
    membres: "",
    aventure: "",
    motivation: "",
  });
  const [errors, setErrors] = useState({});
  const [showPart2, setShowPart2] = useState(false);
  const [success, setSuccess] = useState(false);
  //const [idFromToken, setIdFromToken] = useState("");
  const { id, token } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  /*useEffect(() => {
    //const params = new URLSearchParams(window.location.search);
    //const idFromUrl = params.get("id");
    //const tokenFromUrl = params.get("token");
  }, []);*/

  useEffect(() => {
    const fetchTokenId = async () => {
      try {
        console.log(token);
        console.log(id);
        const response = await axios.get(
          `http://localhost:8000/api/candidats/${id}/verify/${token}/`
        );
        console.log(response);
        console.log(response.data.id);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'ID à partir du token :",
          error
        );
      }
    };
    fetchTokenId();
  }, [id, token]);

  const handleSubmit = async (e) => {
    const combinedFormData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      CIN: formData.CIN,
      telephone: formData.telephone,
      sexe: formData.sexe,
      nationalite: formData.nationalite,
      dateNaissance: formData.dateNaissance,
      situationPerso: formData.situationPerso,
      titre: formData2.titre,
      descriptif: formData2.descriptif,
      ideeProjet: formData2.ideeProjet,
      lien: formData2.lien,
      porteur: formData2.porteur,
      membres: formData2.membres,
      aventure: formData2.aventure,
      motivation: formData2.motivation,
    };
    console.log(id);
    console.log(combinedFormData);
    e.preventDefault();
    validateForm2();
    try {
      console.log(combinedFormData);
      const response = await axios.post(
        `http://localhost:8000/api/candidats/formulaire/${id}`,
        combinedFormData
      );
      console.log(response);

      if (response.status === 201) {
        console.log("Formulaire soumis avec succès :", response.data);
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          CIN: "",
          telephone: "",
          sexe: "",
          nationalite: "",
          dateNaissance: "",
          situationPerso: "",
        });
        setFormData2({
          titre: "",
          descriptif: "",
          ideeProjet: "",
          lien: "",
          porteur: "",
          membres: "",
          aventure: "",
          motivation: "",
        });
        setSuccess(true);
      } else {
        console.log("Réponse inattendue du serveur :", response);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    let regexNom = /^[a-zA-Z ]+$/;
    let regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!formData.nom) {
      errors.nom = "Veuillez saisir votre nom.";
    } else if (!regexNom.test(formData.nom)) {
      errors.nom = "Nom invalide";
    }
    if (!formData.prenom) {
      errors.prenom = "Veuillez saisir votre prénom.";
    } else if (!regexNom.test(formData.prenom)) {
      errors.prenom = "Prénom invalide";
    }
    if (!formData.email) {
      errors.email = "Veuillez saisir votre E-mail";
    } else if (!String(formData.email).toLowerCase().match(regexEmail)) {
      errors.email = "E-mail invalide";
    }
    if (!formData.sexe) {
      errors.sexe = "Veuillez sélectionner votre sexe.";
    }
    if (!formData.CIN) {
      errors.CIN = "Veuillez saisir votre sexe.";
    } else if (formData.CIN.length < 8 || formData.CIN.length > 9) {
      errors.CIN = "CIN invalide";
    }
    if (!formData.nationalite) {
      errors.nationalite = "Veuillez saisir votre nationalité.";
    } else if (!regexNom.test(formData.nationalite)) {
      errors.nationalite = "Nationalité invalide";
    }
    if (!formData.dateNaissance) {
      errors.dateNaissance = "Veuillez sélectionner votre date de naissance.";
    }
    if (!formData.situationPerso) {
      errors.situationPerso = "Veuillez choisir votre situation.";
    } else if (!regexNom.test(formData.situationPerso)) {
      errors.situationPerso = "Situation personnelle invalide";
    }
    if (!formData.telephone) {
      errors.telephone = "Veuillez saisir votre téléphone.";
    } else if (
      isNaN(formData.telephone) ||
      formData.telephone < 10000000 ||
      formData.telephone > 99999999
    ) {
      errors.telephone = "Téléphone invalide.";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowPart2(true);
    }
  };

  const validateForm2 = () => {
    const errors = {};
    let regexNationalite = /^[a-zA-Z ]+$/;

    if (!formData2.titre) {
      errors.titre = "Veuillez saisir le titre de votre projet";
    } else if (!regexNationalite.test(formData2.titre)) {
      errors.nationalite = "Titre invalide.";
    }
    if (!formData2.descriptif) {
      errors.descriptif = "Veuillez saisir le descriptif de votre projet";
    } else if (!regexNationalite.test(formData2.descriptif)) {
      errors.activite = "Description invalide.";
    }
    if (!formData2.ideeProjet) {
      errors.ideeProjet = "Veuillez saisir l'idée de votre projet";
    } else if (!regexNationalite.test(formData2.ideeProjet)) {
      errors.activite = "Idée du projet invalide.";
    }
    if (!formData2.lien) {
      errors.lien = "Veuillez entrer le lien de votre projet";
    } else if (!regexNationalite.test(formData2.lien)) {
      errors.activite = "Lien invalide.";
    }
    if (!formData2.membres) {
      errors.membres = "Veuillez saisir les noms des membres de votre projet";
    } else if (!regexNationalite.test(formData2.membres)) {
      errors.activite = "Mmebres invalide.";
    }
    if (!formData2.motivation) {
      errors.motivation = "Veuillez saisir vos motivations";
    } else if (!regexNationalite.test(formData2.motivation)) {
      errors.activite = "Motivation invalide.";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSuccess(true);
    }
  };

  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData2({
      ...formData2,
      [name]: val,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleValidationAndSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    validateForm2();
    console.log("avant submit");
    handleSubmit(e);
    console.log("apres submit");
  };

  return (
    <>
      <Transition in={!success} timeout={500}>
        {(state) => (
          <>
            {!success && (
              <div>
                <img
                  src={note}
                  alt="note"
                  style={{
                    maxWidth: "10%",
                    position: "fixed",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                    marginTop: "15px",
                  }}
                />
              </div>
            )}
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: state === "exited" ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                maxWidth: "400px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                Formulaire de Candidature TACIR
              </h2>
              <Transition
                in={!showPart2}
                timeout={500}
                mountOnEnter
                unmountOnExit
              >
                {(state) => (
                  <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    <form>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={inputContainerStyle}>
                          <FcBusinessContact style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="text"
                            id="nom"
                            name="nom"
                            placeholder="Nom"
                            value={formData.nom}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.nom && (
                          <span style={errorStyle}>{errors.nom}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcContacts style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="text"
                            id="prenom"
                            name="prenom"
                            placeholder="Prénom"
                            value={formData.prenom}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.prenom && (
                          <span style={errorStyle}>{errors.prenom}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcAddressBook style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.email && (
                          <span style={errorStyle}>{errors.email}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcDisplay style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="CIN"
                            id="CIN"
                            name="CIN"
                            placeholder="CIN"
                            value={formData.cin}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.cin && (
                          <span style={errorStyle}>{errors.CIN}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcCallback style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="tel"
                            id="telephone"
                            name="telephone"
                            placeholder="Téléphone"
                            value={formData.telephone}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.telephone && (
                          <span style={errorStyle}>{errors.telephone}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <GiPerson style={iconStyle} />
                          <select
                            style={inputStyle}
                            id="sexe"
                            name="sexe"
                            value={formData.sexe}
                            onChange={handleChange}
                          >
                            <option value="">Sélectionnez le sexe</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                          </select>
                        </div>
                        {errors.sexe && (
                          <span style={errorStyle}>{errors.sexe}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcGlobe style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="nationalite"
                            name="nationalite"
                            placeholder="Nationalité"
                            value={formData.nationalite}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.nationalite && (
                          <span style={errorStyle}>{errors.nationalite}</span>
                        )}
                        <div style={inputContainerStyle}>
                          <FcCalendar style={iconStyle} />
                          <input
                            style={inputStyle}
                            type="date"
                            id="dateNaissance"
                            name="dateNaissance"
                            placeholder="Date de Naissance"
                            value={formData.dateNaissance}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.dateNaissance && (
                          <span style={errorStyle}>{errors.dateNaissance}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <GiPerson style={iconStyle} />
                          <select
                            style={inputStyle}
                            type="text"
                            id="situationPerso"
                            name="situationPerso"
                            value={formData.situationPerso}
                            onChange={handleChange}
                          >
                            <option value="">
                              Sélectionnez votre situation
                            </option>
                            <option value="marié">Marié(e)</option>
                            <option value="Celibataire">Célibataire</option>
                          </select>
                        </div>
                        {errors.situationPers && (
                          <span style={errorStyle}>{errors.situationPers}</span>
                        )}

                        <button
                          style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={validateForm}
                        >
                          Suivant
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Transition>

              <Transition
                in={showPart2}
                timeout={500}
                mountOnEnter
                unmountOnExit
              >
                {(state) => (
                  <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                    <form>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={inputContainerStyle}>
                          <FcDribbble style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="titre"
                            name="titre"
                            placeholder="Titre de votre projet "
                            checked={formData2.activite}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.titre && (
                          <span style={errorStyle}>{errors.titre}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcGenericSortingDesc style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="descriptif"
                            name="descriptif"
                            placeholder="Description de votre projet "
                            checked={formData2.activite}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.descriptif && (
                          <span style={errorStyle}>{errors.descriptif}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcIdea style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="ideeProjet"
                            name="ideeProjet"
                            placeholder="Idée de votre projet "
                            checked={formData2.ideeProjet}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.ideeProjet && (
                          <span style={errorStyle}>{errors.ideeProjet}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcLink style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="lien"
                            name="lien"
                            placeholder="Lien de votre projet "
                            checked={formData2.lien}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.lien && (
                          <span style={errorStyle}>{errors.lien}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcLink style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="porteur"
                            name="porteur"
                            placeholder="Lien de votre projet "
                            checked={formData2.porteur}
                            onChange={handleChange2}
                          />
                        </div>

                        <div style={inputContainerStyle}>
                          <FcConferenceCall style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="membres"
                            name="membres"
                            placeholder="Membres de votre projet "
                            checked={formData2.membres}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.membres && (
                          <span style={errorStyle}>{errors.membres}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcFlashOn style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="aventure"
                            name="aventure"
                            placeholder="Vos aventures "
                            checked={formData2.aventure}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.aventure && (
                          <span style={errorStyle}>{errors.aventure}</span>
                        )}

                        <div style={inputContainerStyle}>
                          <FcRating style={iconStyle} />

                          <input
                            style={inputStyle}
                            type="text"
                            id="motivation"
                            name="motivation"
                            placeholder="Vos motivations "
                            checked={formData2.motivation}
                            onChange={handleChange2}
                          />
                        </div>
                        {errors.motivation && (
                          <span style={errorStyle}>{errors.motivation}</span>
                        )}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{
                              width: "48%",
                              padding: "10px",
                              backgroundColor: "#007bff",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "15px",
                              cursor: "pointer",
                            }}
                            type="button"
                            onClick={() => setShowPart2(false)}
                          >
                            Retour
                          </button>
                          <button
                            style={{
                              width: "48%",
                              padding: "10px",
                              backgroundColor: "#007bff",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "15px",
                              cursor: "pointer",
                            }}
                            type="button"
                            onClick={handleValidationAndSubmit}
                          >
                            Valider
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </Transition>
            </div>
          </>
        )}
      </Transition>

      <Transition in={success} timeout={500}>
        {(state) => (
          <div>
            <a href="/candidatsForm">
              <FcPrevious style={{ width: "30px", cursor: "pointer" }} />
            </a>

            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: state === "exited" ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
                textAlign: "center",
              }}
            >
              {success && (
                <>
                  <img
                    src={confirm}
                    style={{
                      maxWidth: "60%",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#F5B7B1",
                      color: "white",
                      padding: "10px",
                      borderRadius: "25px",
                      marginTop: "20px",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>
                      Your application has been submitted successfully!{" "}
                      <BiSolidWinkSmile />
                    </p>
                   
                    <a href="/" style={buttonStyle} className="btn">
                      Next
                    </a>

                    <style>
                      {`
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #AAB7B8;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .btn:hover {
            background-color: transparent;
          }
        `}
                    </style>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#AAB7B8",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
};

const inputContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};
/*const succesMessage = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "20px",
  borderRadius: "5px",
  marginTop: "20px",
  textAlign: "center",
};*/
const iconStyle = {
  marginRight: "10px",
  fontSize: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #cccccc",
  borderRadius: "5px",
  boxSizing: "border-box",
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
};

const defaultStyle = {
  transition: "opacity 0.5s ease-out",
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default CandidatureFormulaire;
