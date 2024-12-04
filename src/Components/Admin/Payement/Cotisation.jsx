import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap'; // Assuming you're using react-bootstrap for modal
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Cotisation = () => {
    const [Membre, setMembre] = useState([]);
    const [selectedNom, setSelectedNom] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [mois, setMois] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [devisData, setDevisData] = useState([]);
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [Idvillage,setIdvillage] = useState(null);
    const [Village,setVillage] = useState('');
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
    const ListeMembre = (event) => {
        if(event){
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/Etat',{
            data: Data,
            village: Idvillage
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setMembre(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des membres:", error);
        });
    };
    const VoireDevis = () => {
        if (mois <= 0) {
            toast.error("Le mois doit être supérieur à 0.");
            return; // Arrêter l'exécution si le mois est invalide
        }
        axios.get(`https://localhost:8000/api/Devis/${selectedId}/${mois}`,{
            headers:
            {
                'content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setDevisData(response.data);
            setShowModal(true);
        });
    };

    const PayementCotisation = (event) => {
        event.preventDefault();
        try{
            
            axios.post(`https://localhost:8000/api/Payement`,{data : devisData, utilisateur : token },
                {
                    headers: 
                    {
                      'content-Type': 'application/json',
                      'Authorization' : `Bearer ${token}`
                    }
                  });
                  toast.success("Devis valider!");
                  setShowModal(false);
        }catch(error){
            console.error('Erreur d\'insertion' , error)
            toast.error("Erreur de validation");
            setSelectedNom('');
            setMois('');
        }
        
    }
    
    useEffect(() => {
        ListeMembre(); 
        ListeVillage();
    }, []) ;
    const handleSelectMember = (member) => {
        setSelectedNom(member.personnMembre.nomMembre + ' ' + member.personnMembre.prenomMembre);
        setSelectedId(member.personnMembre.id);
    };
    const totalMontant = devisData.flatMap(innerArray =>
        innerArray.map(divis => divis.Montant)
    ).reduce((acc, montant) => acc + montant, 0);
    return (
        <>
            <div>
                <ToastContainer />
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Cotisation</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mb-5">
                                <div className="col-md-5 pr-1">
                                    <div className="form-group">
                                        <label>Nom de la personne membre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la Personne"
                                            value={selectedNom}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 pr-1">
                                    <div className="form-group">
                                        <label>Nombre de mois à payer</label>
                                        <input type="number" className="form-control" placeholder="Nombre de mois" value={mois} onChange={(e) => setMois(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1 mt-3">
                                    <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={VoireDevis}
                                        disabled={!selectedNom}
                                    >
                                        Voire devis
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Membre Responsable</h4>
                </div>
                <div className="card-body">
                <form onSubmit={ListeMembre}>
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className="col-4">
                            <select className="form-control" value={ Idvillage } onChange={(e) => setIdvillage(e.target.value)}>
                            <option>Choisir un Tragnombe</option>
                            {Array.isArray(Village) ? (
                                Village.map(Village => (
                                    <option key={Village.id} value={Village.id} className="form-control">
                                    {Village.nomVillage}
                                    </option>
                                ) )
                            ) : ( <option>Aucune Valeur</option> ) }
                            </select>
                        </div>
                        <div className="col-4">
                            <Button type="submit" className="btn btn-sm btn-success" style={{"width" : "40%" , "height" : "95%" , "marginTop" : "-0.3%"}}><i className="now-ui-icons ui-1_zoom-bold"></i>   Rechercher</Button>
                        </div>
                    </div>
                    
                </form>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du Membre</th>
                                    <th className="text-left">Prénom</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-right">Pourcentage</th>
                                    <th className="text-center">Cliquer pour choisir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
                                    Membre.map(member => (
                                        <tr key={member.personnMembre.id}>
                                            <td className="text-left">{member.personnMembre.nomMembre}</td>
                                            <td className="text-left">{member.personnMembre.prenomMembre}</td>
                                            <td className="text-left">{member.personnMembre.Telephone}</td>
                                            <td className="text-left">{member.personnMembre.Email}</td>
                                            <td className="text-right">{Number.isInteger(member.pourcentage) 
                                                                    ? member.pourcentage 
                                                                    : member.pourcentage.toFixed(2)} % </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-danger"
                                                    
                                                    onClick={() => handleSelectMember(member)}
                                                >
                                                    <i className="now-ui-icons gestures_tap-01 fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Devis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Devis détails pour {selectedNom}.</p>
                    <table className="table">
                        <thead className="text-dark">
                            <tr>
                                <th className="text-left">Nom et prénom</th>
                                <th className="text-left">Date à payer</th>
                                <th className="text-right">Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(devisData) && devisData.length > 0 ? (
                                devisData.flatMap(innerArray =>
                                    innerArray.map((divis, index) => (
                                        <tr key={index}>
                                            <td className="text-left">{divis.personnMembre.nomMembre} {divis.personnMembre.prenomMembre}</td>
                                            <td className="text-left">{new Date(divis.datePayer).toLocaleDateString()}</td>
                                            <td className="text-right">{Number(divis.Montant).toLocaleString()} Ar</td>
                                        </tr>
                                        
                                    ))
                                )
                               
                            ) : (
                                <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                            )}
                             <tr>
                                    <td colSpan="2" style={{"fontWeight":"bold" , "color":"red"}} className="text-right">Montant Total :</td>
                                    <td colSpan="1" style={{"fontWeight":"bold" , "color":"red"}} className="text-right">{Number(totalMontant).toLocaleString()} Ar</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={PayementCotisation}>Payer</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cotisation;
