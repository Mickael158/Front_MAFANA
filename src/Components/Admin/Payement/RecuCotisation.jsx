/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as XLSX from 'xlsx';

const RecuCotisation = () => {
    const [Recu, setRecu] = useState('');
    const [Data, setData] = useState(null);
    const [DateDebut, setDateDebut] = useState(null);
    const [DateFin, setDateFin] = useState(null);
    const token = localStorage.getItem("token");
    
    const [Village,setVillage] = useState('');
    const [IdVillage,setIdVillage] = useState(null);
    const ListeVillage = () => {
        axios.get('https://localhost:8000/api/village',{
        headers: 
        {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => {
            setVillage(response.data)
        });
    };  
    const exportToExcel = () => {
        // Aplatir les données des reçus pour l'exportation
        const dataToExport = Recu.map(recu => ({
            'Nom du Membre': recu.nom_membre,
            'Prénom': recu.prenom_membre,
            'Téléphone': recu.telephone,
            'Email': recu.email,
            'Mois à payer': new Date(recu.date_payer).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long'
            }),
            'Date de paiement': new Date(recu.date_de_payement).toLocaleDateString('fr-FR', {
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

    const recherche =  (event) => {
        if(event){
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/rechercheCotisation',{
            data: Data,
            village: IdVillage,
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
                setRecu(response.data.data);
            })
           .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    }
    useEffect(() => {
        recherche();
        ListeVillage();
      } , []);
  return (
    <>
      <div className="card">
        
                <div className="card-header">
                    <h4 className="card-title">Tous les paiements</h4>
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
                        <div className="col-2">
                        <select className="form-control" value={ IdVillage } onChange={(e) => setIdVillage(e.target.value)}>
                        <option>Choisir un Tragnobe</option>
                        {Array.isArray(Village) ? (
                            Village.map(Village => (
                                <option key={Village.id} value={Village.id} className="form-control">
                                  {Village.nomVillage}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                        </div>
                        <div className="col-2">
                            <input type="date" className="form-control" placeholder="rechercher..." value={DateDebut} onChange={(e) => setDateDebut(e.target.value)}></input>
                        </div>
                        <div className="col-2">
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
                                    <th className="text-left">Nom du Membre</th>
                                    <th className="text-left">Prénom</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-left">Mois de cotisation</th>
                                    <th className="text-left">Date de paiement</th>
                                    <th className="text-right">Montant Payé</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Recu) ? (
                            Recu.map(recu => (
                                <tr key={recu.id}>
                                        <td className="text-left">
                                            {recu.nom_membre}
                                        </td>
                                        <td className="text-left">
                                            {recu.prenom_membre}
                                        </td>
                                        <td className="text-left">
                                            {recu.telephone}
                                        </td>
                                        <td className="text-left">
                                            {recu.email}
                                        </td>
                                        <td className="text-left">
                                        {new Date(recu.date_payer).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                        </td>
                                        <td className="text-left">
                                        
                                        {new Date(recu.date_de_payement).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })} 
                                        </td>
                                        <td className="text-right">
                                            {Number(recu.montant_cotisation_total_payer).toLocaleString()} Ar
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
