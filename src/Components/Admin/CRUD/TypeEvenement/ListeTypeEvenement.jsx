import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeTypeEvenement = () => {
    const [typeEvenement,setTypeEvenement] = useState('');
    const token = localStorage.getItem("token");
  const ListetypeEvenement = () => {
    axios.get('https://localhost:8000/api/TypeEvenement',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setTypeEvenement(response.data)
    });
  };  
  
  const SuppressiontypeEvenement = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/TypeEvenement/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      toast.success("Type evenement supprimer!");
      ListetypeEvenement();
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppresion");
    }
  }
  useEffect(() => {
    ListetypeEvenement(); 
  });
  return (
    <>
    <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les Types d'évènement</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th className="text-left">
                        Nom du type d'Evènement
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(typeEvenement) ? (
                            typeEvenement.map(typeEvenemente => (
                                <tr key={typeEvenemente.id} className="text-center">
                                        <td className="text-left">
                                            {typeEvenemente.nomTypeEvenement}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block " style={{'width': '25%'}} onClick={(e) => SuppressiontypeEvenement(e, typeEvenemente.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeTypeEvenement
