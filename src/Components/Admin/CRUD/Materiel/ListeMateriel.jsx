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

  const SuppressionMateriel = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/Materiel/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
     toast.success("Supprimer avec success!");
     ListeMateriel();
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppression!");
    }
  }
  useEffect(() => {
    ListeMateriel(); 
  });
  return (
    <>
      <div className="card">
        <ToastContainer />
              <div className="card-header">
                <h4 className="card-title">Tous les Matériels</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th className="text-left">
                        Nom du Matériel
                      </th>
                      <th className="text-left">
                        Catégorie
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Materiel) ? (
                            Materiel.map(Materiels => (
                                <tr key={Materiels.id} className="text-center">
                                        <td className="text-left">
                                            {Materiels.NomMateriel}
                                        </td>
                                        <td className="text-left">
                                            {Materiels.idCategorieMateriel.Nom_Categorie}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '25%'}} onClick={(e) => SuppressionMateriel(e, Materiels.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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
