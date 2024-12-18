import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as XLSX from 'xlsx';

const Acquisition = () => {
    const [Materiel, setMateriel] = useState('');
    const [Acquisition, setAcquisition] = useState('');
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [DateDebut, setDateDebut] = useState(null);
    const [DateFin, setDateFin] = useState(null);
    const [IdMateriel,setIdMateriel] = useState(null);
    const listeAll_Materiel = () => {
        axios.get('https://127.0.0.1:8000/api/Materiel',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setMateriel(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    }; 
    
    const exportToExcel = () => {
        const dataToExport = Acquisition.map(acquisition => ({
            'Nom Donnateur': acquisition.nomDonnateurMateriel,
            'Materiel': acquisition.idMateriel.NomMateriel,
            'Nombre': acquisition.Nombre,
            'Date de payement': new Date(acquisition.dateAcquisition).toISOString().split('T')[0]
        }));
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Recu');
        XLSX.writeFile(wb, 'acquisition_materiel.xlsx');
    };
    const recherche =  (event) => {
        if(event){
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/rechercheMateriel',{
            data: Data,
            materiel: IdMateriel,
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
                setAcquisition(response.data.data);
            })
           .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    }
    useEffect(() => {
        listeAll_Materiel();
        recherche();
      } , []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tous les dons matériels</h4>
                    <div className="col-md-8 d-flex">
                            <button className="btn btn-info btn-block" style={{ width: '10%' , height: '10%'  }} type="button" onClick={exportToExcel}>
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
                        <select className="form-control" value={ IdMateriel } onChange={(e) => setIdMateriel(e.target.value)}>
                        <option>Choisir un Tragnombe</option>
                        {Array.isArray(Materiel) ? (
                            Materiel.map(materiel => (
                                <option key={materiel.id} value={materiel.id} className="form-control">
                                  {materiel.NomMateriel}
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
                                    <th className="text-left">Nom du Donateur</th>
                                    <th className="text-left">Membre ou pas</th>
                                    <th className="text-left">Tragnombe</th>
                                    <th className="text-left">Date de donation</th>
                                    <th className="text-center">Nombres</th>
                                    
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
                                            {acquisition.status ? (
                                                <i className="now-ui-icons ui-1_check" style={{ color: 'green' }} ></i>
                                            ) : (
                                                <i className="now-ui-icons ui-1_simple-remove" style={{ color: 'red' }} ></i>
                                            )}
                                        </td>
                                        <td className="text-left">
                                            {acquisition.nomMateriel}
                                        </td>
                                        <td className="text-left">
                                        {new Date(acquisition.dateAcquisition).toISOString().split('T')[0]}
                                        </td>
                                        <td className="text-center">
                                            {acquisition.nombre}
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
