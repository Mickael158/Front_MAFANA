import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from 'react-bootstrap'; 

const ListeEvenement = () => {
  const [evenements, setEvenement] = useState([]);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [TypeEvenement,setTypeEvenement] = useState('');
  const [idEvenement, setIdEvenement] = useState(0);
  const [dateDebut,setDateDebut] = useState('');
    const [dateFin,setDateFin] = useState('');
    const [nom,setNom] = useState('');
    const [Lieu,setLieu] = useState('');
    const [Description,setDescription] = useState('');
    const [IdTypeEvenement,setIdTypeEvenement] = useState('');


  
  const ListeTypeEvenement = async () => {
    const response = await axios.get('https://localhost:8000/api/TypeEvenement',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
    setTypeEvenement(response.data);
}
const EvenenemntById = async (e,id) => {
  e.preventDefault();
  console.log(id);
  const response = await axios.get(`https://localhost:8000/api/Evenement/${id}`,{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
  const datedebut = response.data.dateEvenement.split("T")[0];
  const datefin = response.data.dateFinEvenement.split("T")[0];
  setIdEvenement(id);
  setNom(response.data.Nom);
  setDateDebut(datedebut);
  setDateFin(datefin);
  setLieu(response.data.lieuEvenement);
  setDescription(response.data.descriptionEvenement);
  setShowModal(true);
}

const modification = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`https://localhost:8000/api/Evenement/update/${idEvenement}`, 
      {description:Description, date_debut:dateDebut,date_fin:dateFin,lieu:Lieu,typeEvenement_id:IdTypeEvenement,association_id:1,user_id:token,nom:nom},
      {
        headers:
        {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    toast.success("Modification effectuer!");
    setIdEvenement('');
    setNom('');
    setDateDebut('');
    setDateFin('');
    setLieu('');
    setDescription('');
    getEvenements();
    setShowModal(false);
  } catch (error) {
    console.log(error);
    toast.error("Modification echouer!");
  }

} 
  const getEvenements = () => {
    axios
      .get("https://localhost:8000/api/Evenement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvenement(response.data);
      });
  };

  useEffect(() => {
    getEvenements();
    ListeTypeEvenement();
  }, []);

  // Fonction pour supprimer un événement
  const SuppressionEvenement = async (event, id) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `https://127.0.0.1:8000/api/Evenement/supprimer/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      getEvenements();
      toast.success(response.data.message);
      console.log("Événement supprimé");
    } catch (error) {
      toast.error("Erreur de suppression !");
      console.error("Erreur de suppression", error);
    }
  };

  const handleToggle = async (id, currentValue) => {
    const newValue = currentValue === false ? true : false; 
    console.log(id,newValue);
    try {
      await axios.post(`https://127.0.0.1:8000/api/Evenement/affichable/${id}/${newValue}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      getEvenements();
      toast.success("Affichage mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'affichage");
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Tous les événements à venir</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="text-dark">
                <tr>
                  <th>Nom de l'évènement</th>
                  <th>Date de début</th>
                  <th>Date fin</th>
                  <th>Lieu</th>
                  <th>Type d'événement</th>
                  <th>Affichage</th>
                  <th>detail</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(evenements) && evenements.length > 0 ? (
                  evenements.map((evenement) => (
                    <tr key={evenement.id}>
                      <td>{evenement.Nom}</td>
                      <td>
                        {new Date(evenement.dateEvenement)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>
                        {new Date(evenement.dateFinEvenement)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>{evenement.lieuEvenement}</td>
                      <td>{evenement.idTypeEvenement.Nom_Type_Evenement}</td>
                      <td>
                        <div
                          className={`toggle-switch ${
                            evenement.publier === true ? "toggled" : ""
                          }`}
                          onClick={() => handleToggle(evenement.id, evenement.publier)}
                          id={evenement.id}
                        >
                          <div className="toggle-button" />
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-block"
                          style={{ width: "100%" }}
                          onClick={(e) => EvenenemntById(e, evenement.id)}
                        >
                          {/* <i className="now-ui-icons shopping_basket"></i> */}
                          voir
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-block"
                          style={{ width: "50%" }}
                          onClick={(e) => SuppressionEvenement(e, evenement.id)}
                        >
                          <i className="now-ui-icons shopping_basket"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Aucun événement trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
      <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
      </Modal.Header>
                <Modal.Body>
      <form onSubmit={modification}>
                  <div className="row">
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Nom de l'évènement</label>
                        <input type="text" className="form-control" placeholder="Nom de l'évènement" value={nom} onChange={(e) => setNom(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Date de début de l'évènement</label>
                        <input type="date" className="form-control"  value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-1">
                      <div className="form-group">
                        <label >Date fin de l'évènement</label>
                        <input type="date" className="form-control" value={dateFin} onChange={(e) => setDateFin(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6 pr-1">
                        <div className="form-group">
                            <label>Lieu de l'évènement</label>
                            <input type="text" className="form-control" placeholder="Lieu de l'évènement" value={Lieu} onChange={(e) => setLieu(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Type de l'évènement</label>
                        <select className="form-control" value={ IdTypeEvenement } onChange={(e) => setIdTypeEvenement(e.target.value)}>
                          <option value="">Selectionner un Type</option>  
                        {Array.isArray(TypeEvenement) ? (
                            TypeEvenement.map(TypeEvenement => (
                                <option key={TypeEvenement.id} value={TypeEvenement.id} className="form-control">
                                  {TypeEvenement.nomTypeEvenement}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Déscription Evènement</label>
                        <textarea rows="4" cols="80" className="form-control" placeholder="Déscription de l'évènement" value={Description} onChange={(e) => setDescription(e.target.value)}>Lamborghini Mercy, Your chick she so thirsty, I m in that two seat Lambo.</textarea>
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-success'>Modifier l'évènement</button>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false) }>Fermer</button>
                </Modal.Footer>
            </Modal>
    </>
  );
};

export default ListeEvenement;