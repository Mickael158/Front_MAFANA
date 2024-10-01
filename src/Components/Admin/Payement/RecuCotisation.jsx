import axios from "axios";
import { useEffect, useState } from "react";

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
    useEffect(() => {
        listeAll_recu();

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
                                    <th>Nom du Membre</th>
                                    <th>Prénom</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Mois a payer</th>
                                    <th>Date de payement</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(Recu) ? (
                            Recu.map(recu => (
                                <tr key={recu.id}>
                                        <td>
                                            {recu.idPersonneMembre.Nom_Membre}
                                        </td>
                                        <td>
                                            {recu.idPersonneMembre.Prenom_Membre}
                                        </td>
                                        <td>
                                            {recu.idPersonneMembre.Telephone}
                                        </td>
                                        <td>
                                            {recu.idPersonneMembre.Email}
                                        </td>
                                        <td>
                                        {new Date(recu.datePayer).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                        </td>
                                        <td>
                                        
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
