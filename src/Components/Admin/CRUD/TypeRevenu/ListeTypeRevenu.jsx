import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeTypeRevenu = () => {
  const [typeRevenu,setTypeRevenu] = useState('');
  const token = localStorage.getItem("token");
  const ListetypeRevenu = () => {
    axios.get('https://localhost:8000/api/TypeRevenu',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setTypeRevenu(response.data)
    });
  };  
  useEffect(() => {
    ListetypeRevenu(); 
  }, []);


  const SuppressiontypeRevenu = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.post(` https://127.0.0.1:8000/api/TypeRevenu/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Type revenu supprimer!");

    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppression!");
    }
  }
  return (
    <>
      <div className="card">
        <ToastContainer />
              <div className="card-header">
                <h4 className="card-title">Tous les type de revenu</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th>
                        Nom du typeRevenue
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(typeRevenu) ? (
                            typeRevenu.map(typeRevenue => (
                                <tr key={typeRevenue.id} className="text-center">
                                        <td>
                                            {typeRevenue.motifRevenu}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block " style={{'width': '50%'}} onClick={(e) => SuppressiontypeRevenu(e, typeRevenue.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeTypeRevenu
