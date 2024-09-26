import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ListeRole = () => {
    const [rolee,setRole] = useState('');
    const token = localStorage.getItem("token");
  const Listerole = () => {
    axios.get('https://localhost:8000/api/Role',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setRole(response.data)
    });
  };  
  useEffect(() => {
    Listerole(); 
  }, []);


  const SuppressionRole = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.post(` https://127.0.0.1:8000/api/Role/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("role supprimer!");
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("erreur d'insertion!");
    }
  }
  return (
    <>
    <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Simple Table</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th>
                        Nom du rolee
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(rolee) ? (
                            rolee.map(rolees => (
                                <tr key={rolees.id} className="text-center">
                                        <td>
                                            {rolees.nomRole}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block " style={{'width': '50%'}} onClick={(e) => SuppressionRole(e, rolees.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeRole
