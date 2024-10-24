import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeDemandeMateriel = () => {
    const [listeDemande, setListeDemande] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNom, setSelectedNom] = useState('');
    const [selectedIdDemande, setSelectedIdDemande] = useState('');
    const [selectMontant, setMontant] = useState('');
    const [selectNbr, setNbr] = useState('');
    const [selectMotif, setMotif] = useState('');
    const [selectPourcentage, setPourcentage] = useState('');
    const [selectMateriel, setSelectMateriel] = useState('');
    const [stock, setStock] = useState({ nombre: 0 });
    const [error, setError] = useState('');
    const token = localStorage.getItem("token");

    const fetchListeDemande = () => {
        axios.get('https://localhost:8000/api/selectDemandeMateriel',{
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

    const fetchListeMateriel = () => {
        axios.get(`https://localhost:8000/api/stock/${selectMateriel}`,{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setStock(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };

    const insertionValidationMateriel = async (event) => {
        event.preventDefault();
        if (parseInt(selectNbr) > stock.nombre) {
            setError('Le montant demandé dépasse le stock disponible.');
            return;
        }
        setError('');
        try {
            await axios.post('https://127.0.0.1:8000/api/ValidationDemandeMateriel',
                { 
                    utilisateur: token,
                    id_demande_materiel_id: selectedIdDemande, 
                    Nombre: selectNbr
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            setShowModal(false); 
            toast.success("Demande validé");
        } catch (error) {
            console.error('Erreur d\'insertion', error);
        }
    };

    const insertionRefuserMateriel = async (event, id) => {
        event.preventDefault();
        try {
            await axios.post(`https://localhost:8000/api/RefuserDemandeMateriel`,
                {
                    id_demande_materiel_id: id,
                    utilisateur: token
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success("Demande refuser");
        } catch (error) {
            console.error('Erreur de suppression', error);
        }
    };

    useEffect(() => {
        fetchListeDemande(); 
    } , []);

    useEffect(() => {
        if (selectMateriel) {
            fetchListeMateriel();
        }
    }, [selectMateriel]);

    const handleSelectMember = (member) => {
        setShowModal(true);
        setSelectedNom(member.demandeMateriel.idPersonneMembre.Nom_Membre);
        setSelectedIdDemande(member.demandeMateriel.id);
        setMontant(member.demandeMateriel.idMateriel.NomMateriel);
        setMotif(member.motif);  
        setPourcentage(member.pourcentage);  
        setSelectMateriel(member.demandeMateriel.idMateriel.id); // Met à jour selectMateriel
    };

    return (
        <>
            <div className="card">
                <ToastContainer />
                <div className="card-header">
                    <h4 className="card-title">Liste des Demandes Materiel</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du Membre</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Matériel</th>
                                    <th className="text-left">Motif</th>
                                    <th className="text-right">Nombre</th>
                                    <th className="text-right">Pourcentage</th>
                                    <th className="text-center">Valider</th>
                                    <th className="text-center">Refuser</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listeDemande) && listeDemande.length > 0 ? (
                                    listeDemande.map(demande => (
                                        <tr key={demande.demandeMateriel.id}>
                                            <td className="text-left">{demande.demandeMateriel.idPersonneMembre.Nom_Membre} {demande.demandeMateriel.idPersonneMembre.Prenom_Membre} </td>
                                            <td className="text-left">{demande.demandeMateriel.idPersonneMembre.Telephone}</td>
                                            <td className="text-left">{demande.demandeMateriel.idMateriel.NomMateriel}</td>
                                            <td className="text-left">{demande.demandeMateriel.Motif}</td>
                                            <td className="text-right">{demande.Nombre}</td>
                                            <td className="text-right">{demande.pourcentage}%</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-success"
                                                    style={{ width: '50%' }}
                                                    onClick={() => handleSelectMember(demande)}
                                                >
                                                    <i className="now-ui-icons ui-1_check" style={{ color: 'white' }} ></i>
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ width: '50%' }}
                                                    onClick={(e) => insertionRefuserMateriel(e, demande.demandeMateriel.id)} 
                                                >
                                                    <i className="now-ui-icons shopping_basket"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">Aucune demande trouvée</td>
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
                    <Modal.Title>
                        Le produit {stock.materiel ? stock.materiel.NomMateriel : 'N/A'} possède {stock.nombre} en stock
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Mr. ou Mdm {selectedNom} a demandé {selectMontant} pour cause {selectMotif} avec un pourcentage de {selectPourcentage}%.</p>
                    <form onSubmit={insertionValidationMateriel}>
                        <div className="row mb-5">
                            <div className="col-md-5 pr-1">
                                <div className="form-group">
                                    <label>Nombre a donner</label>
                                    <input type="number" className="form-control" placeholder="Nombre" value={selectNbr} onChange={(e) => setNbr(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
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

export default ListeDemandeMateriel;
