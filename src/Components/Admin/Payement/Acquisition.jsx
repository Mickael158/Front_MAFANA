import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

const Acquisition = () => {
    const [Acquisition, setAcquisition] = useState('');
    const token = localStorage.getItem("token");
    const listeAll_Acquisition = () => {
        axios.get('https://127.0.0.1:8000/api/SelectAllDonnationMaterile',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setAcquisition(response.data);
                console.log("materiel:",response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };
    const exportToExcel = () => {
        // Aplatir les données des reçus pour l'exportation
        const dataToExport = Acquisition.map(acquisition => ({
            'Nom Donnateur': acquisition.nomDonnateurMateriel,
            'Materiel': acquisition.idMateriel.NomMateriel,
            'Nombre': acquisition.Nombre,
            'Date de payement': new Date(acquisition.dateAcquisition).toISOString().split('T')[0]
        }));

        // Créer une feuille de travail à partir des données aplaties
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        // Créer un classeur
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Recu');

        // Exporter le fichier Excel
        XLSX.writeFile(wb, 'acquisition_materiel.xlsx');
    };
    useEffect(() => {
        listeAll_Acquisition();

      } , []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tous les don materiel</h4>
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
                                    <th className="text-left">Materiel</th>
                                    <th className="text-left">Nombre</th>
                                    <th className="text-left">Date de payement</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Acquisition) ? (
                            Acquisition.map(acquisition => (
                                <tr key={acquisition.id}>
                                        <td className="text-left">
                                            {acquisition.nomDonnateurMateriel}
                                        </td >
                                        <td className="text-left">
                                            {acquisition.idMateriel.NomMateriel}
                                        </td>
                                        <td className="text-left">
                                            {acquisition.Nombre}
                                        </td>
                                        <td className="text-left">
                                        {new Date(acquisition.dateAcquisition).toISOString().split('T')[0]}
                                            
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

export default Acquisition
