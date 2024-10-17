import axios from "axios";
import { useEffect, useState } from "react";

const ArchiveFinancier = () => {
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [Montant, setMontant] = useState(null);
    const [DateDebut, setDateDebut] = useState(null);
    const [DateFin, setDateFin] = useState(null);
    const [DonnationFinancier, setDonnationFinancier] = useState([]);

    const ListeDonnationFinancier = (event) => {
        if (event) {
            event.preventDefault();
        }

        axios.post('https://localhost:8000/api/rechercheDemandeFinancier', {
            data: Data,
            montant: Montant,
            dateDebut: DateDebut,
            dateFin: DateFin
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            // Accéder aux données correctes
            setDonnationFinancier(response.data.data);
            console.log(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des DonnationFinanciers:", error);
        });
    };

    // Appel initial pour récupérer les données
    useEffect(() => {
        ListeDonnationFinancier();
    }, []); 

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Liste des Demandes Financier deja valider</h4>
                </div>
                <div className="card-body">
                     <form onSubmit={ListeDonnationFinancier}>
                        <div className="row">
                            <div className="col-3">
                                <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)} />
                            </div>
                            <div className="col-3">
                                <input className="form-control" placeholder="rechercher..." value={Montant} onChange={(e) => setMontant(e.target.value)} />
                            </div>
                            <div className="col-3">
                                <input type="date" className="form-control" value={DateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                            </div>
                            <div className="col-3">
                                <input type="date" className="form-control" value={DateFin} onChange={(e) => setDateFin(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-sm btn-warning">Rechercher</button>
                    </form>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom</th>
                                    <th className="text-left">Motif</th>
                                    <th className="text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(DonnationFinancier) && DonnationFinancier.length > 0 ? (
                                    DonnationFinancier.map(donnationFinancier => (
                                        <tr key={donnationFinancier.id_demande_financier_id}>
                                            <td className="text-left">{donnationFinancier.nom_membre} {donnationFinancier.prenom_membre}</td>
                                            <td className="text-left">{donnationFinancier.motif}</td>
                                            <td className="text-right">{donnationFinancier.montant}Ar</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Aucune demande trouvée</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArchiveFinancier;