import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeVillage = () => {
    const [village,setVillage] = useState('');
    const token = localStorage.getItem("token");
  const ListeVillage = () => {
    axios.get('https://localhost:8000/api/village',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setVillage(response.data)
    });
  };  
  


  const SuppressionVillage = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/village/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      ListeVillage();
      toast.success("Village Supprimer !");
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppresion du Village !");
    }
  }
  useEffect(() => {
    ListeVillage(); 
    SuppressionVillage();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les villages</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th>
                        Nom du Villagee
                      </th>
                      <th>
                        Nom du Valle
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(village) ? (
                            village.map(villagee => (
                                <tr key={villagee.id} className="text-center">
                                        <td>
                                            {villagee.nomVillage}
                                        </td>
                                        <td>
                                            {villagee.idVallee.Nom_Vallee}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '50%'}} onClick={(e) => SuppressionVillage(e, villagee.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeVillage
