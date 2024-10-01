import axios from "axios";
import { useEffect, useState } from "react";

const Etat = () => {
    const [Membre, setMembre] = useState([]);
    const token = localStorage.getItem("token");
    console.log(token);
    const ListeMembre = () => {
        axios.get('https://localhost:8000/api/Etat',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setMembre(response.data);
        });
    };
    useEffect(() => {
        ListeMembre(); 
        console.log(Membre);
    }, []);
  return (
    <>
      <div className="panel-header panel-header-sm">
      </div>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Etat Membres</h4></div>
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
                                    <th>Nom </th>
                                    <th>Tel </th>
                                    <th>Village</th>
                                    <th>Vallee</th>
                                    <th>Cotisation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
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
                                                <td>{member.personnMembre.nomMembre} {member.personnMembre.prenomMembre}</td>
                                                <td>{member.personnMembre.Telephone}</td>
                                                <td>{member.personnMembre.idVillage.Nom_Village}</td>
                                                <td>{member.personnMembre.idVillage.Id_Vallee.Nom_Vallee}</td>
                                                <td> <button className="btn" style={{ backgroundColor: color }}>{member.pourcentage}%</button> </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
              </div>
            </div>
    </>
  )
}

export default Etat
