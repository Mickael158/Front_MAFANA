import axios from "axios";
import { useEffect, useState } from "react";

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
    useEffect(() => {
        listeAll_Acquisition();

      }, []);
  return (
    <>
      <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Membre Responsable</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th>Nom Donnateur</th>
                                    <th>Materiel</th>
                                    <th>Nombre</th>
                                    <th>Date de payement</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Acquisition) ? (
                            Acquisition.map(acquisition => (
                                <tr key={acquisition.id}>
                                        <td>
                                            {acquisition.nomDonnateurMateriel}
                                        </td>
                                        <td>
                                            {acquisition.idMateriel.NomMateriel}
                                        </td>
                                        <td>
                                            {acquisition.Nombre}
                                        </td>
                                        <td>
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
