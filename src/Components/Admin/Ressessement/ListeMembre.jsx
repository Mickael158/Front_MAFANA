import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeMembre = () => {
  const [Membre,setMembre] = useState('');
  const [Fammille,setFamille] = useState([]);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [showModaldece, setShowModalDece] = useState(false);
  const [ShowModalQuitte, setShowModalQuitte] = useState(false);
  const [Proffesion, setProffesion] = useState([]);
  const [ProffesionPerso, setProffesionPerso] = useState([]);
  const [selectedNom, setSelectedNom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIdProfession, setSelectedIdProfession] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [devisData, setDevisData] = useState([]);
  const [SelectedChoix, setSelectedChoix] = useState('');
  const [SelectedIdChoix, setSelectedIdChoix] = useState('');
  const [fileName, setFileName] = useState("");
  const [Data, setData] = useState(null);
  const [Idvillage,setIdvillage] = useState(null);
  const [Village,setVillage] = useState('');
  const recherche =  (event) => {
    if(event){
      event.preventDefault();
  }
    axios.post('https://localhost:8000/api/recherchePersonneIndep',{
        data: Data,
        village: Idvillage
    },{
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })
       .then(response => {
        setMembre(response.data.data);
        })
       .catch(error => {
            console.error("Erreur lors de la récupération des données", error);
        });
} 
const ListeVillage = () => {
  axios.get('https://localhost:8000/api/village',{
  headers: 
  {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  },
  }).then(response => {
      setVillage(response.data)
  });
};  
  const ListeMembreFamille = (id) => {
    axios.get(`https://localhost:8000/api/PersonneCharge_ByResposanble/${id}`,{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setFamille(response.data);
    });
  };  
  const VoirePersonneCharge = (id) => {
    axios.get(`https://localhost:8000/api/PersonneCharge_ByResposanble/${id}`,{
        headers:
        {
            'content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
        setDevisData(response.data);
        setShowModalQuitte(true);
    });
};
  useEffect(() => {
    recherche(); 
    ListeVillage(); 
  } , []);

  const VoireProffession = (id) => {
    axios.get(`https://localhost:8000/api/getProfession_By_personne/${id}`,{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
        setProffesion(response.data);
    });
    setShowModal(true);
};
const VoireProffessionByPersonne = (id) => {
  axios.get(`https://localhost:8000/api/PersonneMembreProfessions/${id}`,{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setProffesionPerso(response.data);
  });
  setShowModal(true);
};
const Decede = (event) => {
  event.preventDefault();
  const today = new Date();
  const selected = new Date(selectedDate);
  if (selected > today) {
    toast.error("La date ne peut pas dépasser aujourd'hui.");
    return; 
  }
  try{
      axios.post(`https://localhost:8000/api/Decede`,
        {IdPersonneMembre : SelectedIdChoix, date_dece :  selectedDate},
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
            setShowModalDece(false);
            ListeMembre(); 
            toast.success("Declaration decede inserer");
  }catch(error){
    toast.error('Erreur d\'insertion' , error);
  }
}
const AjouterProfessionMembre = (event) => {
  event.preventDefault();
  try{
       axios.post(`https://localhost:8000/api/PersonneMembreProfession`,
        {IdPersonneMembre : selectedId, IdProfession : selectedIdProfession },
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
          VoireProffessionByPersonne(selectedId);
          setShowModal(false);
            toast.success("Ajouter Profession inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}
const QuitteMembre = (event) => {
  event.preventDefault();
  try{
       axios.post(`https://127.0.0.1:8000/api/Quitte`,
        {famille : devisData },
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
            setShowModalQuitte(false);
            ListeMembre(); 
            toast.success("Personne quitter inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}

  const handleSelectMember = (member) => {
    setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
    setSelectedId(member.id);
    VoireProffession(member.id);
    VoireProffessionByPersonne(member.id);
};
const handleSelectMemberDece = (member) => {
  setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
  setSelectedId(member.id);
  ListeMembreFamille(member.id)
  setShowModalDece(true);
};
const handleSelectMemberQuitte = (member) => {
  setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
  setSelectedId(member.id);
  VoirePersonneCharge(member.id);
};
const handleChoix = (member) => {
  setSelectedChoix(member.nomMembre + ' ' + member.prenomMembre);
  setSelectedIdChoix(member.id);
};
const handleFileChange = (e) => {
  const file = e.target.files[0]; // Récupère le premier fichier sélectionné
  if (file) {
    setFileName(file.name); // Met à jour l'état avec le nom du fichier
  }
};
const handleExport = async (event) => {
  event.preventDefault();

  if (!fileName) {
    toast.error('Veuillez sélectionner un fichier CSV.');
    return;
  }
  console.log(`https://localhost:8000/api/import/${fileName}`);
  try {
    const response = await axios.post(`https://localhost:8000/api/import/${fileName}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      toast.success("Importation réussie !");
    } else {
      toast.error("Erreur lors de l'importation.");
    }
  } catch (error) {
    console.error('Erreur d\'insertion:', error);
    toast.error('Erreur lors de l\'importation du fichier.');
  }
};

  return (
    <>
    <ToastContainer/>
      <div className="card">
          <div className="card-header">
            <h4 className="card-title">Membre résponsable</h4>
            <input 
              type="file" 
              className="form-control" 
              accept=".csv" 
              onChange={handleFileChange} 
            />
            <div className="d-flex gap-2">
              <button 
                className="btn btn-warning" 
                onClick={handleExport}
              >
                Exporter le fichier CSV ci-dessus
              </button>
            </div>
        </div>
              <div className="card-body">
              <form onSubmit={recherche}>
                    <div className="row">
                        <div className="col-3">
                            <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className="col-3">
                        <select className="form-control" value={ Idvillage } onChange={(e) => setIdvillage(e.target.value)}>
                        <option>Choisir un Village</option>
                        {Array.isArray(Village) ? (
                            Village.map(Village => (
                                <option key={Village.id} value={Village.id} className="form-control">
                                  {Village.nomVillage}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                        </div>
                    </div>
                    <Button type="submit" className="btn btn-sm btn-warning">Rechercher</Button>
                </form>
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th className="text-left">
                        Nom
                      </th>
                      <th className="text-left">
                        Prénom
                      </th>
                      <th className="text-left">
                        Adresse
                      </th>
                      <th className="text-left">
                        Téléphone
                      </th >
                      <th className="text-left">
                        Date de naissance
                      </th>
                      <th className="text-left">
                        Email
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                      <th className="text-center">
                        Profession
                      </th>
                      <th className="text-center">
                        Décédé
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Membre) ? (
                            Membre.map(Membre => (
                                <tr key={Membre.id}>
                                        <td className="text-left">
                                            {Membre.nom_membre}
                                        </td>
                                        <td className="text-left">
                                            {Membre.prenom_membre}
                                        </td>
                                        <td className="text-left">
                                            {Membre.address}
                                        </td>
                                        <td className="text-left">
                                            {Membre.telephone}
                                        </td>
                                        <td className="text-left">
                                        {new Date(Membre.date_de_naissance).toISOString().split('T')[0]}
                                        </td>
                                        <td className="text-left">
                                            {Membre.email}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" style={{'width': '50%' , 'fontSize':'15px'}} onClick={() => handleSelectMemberQuitte(Membre)} ><i className="now-ui-icons shopping_basket"></i></button>
                                        </td>
                                        <td className="text-center">
                                        <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => handleSelectMember(Membre)}
                                    >
                                        Voire
                                    </button>
                                        </td>
                                        <td>
                                        <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => handleSelectMemberDece(Membre)}
                                    >
                                        Marquer
                                    </button>
                                        </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Profession de {selectedNom} {selectedIdProfession}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ajouter plus de profession</p>
                        <select className="form-control" onChange={(e) => setSelectedIdProfession(e.target.value)}>
                        <option className="form-control text-center">Choisez la profession à ajouter</option>
                            {Array.isArray(Proffesion) ? (
                              Proffesion.map(pro => (
                                <option className="form-control text-center" key={pro.id} value={pro.id}>
                                  {pro.nom_profession}
                                </option>
                              ))
                            ) : (
                              <option className="form-control">Null</option>
                            )}
                        </select>
                      <hr/>
                      <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th>
                        Les Professions de {selectedNom}
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Proffesion) ? (
                            ProffesionPerso.map(professionpers => (
                                <tr key={professionpers.id}>
                                  <td>
                                      {professionpers.nom_profession}
                                  </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                    </tbody>
                  </table>
                </div>
              </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={AjouterProfessionMembre} >Ajouter</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModaldece} onHide={() => setShowModalDece(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Personne décédé {selectedNom} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Date de décé</p>
                        <input type="date" className="form-control"  value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        <div className="form-group">
                              <label>Nom de la personne décédé</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nom de la Personne"
                                  value={SelectedChoix}
                                  readOnly
                              />
                          </div>
                        <div className="card">
                          <div className="card-header">
                              <h4 className="card-title">Membre de la famille</h4>
                          </div>
                          <div className="card-body">
                              <div className="table-responsive">
                                  <table className="table">
                                      <thead className="text-dark">
                                          <tr>
                                              <th className="text-left">Nom du Membre</th>
                                              <th className="text-left">Prénom</th>
                                              <th className="text-center">Choisir</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {Array.isArray(Fammille) ? (
                                              Fammille.map((famille, index) => {
                                                
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-left">{famille.nomMembre}</td>
                                                        <td className="text-left">{famille.prenomMembre}</td>
                                                        <td className="text-center">
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleChoix(famille)}
                                                            >
                                                                <i className="now-ui-icons gestures_tap-01 fs-5"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            
                                          ) : (
                                              <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                                          )}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={Decede} >Déclarer</button>
                    <button className="btn btn-secondary" onClick={() => setShowModalDece(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
            <Modal show={ShowModalQuitte} onHide={() => setShowModalQuitte(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNom} vas vraiment quitter le groupe avec sa famille </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="table-responsive">
                    <table className="table">
                      <thead className=" text-dark">
                        <th className="text-left">
                          Nom
                        </th>
                        <th className="text-left">
                          Prénom
                        </th>
                      </thead>
                      <tbody>
                          {Array.isArray(devisData) ? (
                              devisData.map(famille => (
                                  <tr key={famille.id}>
                                    <td className="text-left">
                                        {famille.nomMembre}
                                    </td>
                                    <td className="text-left">
                                        {famille.prenomMembre}
                                    </td>
                                  </tr>
                              ) )
                          ) : ( <tr><td>Null</td></tr>) }
                      </tbody>
                    </table>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={QuitteMembre} >Quitter</button>
                    <button className="btn btn-secondary" onClick={() => setShowModalQuitte(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
    </>
  )
}

export default ListeMembre
