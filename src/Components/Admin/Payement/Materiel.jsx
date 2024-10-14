import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Materiel = () => {
    const [selectedNom, setSelectedNom] = useState('');
    const [Materiel, setMateriel] = useState([]);
    const [IdMateriel, setIdMateriel] = useState();
    const [Membre, setMembre] = useState([]);
    const [nombre, setNombre] = useState('');
    const [image, setImage] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const token = localStorage.getItem("token");

    const insertionDonnationMateriel = async (event) => {
        event.preventDefault();
        if (!IdMateriel) {
            toast.error("Le matériel est requis.");
            return; // Arrêter l'exécution si l'ID matériel est null
        }
    
        // Vérification que selectedNom ne contient que des lettres
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        if (!regex.test(selectedNom)) {
            toast.error("Le nom ne doit contenir que des lettres.");
            return; // Arrêter l'exécution si le nom contient des caractères invalides
        }
    
        // Vérification que le nombre est supérieur à 0
        if (nombre <= 0) {
            toast.error("Le nombre doit être supérieur à 0.");
            return; // Arrêter l'exécution si le nombre est invalide
        }
        try {
            await axios.post('https://127.0.0.1:8000/api/DonnationMateriel', {
                utilisateur: token,
                id_materiel_id: IdMateriel,
                nom_donnateur_materiel: selectedNom,
                nombre: nombre,
                image: image
            }, {
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            toast.success("Inséré!");
            setSelectedNom('');
            setNombre('');
            setImage('');
            setFilteredMembers([]); // Clear suggestions on successful submission
        } catch (error) {
            console.error('Erreur d\'insertion', error);
            toast.error("Erreur");
        }
    };

    const ListeMateriel = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/Materiel', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMateriel(response.data);
        } catch (error) {
            console.error('Erreur de chargement des Catgorie', error);
        }
    };

    const ListeMembre = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/PersonneIndep', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMembre(response.data);
        } catch (error) {
            console.error('Erreur de chargement des membres', error);
        }
    };

    useEffect(() => {
        ListeMateriel();
        ListeMembre();
    }, []);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setSelectedNom(value);
        if (value) {
            const filtered = Membre.filter(member =>
                `${member.nom_membre} ${member.prenom_membre}`.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredMembers(filtered);
        } else {
            setFilteredMembers([]);
        }
    };

    const handleSuggestionClick = (nom) => {
        setSelectedNom(nom);
        setFilteredMembers([]);
    };

    return (
        <>
            <div>
                <ToastContainer />
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Donation matériel</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={insertionDonnationMateriel}>
                            <div className="row mb-5">
                                <div className="col-md-3 pr-1">
                                    <div className="form-group position-relative">
                                        <label>Nom du donateur</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la Personne"
                                            value={selectedNom}
                                            onChange={handleNameChange}
                                        />
                                        {filteredMembers.length > 0 && (
                                            <ul className="suggestions-list">
                                                {filteredMembers.map((member, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(`${member.nom_membre} ${member.prenom_membre}`)}
                                                    >
                                                        {member.nom_membre} {member.prenom_membre}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Matériel</label>
                                        <select
                                            className="form-control text-center"
                                            value={IdMateriel}
                                            onChange={(e) => setIdMateriel(e.target.value)}
                                        >
                                            <option className="form-control">Choisir un matériel</option>
                                            {Array.isArray(Materiel) ? (
                                                Materiel.map((m) => (
                                                    <option key={m.id} value={m.id}>
                                                        {m.NomMateriel}
                                                    </option>
                                                ))
                                            ) : (
                                                <option className="form-control">Null</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1 mt-3">
                                    <button className="btn btn-success btn-block" type="submit">
                                        Donner
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .suggestions-list {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        max-height: 150px;
                        overflow-y: auto;
                        position: absolute;
                        background: white;
                        z-index: 1000;
                        width: calc(100% - 20px); /* Match the width of the input */
                    }
                    .suggestions-list li {
                        padding: 10px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    .suggestions-list li:hover {
                        background-color: #f1f1f1;
                    }
                `}
            </style>
        </>
    );
}

export default Materiel;