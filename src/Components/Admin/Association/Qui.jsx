import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Qui = () => {
    const [Personne, setPersonne] = useState([]);
    const [Profession, setProfession] = useState([]);
    const token = localStorage.getItem('token');
    const [IdPersonne, setIdPersonne] = useState(0);
    const [IdProfession, setIdProfession] = useState(0);
    const [Image, setImage] = useState(null);
    const [DateDebut, setDateDebut] = useState('');
    const [Mondat, setMondat] = useState(0);
    const [Last, setLast] = useState(null);

    const ListePersonne = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/Personne', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPersonne(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const ListeProfession = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/Profession', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProfession(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const upload = async () => {
        if (!Image) {
            console.warn("Aucune image sélectionnée");
            return;
        }
        try {
            await axios.post('https://localhost:8000/api/upload', { image: Image }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const Insertion = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            await axios.post('https://localhost:8000/api/Qui', {
                mondat: Mondat,
                personne_id: IdPersonne,
                profession_id: IdProfession,
                DateDebut: DateDebut
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            await upload();
            await LastDirigeant();
            toast.success('Inséré avec succès');
        } catch (error) {
            console.error(error);
            toast.error('Une erreur est survenue');
        }
    }

    const LastDirigeant = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/last', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setLast(response.data.message);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        ListePersonne();
        ListeProfession();
        LastDirigeant();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="card">
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="title">Ajouter le dirigeant de l'Association</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={Insertion}>
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12 px-1">
                                            <div className="form-group">
                                                <label>Dirigeant</label>
                                                <select
                                                    className="form-control"
                                                    value={IdPersonne}
                                                    onChange={(e) => setIdPersonne(e.target.value)}
                                                >
                                                    <option className="text-center">Choisir la Personne</option>
                                                    {Array.isArray(Personne) && Personne.length > 0 ? (
                                                        Personne.map((p) => (
                                                            <option className="form-control text-center" key={p.id} value={p.id}>
                                                                {p.nomMembre} {p.prenomMembre}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option className="form-control">Aucune personne disponible</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-xs-12 px-1">
                                            <div className="form-group">
                                                <label>Date début de son mandat</label>
                                                <input type="date" className="form-control" placeholder="Date début de mandat" value={DateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-xs-12 px-1">
                                            <div className="form-group">
                                                <label>Durée du mandat en année</label>
                                                <input type="number" className="form-control" placeholder="Durée du mandat en année" value={Mondat} onChange={(e) => setMondat(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-xs-12 px-1">
                                            <div className="form-group">
                                                <label>Profession</label>
                                                <select
                                                    className="form-control"
                                                    value={IdProfession}
                                                    onChange={(e) => setIdProfession(e.target.value)}
                                                >
                                                    <option className="text-center">Choisir sa Profession</option>
                                                    {Array.isArray(Profession) && Profession.length > 0 ? (
                                                        Profession.map((pr) => (
                                                            <option className="form-control text-center" key={pr.id} value={pr.id}>
                                                                {pr.nomProfession}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option className="form-control">Aucune profession disponible</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xs-12 px-1">
                                            <div className="form-group">
                                                <label>Photo de la personne</label>
                                                <input 
                                                    type="file" 
                                                    onChange={handleImageChange} 
                                                    />
                                                <input type="file" multiple className="form-control" style={{ height: '20px', border: '1px solid black !important' }} onChange={handleImageChange} />
                                            </div>
                                        </div>
                                        <input 
                                            type="file" 
                                            onChange={handleImageChange} 
                                            />
                                    </div>
                                    
                                    <button type='submit' className='btn btn-success'>Valider</button>
                                </form>
                                <div className="col-lg-12 mt-2">
                                    <h6>Personne dirigeant actuel</h6>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-dark text-center">
                                                <tr>
                                                    <th className="text-left">Nom</th>
                                                    <th className="text-left">Prénom</th>
                                                    <th className="text-left">Début du mandat</th>
                                                    <th className="text-left">Fin du mandat</th>
                                                    <th className="text-left">Profession</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Last ? (
                                                    <tr key={Last.id} className="text-center">
                                                        <td className="text-left">
                                                            {Last.personneId.nomMembre}
                                                        </td>
                                                        <td className="text-left">
                                                            {Last.personneId.prenomMembre}
                                                        </td>
                                                        <td className="text-left">
                                                            {new Date(Last.DateDebutMondat).toLocaleDateString('fr-CA')}
                                                        </td>
                                                        <td className="text-left">
                                                            {new Date(Last.DateFinMondat).toLocaleDateString('fr-CA')}
                                                        </td>
                                                        <td className="text-left">
                                                            {Last.professionId.nomProfession}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr><td colSpan="5">Aucun dirigeant disponible pour le moment</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Qui;
