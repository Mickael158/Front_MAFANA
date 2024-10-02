import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Modification = () => {
    const [Alluser,setAllUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNom, setSelectedNom] = useState('');
    const [rolee, setRole] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const token = localStorage.getItem('token');
    const ListeUser= async () => {
        try{
            const response = await axios.get('https://localhost:8000/api/AllUtilisateur',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            setAllUser(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error)
        }
    }
    const Listerole = () => {
        axios.get('https://localhost:8000/api/Role', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setRole(response.data);
        });
    };
    const handleSelectMember = (member) => {
        setSelectedNom(member.idPersonne.Nom_Membre + ' ' + member.idPersonne.Prenom_Membre);
        setSelectedId(member.id);
        setSelectedEmail(member.username);
        setShowModal(true);
        Listerole();
    };
    const handleRoleChange = (roleId) => {
        setSelectedRoles((prevRoles) => {
            if (prevRoles.includes(roleId)) {
                return prevRoles.filter(id => id !== roleId);
            } else {
                return [...prevRoles, roleId];
            }
        });
    };

    const attribution =  async (e) => {
        e.preventDefault();
        console.log(selectedId,selectedRoles);
        try{
            await axios.post(`https://localhost:8000/api/AttributionRole/${selectedId}`,{roles:selectedRoles,token:token},
                {
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                }
            );
            toast.success("Role Attribuer!");
            setShowModal(false);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        ListeUser();
    },[])
    return(
        <>
             <div className="card">
                <ToastContainer />
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
                                    <th>compte</th>
                                    <th>roles</th>
                                    <th>Cliquer pour choisir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Alluser) ? (
                                    Alluser.map(Alluser => (
                                        <tr key={Alluser.id}>
                                            <td>{Alluser.idPersonne.Nom_Membre}</td>
                                            <td>{Alluser.idPersonne.Prenom_Membre}</td>
                                            <td>{Alluser.username}</td>
                                            <td>{Alluser.roles}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleSelectMember(Alluser)}
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
                        <form onSubmit={attribution}>
                            <div className="row">
                                <h2>Information pour se connecter</h2>
                                <br /><br /><br />
                                <div className="col-md-6 px-1">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" value={selectedEmail} readOnly />
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
                            <button type="submit" className='btn btn-success'>Valider</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Modification;