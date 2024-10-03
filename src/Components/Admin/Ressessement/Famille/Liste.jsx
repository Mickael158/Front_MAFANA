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
          console.log(Mariage);
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
                      <th>
                        Mari
                      </th>
                      <th>
                        Femme
                      </th>
                      <th>
                        Nombre d enfant
                      </th>
                    </thead>
                    <tbody>
                    {Mariage.length > 0 ? (
                        Mariage.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.mariage.idMari.Nom_Membre} {item.mariage.idMari.Prenom_Membre}
                                </td>
                                <td>
                                    {item.mariage.idMarie.Nom_Membre} {item.mariage.idMarie.Prenom_Membre}
                                </td>
                                <td>{item.enfant}</td>
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