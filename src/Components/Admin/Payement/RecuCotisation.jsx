/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

const RecuCotisation = () => {
    const [Recu, setRecu] = useState('');
    const token = localStorage.getItem("token");
    const listeAll_recu = () => {
        axios.get('https://127.0.0.1:8000/api/PayementCotisation',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setRecu(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };
    const exportToExcel = () => {
        // Aplatir les données des reçus pour l'exportation
        const dataToExport = Recu.map(recu => ({
            'Nom du Membre': recu.idPersonneMembre.Nom_Membre,
            'Prénom': recu.idPersonneMembre.Prenom_Membre,
            'Téléphone': recu.idPersonneMembre.Telephone,
            'Email': recu.idPersonneMembre.Email,
            'Mois à payer': new Date(recu.datePayer).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long'
            }),
            'Date de paiement': new Date(recu.dateDePayement).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long'
            })
        }));

        // Créer une feuille de travail à partir des données aplaties
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        // Créer un classeur
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Recu');

        // Exporter le fichier Excel
        XLSX.writeFile(wb, 'recu_cotisation.xlsx');
    };
    useEffect(() => {
        listeAll_recu();
      } , []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tous les payements</h4>
                    <div className="col-md-8 d-flex">
                            <button className="btn btn-warning btn-block" style={{ width: '50%' }} type="button" onClick={exportToExcel}>
                                Exporter en Excel
                            </button>
                        </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du Membre</th>
                                    <th className="text-left">Prénom</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-left">Mois a payer</th>
                                    <th className="text-left">Date de payement</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Recu) ? (
                            Recu.map(recu => (
                                <tr key={recu.id}>
                                        <td className="text-left">
                                            {recu.idPersonneMembre.Nom_Membre}
                                        </td>
                                        <td className="text-left">
                                            {recu.idPersonneMembre.Prenom_Membre}
                                        </td>
                                        <td className="text-left">
                                            {recu.idPersonneMembre.Telephone}
                                        </td>
                                        <td className="text-left">
                                            {recu.idPersonneMembre.Email}
                                        </td>
                                        <td className="text-left">
                                        {new Date(recu.datePayer).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                        </td>
                                        <td className="text-left">
                                        
                                        {new Date(recu.dateDePayement).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })} 
                                        </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
  )
}

export default RecuCotisation
