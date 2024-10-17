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
    } , []);

    const handleSelectMember = (member) => {
        setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
        setSelectedId(member.id);
        setSelectedEmail(member.email);
        setShowModal(true);
        Listerole();
    };

    const Insertion = async (e) => {
        e.preventDefault();
        if (selectedPwd.length < 6) {
            toast.error("Le mot de passe est trop court, il doit contenir au moins 6 caractères.");
            return; 
        }
        try {
            await axios.post('https://localhost:8000/api/Utilisateurs',
                {Role:selectedRoles, idPersonne:selectedId,username:selectedEmail,Password:selectedPwd},
            {
                headers:
                {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Inserer nouveuau utilisateur");
            setSelectedRoles([]);
            setShowModal(false);
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
                    <h4 className="card-title">Choisissez les nouveaux utilisateurs</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du ,embre</th>
                                    <th className="text-left">Prénom</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-left">Situqtion</th>
                                    <th className="text-center">Cliquer pour choisir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
                                    Membre.map(member => (
                                        <tr key={member.id}>
                                            <td className="text-left">{member.nom_membre}</td>
                                            <td className="text-left">{member.prenom_membre}</td>
                                            <td className="text-left">{member.telephone}</td>
                                            <td className="text-left">{member.email}</td>
                                            <td className="text-left">{member.situation}</td>
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

            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un utilisateur</Modal.Title>
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
                                        <label>mot de passe</label>
                                        <input type="password" className="form-control" placeholder="mot de passe a mémoriser" value={selectedPwd}  onChange={(e) => setSelectedPwd(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                              
                            <div className="row mt-4">
                                <div className="col-md-12 pr-1">
                                    <div className="form-group texte-center"style={{  "marginLeft":"40%"}} >
                                        <label style={{  "marginLeft":"10%"}} >Les rôles disponibles</label>
                                        <div>
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



                            <button type='submit' className='btn btn-success'>Confirmer le nouveau utilisateur</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default Nouveau;
