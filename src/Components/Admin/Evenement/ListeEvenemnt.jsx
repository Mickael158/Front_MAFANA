import {useState , useEffect} from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeEvenemnt = () => {
    const [Evenement,setEvenement] = useState('');
    const token = localStorage.getItem("token");
    console.log(token);
    const ListeEvenement = () => {
      axios.get('https://localhost:8000/api/Evenement',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
          setEvenement(response.data)
      });
    };  
    useEffect(() => {
      ListeEvenement();
      SuppressionEvenement();
    }, []);
  
  
    const SuppressionEvenement = async (event , id) => 
      {
        event.preventDefault();
        try
        {
          const response = await axios.delete(
                `https://127.0.0.1:8000/api/Evenement/supprimer/${id}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
          ListeEvenement();
          toast.success(response.data.message);
        console.log('Evenement Supprimer');
  
      }
      catch(error)
      {
          toast.error("erreur de suppresion!");
        console.error('Erreur de suppression' , error)
      }
    }
  return (
    <>
    <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les  Evenement</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th>
                        Date debut
                      </th>
                      <th>
                      Date fin
                      </th>
                      <th>
                        Lieu
                      </th>
                      <th>
                        Type d'evenement
                      </th>
                      <th>
                        Description
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Evenement) ? (
                            Evenement.map(Evenement => (
                                <tr key={Evenement.id}>
                                        <td>
                                        {new Date(Evenement.dateEvenement).toISOString().split('T')[0]}
                                            
                                        </td>
                                        <td>
                                        {new Date(Evenement.dateFinEvenement).toISOString().split('T')[0]}
                                        </td>
                                        <td>
                                            {Evenement.lieuEvenement}
                                        </td>
                                        <td>
                                            {Evenement.idTypeEvenement.Nom_Type_Evenement}
                                        </td>
                                        <td>
                                            {Evenement.descriptionEvenement}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger btn-block" style={{'width': '50%'}} onClick={(e) => SuppressionEvenement(e, Evenement.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeEvenemnt
