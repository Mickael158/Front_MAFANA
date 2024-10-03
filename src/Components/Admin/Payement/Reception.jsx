import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

const Reception = () => {
  const [Reception, setReception] = useState('');
    const token = localStorage.getItem("token");
    const listeAll_Reception = () => {
        axios.get('https://127.0.0.1:8000/api/SelectAllDonnationFinancier',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setReception(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };
    const exportToExcel = () => {
        // Aplatir les données des reçus pour l'exportation
        const dataToExport = Reception.map(reception => ({
            'Nom Donnateur': reception.nomDonationFinancier,
            'Montant': reception.Montant,
            'Date de payement': new Date(reception.dateDonationFinancier).toISOString().split('T')[0]
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
        listeAll_Reception();

      } , []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tous les don financier</h4>
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
                                    <th className="text-left">Nom Donnateur</th>
                                    <th className="text-left">Date de payement</th>
                                    <th className="text-right">Montant</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Reception) ? (
                            Reception.map(reception => (
                                <tr key={reception.id}>
                                        <td className="text-left">
                                            {reception.nomDonationFinancier}
                                        </td>
                                        <td className="text-left">
                                        {new Date(reception.dateDonationFinancier).toISOString().split('T')[0]}
                                            
                                        </td>
                                        <td className="text-right">
                                            {reception.Montant}
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

export default Reception
