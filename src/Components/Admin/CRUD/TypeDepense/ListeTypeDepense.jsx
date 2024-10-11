import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeTypeDepense = () => {
  const [TypeDepense,setTypeDepense] = useState('');
  const token = localStorage.getItem("token");
  const ListeTypeDepense = () => {
    axios.get('https://localhost:8000/api/TypeDepense',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setTypeDepense(response.data)
    });
  };  
  const SuppressionTypeDepense = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/TypeDepense/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Suppression effectuer!");
      ListeTypeDepense();
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppression");
    }
  }
  useEffect(() => {
    ListeTypeDepense(); 
  });
  return (
    <>
      <div className="card">
        <ToastContainer />
              <div className="card-header">
                <h4 className="card-title">Tous les Types de dépenses</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th className="text-left">
                        Nom de la Type de dépense
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(TypeDepense) ? (
                            TypeDepense.map(TypeDepense => (
                                <tr key={TypeDepense.id} className="text-center">
                                        <td className="text-left">
                                            {TypeDepense.motifDepense}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '25%'}} onClick={(e) => SuppressionTypeDepense(e, TypeDepense.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeTypeDepense
