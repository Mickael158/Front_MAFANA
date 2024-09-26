import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeMateriel = () => {
  const [Materiel,setMateriel] = useState('');
  const token = localStorage.getItem("token");
  const ListeMateriel = () => {
    axios.get('https://localhost:8000/api/Materiel',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setMateriel(response.data)
    });
  };  
  useEffect(() => {
    ListeMateriel(); 
  }, []);


  const SuppressionMateriel = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.post(` https://127.0.0.1:8000/api/Materiel/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      ListeMateriel();
     toast.success("Supprimer avec success!");
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
                <h4 className="card-title">Tous les Materiel</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th>
                        Nom du Materiel
                      </th>
                      <th>
                        Categorie
                      </th>
                      <th>
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Materiel) ? (
                            Materiel.map(Materiels => (
                                <tr key={Materiels.id} className="text-center">
                                        <td>
                                            {Materiels.NomMateriel}
                                        </td>
                                        <td>
                                            {Materiels.idCategorieMateriel.Nom_Categorie}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '50%'}} onClick={(e) => SuppressionMateriel(e, Materiels.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeMateriel
