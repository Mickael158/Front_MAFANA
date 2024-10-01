import axios from "axios";
import { useEffect, useState } from "react";

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
                console.log(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };
    useEffect(() => {
        listeAll_Reception();

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
                                    <th>Montant</th>
                                    <th>Date de payement</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Reception) ? (
                            Reception.map(reception => (
                                <tr key={reception.id}>
                                        <td>
                                            {reception.nomDonationFinancier}
                                        </td>
                                        <td>
                                            {reception.Montant}
                                        </td>
                                        <td>
                                        {new Date(reception.dateDonationFinancier).toISOString().split('T')[0]}
                                            
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
