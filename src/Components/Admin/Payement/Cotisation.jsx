import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'; // Assuming you're using react-bootstrap for modal
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

    const ListeMembre = () => {
        axios.get('https://localhost:8000/api/PersonneIndep',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setMembre(response.data);
        });
    };
    const VoireDevis = () => {
        axios.get(`https://localhost:8000/api/Devis/${selectedId}/${mois}`,{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setDevisData(response.data);
            console.log(response.data);
            setShowModal(true);
            console.log("true");
        });
    };

    const PayementCotisation = (event) => {
        event.preventDefault();
        console.log(token);
        console.log(devisData);
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
    }) , [];
    const handleSelectMember = (member) => {
        setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
        setSelectedId(member.id);
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
                                        <label>Nom de la personne à payer</label>
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
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th>Nom du Membre</th>
                                    <th>Prénom</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Dernière Cotisation Payée</th>
                                    <th>Cliquer pour choisir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
                                    Membre.map(member => (
                                        <tr key={member.id}>
                                            <td>{member.nom_membre}</td>
                                            <td>{member.prenom_membre}</td>
                                            <td>{member.telephone}</td>
                                            <td>{member.email}</td>
                                            <td>{member.situation}</td>
                                            <td>
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
                    <p>Devis details pour {selectedNom}.</p>
                    <table className="table">
                        <thead className="text-dark">
                            <tr>
                                <th>Nom et prenom</th>
                                <th>Date à payer</th>
                                <th>Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(devisData) && devisData.length > 0 ? (
                                devisData.flatMap(innerArray =>
                                    innerArray.map((divis, index) => (
                                        <tr key={index}>
                                            <td>{divis.personnMembre.nomMembre} {divis.personnMembre.prenomMembre}</td>
                                            <td>{new Date(divis.datePayer).toLocaleDateString()}</td>
                                            <td>{divis.Montant} Ar</td>
                                        </tr>
                                        
                                    ))
                                )
                               
                            ) : (
                                <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                            )}
                             <tr>
                                    <td colSpan="2" style={{"fontWeight":"bold" , "color":"red"}}>Montant Total</td>
                                    <td colSpan="1" style={{"fontWeight":"bold" , "color":"red"}}>{totalMontant} Ar</td>
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
