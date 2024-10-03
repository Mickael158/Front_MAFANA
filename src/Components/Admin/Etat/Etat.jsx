import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

const Etat = () => {
    const [Membre, setMembre] = useState([]);
    const token = localStorage.getItem("token");

    // Fonction pour récupérer les membres depuis l'API
    const ListeMembre = () => {
        axios.get('https://localhost:8000/api/Etat', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setMembre(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des membres:", error);
        });
    };

    // Fonction pour exporter les membres en fichier Excel
    const exportToExcel = () => {
        // Aplatir les données des membres pour faciliter l'exportation
        const dataToExport = Membre.map(member => ({
            Nom: member.personnMembre.nomMembre,
            Prénom: member.personnMembre.prenomMembre,
            Téléphone: member.personnMembre.Telephone,
            Village: member.personnMembre.idVillage.Nom_Village,
            Vallée: member.personnMembre.idVillage.Id_Vallee.Nom_Vallee,
            Pourcentage: member.pourcentage
        }));

        // Créer une feuille de calcul à partir des données aplaties
        const ws = XLSX.utils.json_to_sheet(dataToExport);

        // Créer un classeur
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Membres');

        // Exporter le fichier Excel
        XLSX.writeFile(wb, 'etat_membres.xlsx');
    };

    // Charger la liste des membres au montage du composant
    useEffect(() => {
        ListeMembre();
    } ,[]);  // Le tableau vide [] assure que cette fonction est appelée une seule fois au chargement du composant

    return (
        <>
            <div className="panel-header panel-header-sm"></div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-4">
                            <h4 className="card-title">Etat Membres</h4>
                        </div>
                        <div className="col-md-8 d-flex">
                            <button className="btn btn-warning btn-block" style={{ width: '50%' }} type="button" onClick={exportToExcel}>
                                Exporter en Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Etat de tous les membres</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-dark text-center">
                                        <tr>
                                            <th className="text-left">Nom</th>
                                            <th className="text-left">Tel</th>
                                            <th className="text-left">Village</th>
                                            <th className="text-left">Vallée</th>
                                            <th className="text-right">Cotisation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(Membre) && Membre.length > 0 ? (
                                            Membre.map(member => {
                                                // Déterminer la couleur basée sur le pourcentage
                                                let color = '';
                                                if (member.pourcentage <= 25) {
                                                    color = 'red';
                                                } else if (member.pourcentage <= 50) {
                                                    color = 'orange';
                                                } else if (member.pourcentage <= 75) {
                                                    color = 'yellow';
                                                } else if (member.pourcentage <= 100) {
                                                    color = 'green';
                                                }
                                                return (
                                                    <tr key={member.personnMembre.id} className="text-center">
                                                        <td className="text-left">{member.personnMembre.nomMembre} {member.personnMembre.prenomMembre}</td>
                                                        <td  className="text-left">{member.personnMembre.Telephone}</td>
                                                        <td  className="text-left">{member.personnMembre.idVillage.Nom_Village}</td>
                                                        <td  className="text-left">{member.personnMembre.idVillage.Id_Vallee.Nom_Vallee}</td>
                                                        <td className="text-right">
                                                            <button className="btn" style={{ backgroundColor: color }}>
                                                                {member.pourcentage}%
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr><td colSpan="5">Aucun membre trouvé</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Etat;
