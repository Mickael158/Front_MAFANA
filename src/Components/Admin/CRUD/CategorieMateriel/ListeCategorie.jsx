import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeCategorie = () => {
  const [Categorie,setCategorie] = useState('');
  const token = localStorage.getItem("token");
  const ListeCategorie = () => {
    axios.get('https://localhost:8000/api/Categories',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setCategorie(response.data)
    });
  };  

  const SuppressionCategorie = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        await axios.delete(
              `https://127.0.0.1:8000/api/Categorie/supprimer/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
            );
        ListeCategorie();
        toast.success("Suppression effectuer!");

    }
    catch(error)
    {
        toast.error("erreur de suppresion!");
      console.error('Erreur de suppression' , error)
    }
  }
  useEffect(() => {
    ListeCategorie();
  });
  return (
    <>
        <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les  Catégories Matériels</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th className="text-left">
                        Nom du Categorie
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Categorie) ? (
                            Categorie.map(Categorie => (
                                <tr key={Categorie.id} className="text-center">
                                        <td className="text-left">
                                            {Categorie.nomCategorie}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '25%'}} onClick={(e) => SuppressionCategorie(e, Categorie.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeCategorie
