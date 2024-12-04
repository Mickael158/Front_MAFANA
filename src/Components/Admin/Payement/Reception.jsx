import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as XLSX from 'xlsx';

const Reception = () => {
  const [Reception, setReception] = useState('');
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [DateDebut, setDateDebut] = useState(null);
    const [DateFin, setDateFin] = useState(null);
    
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
    const recherche =  (event) => {
        if(event){
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/rechercheDonnation',{
            data: Data,
            dateDebut: DateDebut,
            dateFin: DateFin
        },{
            headers:
            {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          })
           .then(response => {
                setReception(response.data.data);
            })
           .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    }
    useEffect(() => {
        recherche();

      } , []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tous les dons financiés</h4>
                    <div className="col-md-8 d-flex">
                            <button className="btn btn-primary btn-block" style={{ width: '10%' , height: '10%'  }} type="button" onClick={exportToExcel}>
                                <i className="now-ui-icons arrows-1_cloud-upload-94" style={{ fontSize: '24px' }}></i>
                            </button>
                        </div>
                </div>
                <div className="card-body">
                <form onSubmit={recherche}>
                    <div className="row">
                        <div className="col-3">
                            <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className="col-3">
                            <input type="date" className="form-control" placeholder="rechercher..." value={DateDebut} onChange={(e) => setDateDebut(e.target.value)}></input>
                        </div>
                        <div className="col-3">
                            <input type="date" className="form-control" placeholder="rechercher..." value={DateFin} onChange={(e) => setDateFin(e.target.value)}></input>
                        </div>
                        <div className="col-3">
                            <Button type="submit" className="btn btn-sm btn-success" style={{"width" : "40%" , "height" : "95%" , "marginTop" : "-0.3%"}}><i className="now-ui-icons ui-1_zoom-bold"></i>   Rechercher</Button>
                        </div>
                    </div>
                    
                </form>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du Donateur</th>
                                    <th className="text-left">Membre ou pas</th>
                                    <th className="text-left">Date de paiement</th>
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
                                            {reception.status ? (
                                                <i className="now-ui-icons ui-1_check" style={{ color: 'green' }} ></i>
                                            ) : (
                                                <i className="now-ui-icons ui-1_simple-remove" style={{ color: 'red' }} ></i>
                                            )}
                                        </td>
                                        <td className="text-left">
                                        {new Date(reception.dateDonationFinancier).toISOString().split('T')[0]}
                                            
                                        </td>
                                        <td className="text-right">
                                            {Number(reception.montant).toLocaleString()} Ar
                                        </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Pas de don financié</td></tr>) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Reception
