import axios from "axios";
import { useEffect, useState } from "react";

const Liste = () => {
    const [Mariage,setMariage] = useState('');
    const token = localStorage.getItem("token");
    const ListeMariage = () => {
      axios.get('https://localhost:8000/api/Mariage',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
          setMariage(response.data)
      });
    };  
    useEffect(() => {
      ListeMariage(); 
    } , []);
    return (
        <>
            <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th className="text-left">
                        Le Mari
                      </th>
                      <th className="text-left">
                        La Femme
                      </th>
                      <th className="text-right">
                        Nombre d'enfant
                      </th>
                    </thead>
                    <tbody>
                    {Mariage.length > 0 ? (
                        Mariage.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">
                                    {item.mariage.idMari.Nom_Membre} {item.mariage.idMari.Prenom_Membre}
                                </td>
                                <td className="text-left">
                                    {item.mariage.idMarie.Nom_Membre} {item.mariage.idMarie.Prenom_Membre}
                                </td>
                                <td className="text-right">{item.enfant}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3">Aucun mariage trouvé</td></tr>
                    )}
                </tbody>
                  </table>
            </div>
        </>
    )
}

export default Liste