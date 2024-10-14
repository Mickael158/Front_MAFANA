import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModificationMembre = () => {
  const [PersonneMembre, setPersonneMembre] = useState({
    Nom : '',
    Prenom : '',
    Adresse : '',
    Email : '',
    Telephone : '',
    IdVillage : '',
    IdGenre : '',
    DateNaissance : ''
  });
  const [Membre,setMembre] = useState('');
  const [Fammille,setFamille] = useState([]);
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [showModaldece, setShowModalDece] = useState(false);
  const [ShowModalQuitte, setShowModalQuitte] = useState(false);
  const [selectedNom, setSelectedNom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [devisData, setDevisData] = useState([]);
  const [SelectedChoix, setSelectedChoix] = useState('');
  const [SelectedIdChoix, setSelectedIdChoix] = useState('');
  const [fileName, setFileName] = useState("");
  const [Data, setData] = useState(null);
  const [Idvillage,setIdvillage] = useState(null);
  const [Idgenre,setIdgenre] = useState(null);
  const [Idprofession,setIdprofession] = useState(null);
  const [Village,setVillage] = useState('');
  const [Genre,setGenre] = useState('');
  const [Profession,setProfession] = useState('');
  const [ShowModalCorbeil,setShowModalCorbeil] = useState(false);
  const [MembreQuitte,setMembreQuitte] = useState('');

  const SelectMembreQuitte = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/personneQuitter',{
        headers:
        {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      });
      setMembreQuitte(response.data.reponse);
    } catch (error) {
      console.error(error);
    }
  }

  const restaurationMembre = async (id) => {
    try {
      await axios.post(`https://localhost:8000/api/personneRestaurer/${id}`, {}, { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Membre Restauré');
      setShowModalCorbeil(false);
    } catch (error) {
      console.error(error);
      toast('Erreur lors de la restauration');
    }
  };

  const ModificationMembre = async (event) => 
    {
      event.preventDefault();
       // Regex pour valider le nom et prénom (seulement lettres)
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
      // Regex pour valider l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regex pour valider le téléphone (10 chiffres)
      const phoneRegex = /^\d{10}$/;

      // Vérification des champs
      if (!PersonneMembre.Nom || !nameRegex.test(PersonneMembre.Nom)) {
          toast.error("Le nom doit contenir uniquement des lettres");
          return;
      }
      if (!PersonneMembre.Prenom || !nameRegex.test(PersonneMembre.Prenom)) {
          toast.error("Le prénom doit contenir uniquement des lettres");
          return;
      }
      if (!PersonneMembre.Email || !emailRegex.test(PersonneMembre.Email)) {
          toast.error("Veuillez entrer un email valide");
          return;
      }
      if (!PersonneMembre.Telephone || !phoneRegex.test(PersonneMembre.Telephone)) {
          toast.error("Le numéro de téléphone doit contenir 10 chiffres");
          return;
      }
      if (!PersonneMembre.Adresse || !PersonneMembre.DateNaissance || 
          !PersonneMembre.IdGenre || !PersonneMembre.IdVillage) {
          toast.error("Tous les champs doivent être remplis");
          return;
      }
      try
      {
        const response = await axios.post(`https://localhost:8000/api/Personne/update/${selectedId}`,
        { 
          Nom : PersonneMembre.Nom,
          Prenom : PersonneMembre.Prenom,
          Adresse : PersonneMembre.Adresse,
          Email : PersonneMembre.Email,
          Telephone : PersonneMembre.Telephone,
          DateNaissance : PersonneMembre.DateNaissance,
          genre_id : PersonneMembre.IdGenre,
          village_id : PersonneMembre.IdVillage 
        },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
        
      );
      toast.success(response.data.message);
      setPersonneMembre({...PersonneMembre,
        Nom: '',
        Prenom: '',
        Adresse: '',
        Email: '',
        Telephone: '',
        IdVillage: '',
        IdGenre: '',
        DateNaissance: ''
      });
      setShowModal(false);
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Error de ressesement");
    }
  }

  const ListeGenre = () => {
    axios.get('https://localhost:8000/api/Genre',{
      headers: 
      {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
        setGenre(response.data)
    });
  };  
  const ListeProfession = () => {
    axios.get('https://localhost:8000/api/Profession',{
      headers: 
      {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
        setProfession(response.data)
        
    });
  };  
  const recherche =  (event) => {
    if(event){
      event.preventDefault();
  }
    axios.post('https://localhost:8000/api/recherchePersonne',{
        data: Data,
        village: Idvillage,
        genre: Idgenre,
        profession: Idprofession
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
    ListeGenre();
    ListeProfession();
    SelectMembreQuitte();
  } , []);


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
            toast.success("Declaration decede inserer");
  }catch(error){
    toast.error('Erreur d\'insertion' , error);
  }
}

const PersonneById = async (id) => {

  try {
    const response = await axios.get(`https://localhost:8000/api/PersonneAllById/${id}`,{
      headers: 
      {
        'content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    setPersonneMembre({...PersonneMembre,
      Nom: response.data.nomMembre,
      Prenom: response.data.prenomMembre,
      Adresse: response.data.Address,
      Email: response.data.Email,
      Telephone: response.data.Telephone,
      DateNaissance: response.data.dateDeNaissance
    });
    setShowModal(true);
  } catch (error) {
    console.error(error)
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
            toast.success("Personne quitter inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}

  const handleSelectMember = (member) => {
    setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
    setSelectedId(member.id);
    PersonneById(member.id);
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
  const file = e.target.files[0]; 
  if (file) {
    setFileName(file.name); 
  }
};
const handleExport = async (event) => {
  event.preventDefault();

  if (!fileName) {
    toast.error('Veuillez sélectionner un fichier CSV.');
    return;
  }

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
            <div className="d-flex justify-content-between">
              <h4 className="card-title">Liste de tous les membres</h4>
              <div>
                  <small>Corbeille </small><button className="btn btn-secondary btn-sm" onClick={() => setShowModalCorbeil(true)}><i className="now-ui-icons shopping_basket"></i></button>
              </div>
            </div>
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
                        <div className="col-3">
                        <select className="form-control" value={ Idgenre } onChange={(e) => setIdgenre(e.target.value)}>
                        <option>Choisir le Genre</option>
                        {Array.isArray(Genre) ? (
                            Genre.map(Genre => (
                                <option key={Genre.id} value={Genre.id} className="form-control">
                                  {Genre.nomGenre}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                        </div>
                        <div className="col-3">
                        <select className="form-control" value={ Idprofession } onChange={(e) => setIdprofession(e.target.value)}>
                        <option>Choisir un Professeur</option>
                        {Array.isArray(Profession) ? (
                            Profession.map(Profession => (
                                <option key={Profession.id} value={Profession.id} className="form-control">
                                  {Profession.nomProfession}
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
                        Detail
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
                                            <button className="btn btn-danger"  onClick={() => handleSelectMemberQuitte(Membre)} ><i className="now-ui-icons shopping_basket"></i></button>
                                        </td>
                                        <td className="text-center">
                                        <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => handleSelectMember(Membre)}
                                    >
                                        voir
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
                    <Modal.Title>{selectedNom}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Voici les informations de cette personne</p>
                        
                      <hr/>
                      <div className="card-body">
                      <form onSubmit={ModificationMembre}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du Membre</label>
                        <input type="text" className="form-control"  placeholder="Nom" value={ PersonneMembre.Nom } onChange={(e) => setPersonneMembre({...PersonneMembre,Nom : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Prénom du Membre</label>
                        <input type="text" className="form-control"  placeholder="Prenom" value={ PersonneMembre.Prenom } onChange={(e) => setPersonneMembre({...PersonneMembre,Prenom : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Adresse</label>
                        <input type="text" className="form-control"  placeholder="Adresse" value={ PersonneMembre.Adresse } onChange={(e) => setPersonneMembre({...PersonneMembre,Adresse : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Date de Naissance</label>
                        <input type="date" className="form-control"  placeholder="Date de Naissance" value={ PersonneMembre.DateNaissance ? new Date(PersonneMembre.DateNaissance).toISOString().split('T')[0] : '' }  onChange={(e) => setPersonneMembre({...PersonneMembre,DateNaissance : e.target.value})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"  placeholder="Email" value={ PersonneMembre.Email } onChange={(e) => setPersonneMembre({...PersonneMembre,Email : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input className="form-control"  placeholder="Numero de telephone" value={ PersonneMembre.Telephone } onChange={(e) => setPersonneMembre({...PersonneMembre,Telephone : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                      <label>Genre</label>
                        <select className="form-control" value={ PersonneMembre.IdGenre } onChange={(e) => setPersonneMembre({...PersonneMembre,IdGenre : e.target.value,})}>
                        <option>Choisir le Genre</option>
                        {Array.isArray(Genre) ? (
                            Genre.map(Genre => (
                                <option key={Genre.id} value={Genre.id} className="form-control">
                                  {Genre.nomGenre}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) } 
                        </select>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                      <label>Village</label>
                        <select className="form-control" value={ PersonneMembre.IdVillage } onChange={(e) => setPersonneMembre({...PersonneMembre,IdVillage : e.target.value,})}>
                        <option>Choisir un village</option>
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

                    <div className="col-md-3 pr-1 mt-3">
                      <button className="btn btn-success btn-block" style={{'fontSize' : '18px'}} type="submit">Valider</button>
                    </div>
                  </div> 
                </form>
              </div>
                </Modal.Body>
                <Modal.Footer>
                    
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



            <Modal show={ShowModalCorbeil} onHide={() => setShowModalCorbeil(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title> Vous pouvez voir ici les membres qui ont quitté le groupe </Modal.Title>
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
                        restaurer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(MembreQuitte) ? (
                            MembreQuitte.map(Membre => (
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
                                        <td>
                                        <button   
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => restaurationMembre(Membre.id)}
                                    >
                                        restaurer
                                    </button>
                                        </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                    </tbody>
                  </table>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModalCorbeil(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
    </>
  )
}

export default ModificationMembre
  


