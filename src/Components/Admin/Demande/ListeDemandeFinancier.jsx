import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';


const ListeDemandeFinancier = () => {
    const [listeDemande, setListeDemande] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNom, setSelectedNom] = useState('');
    const [selectedIdDemande, setSelectedIdDemande] = useState('');
    const [selectMontant, setMontant] = useState('');
    const [selectMontantV, setMontantV] = useState('');
    const [selectMotif, setMotif] = useState('');
    const [selectPourcentage, setPoucentage] = useState('');
    const [Font, setFont] = useState({});
    const token = localStorage.getItem("token");

    const fetchListeDemande = () => {
        axios.get('https://localhost:8000/api/DemandeFinaciers',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setListeDemande(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };

    const tresoreri = () => {
        axios.get('https://localhost:8000/api/Tresoreri',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setFont(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };

    const insertionValidationFinancier = async (event) => {
        event.preventDefault();
        
        // Check if selectMontantV is greater than Font.montant
        if (parseFloat(selectMontantV) > Font.montant) {
            console.error('Le montant saisi est supérieur au montant disponible.');
            return;
        }

        try {
            await axios.post('https://127.0.0.1:8000/api/ValidationDemandeFinancier',
                {
                    utilisateur: token,
                    id_demande_financier_id: selectedIdDemande,
                    Montant: selectMontantV
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            console.log('DEMANDE Validée');
            setShowModal(false); // Close the modal on successful validation
        } catch (error) {
            console.error('Erreur d\'insertion', error);
        }
    };

    const insertionRefuserFinancier = async (event, id) => {
        event.preventDefault();
        try {
            await axios.post('https://localhost:8000/api/RefuserDemandeFinancier',
                {
                    id_demande_financier_id: id,
                    utilisateur: token
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            console.log('Demande refusée');
        } catch (error) {
            console.error('Erreur de suppression', error);
        }
    };

    useEffect(() => {
        fetchListeDemande();
        tresoreri();
    }, []);

    const handleSelectMember = (member) => {
        setShowModal(true);
        setSelectedNom(member.demandefinancier.idPersonneMembre.Nom_Membre);
        setSelectedIdDemande(member.demandefinancier.id);
        setMontant(member.demandefinancier.Montant);
        setMontantV(member.demandefinancier.Montant);
        setMotif(member.motif);
        setPoucentage(member.pourcentage);
        setMontantV(selectMontant);
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">ListeDemande Responsable</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th>Nom du Membre</th>
                                    <th>Téléphone</th>
                                    <th>Montant</th>
                                    <th>Motif</th>
                                    <th>Pourcentage</th>
                                    <th>Action</th>
                                    <th>Refuser</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listeDemande) && listeDemande.length > 0 ? (
                                    listeDemande.map(demande => (
                                        <tr key={demande.demandefinancier.id}>
                                            <td>{demande.demandefinancier.idPersonneMembre.Nom_Membre}</td>
                                            <td>{demande.demandefinancier.idPersonneMembre.Telephone}</td>
                                            <td>{demande.demandefinancier.Montant}</td>
                                            <td>{demande.motif}</td>
                                            <td>{demande.pourcentage}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success"
                                                    style={{ width: '50%' }}
                                                    onClick={() => handleSelectMember(demande)}
                                                >
                                                    valider
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ width: '50%' }}
                                                    onClick={(e) => insertionRefuserFinancier(e, demande.demandefinancier.id)}
                                                >
                                                    <i className="now-ui-icons shopping_basket"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Aucune demande trouvée</td>
                                    </tr>
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
                    <p>Mr. ou Mdm {selectedNom} a demandé {selectMontant}Ar pour cause {selectMotif} avec une pourcentage de {selectPourcentage}%.</p>
                    <form onSubmit={insertionValidationFinancier}>
                        <div className="row mb-5">
                            <div className="col-md-5 pr-1">
                                <div className="form-group">
                                    <label>Montant à donner</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="montant"
                                        value={selectMontantV}
                                        onChange={(e) => setMontantV(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success" type="submit">Valider</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListeDemandeFinancier;
