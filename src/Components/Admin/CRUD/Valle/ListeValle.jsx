import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeValle = () => {
  const [valle,setValle] = useState('');
  const token = localStorage.getItem('token');
  const ListeValle = () => {
    axios.get('https://localhost:8000/api/valle',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setValle(response.data)
    });
  };  
 

  const SuppressionValle = async (event , id) =>  
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/valle/supprimer/${id}`,
        {
          headers:
          {
            'Authorization': `Bearer ${token}`
          },
        }
      );
        toast.success("Supprimer avec succes!");
        ListeValle();

    }
    catch(error)
    {
        toast.error("Erreur de suppresion");
      console.error('Erreur de suppression' , error)
    }
  }
  useEffect(() => {
    ListeValle(); 
    SuppressionValle();
  }, []);

  return (
    <>
        <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les Vallees</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th>
                        Nom du Vallee
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(valle) ? (
                            valle.map(vallee => (
                                <tr key={vallee.id} className="text-center">
                                        <td>
                                            {vallee.nomVallee}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block " style={{'width': '50%'}} onClick={(e) => SuppressionValle(e, vallee.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeValle;
