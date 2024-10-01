import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'; // Assuming you're using react-bootstrap for modal
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Nouveau = () => {
    const [Membre, setMembre] = useState([]);
    const token = localStorage.getItem("token");
    const [selectedNom, setSelectedNom] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [selectedPwd, setSelectedPwd] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [rolee, setRole] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]); // State to track selected role IDs

    const ListeMembre = () => {
        axios.get('https://localhost:8000/api/getPersIndepNotUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setMembre(response.data);
        });
    };

    const Listerole = () => {
        axios.get('https://localhost:8000/api/Role', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setRole(response.data);
        });
    };

    useEffect(() => {
        ListeMembre();
    }, []);

    const handleSelectMember = (member) => {
        setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
        setSelectedId(member.id);
        setSelectedEmail(member.email);
        setShowModal(true);
        Listerole();
    };

    const Insertion = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:8000/api/Utilisateur',
                {Role:selectedRoles, idPersonne:selectedId,username:selectedEmail,Password:selectedPwd},
            {
                headers:
                {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Inserer nouveuau utilisateur");
    
        } catch (error) {
            console.log(error);
            toast.error("Erreur d'insertion");
        }
    }
    const handleRoleChange = (roleId) => {
        setSelectedRoles((prevRoles) => {
            if (prevRoles.includes(roleId)) {
                // If already selected, unselect it
                return prevRoles.filter(id => id !== roleId);
            } else {
                // Otherwise, add it to the selected roles
                return [...prevRoles, roleId];
            }
        });
    };


    return (
        <>
        <ToastContainer />
            
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Choisisez le nouveax utilisateur</h4>
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

            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajout utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ajouter {selectedNom} parmi les utilisateurs.</p>
                    <div className="card-body">
                        <form onSubmit={Insertion}>
                            <div className="row">
                                <h2>Information pour se connecter</h2>
                                <br /><br /><br />
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" value={selectedEmail} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="À mémoriser" value={selectedPwd}  onChange={(e) => setSelectedPwd(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                              
                            <div className="row mt-4">
                                <div className="col-md-12 pr-1">
                                    <div className="form-group texte-center"style={{  "marginLeft":"40%"}} >
                                        <label style={{  "marginLeft":"10%"}} >Ses rôles</label>
                                        <div className="d-flex flex-wrap gap-5">
                                            {Array.isArray(rolee) && rolee.length > 0 ? (
                                                rolee.map(role => (
                                                    <div key={role.id} >
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`role-${role.id}`}
                                                            value={role.nomRole}
                                                            onChange={() => handleRoleChange(role.id)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`role-${role.id}`}>
                                                            {role.nomRole}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Aucun rôle disponible</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <button type='submit' className='btn btn-success'>Valider</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" >Payer</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default Nouveau;
