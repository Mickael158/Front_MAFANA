import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeProfession = () => {
  const [Profession,setProfession] = useState('');
  const token = localStorage.getItem("token");
  const ListeProfession = () => {
    axios.get('https://localhost:8000/api/Profession',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setProfession(response.data)
    });
  };  

  const SuppressionProfession = async (event , id) => 
    {
      event.preventDefault();
      try
      {
        axios.delete(` https://127.0.0.1:8000/api/Profession/supprimer/${id}`,
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Profession supprimer!");
      ListeProfession();
    }
    catch(error)
    {
      console.error('Erreur de suppression' , error)
      toast.error("Erreur de suppression");
    }
  }
  useEffect(() => {
    ListeProfession(); 
  });
  return (
    <>
    <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Tous les  Professions</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark text-center">
                      <th className="text-left">
                        Nom de la Profession
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Profession) ? (
                            Profession.map(Profession => (
                                <tr key={Profession.id} className="text-center">
                                        <td className="text-left">
                                            {Profession.nomProfession}
                                        </td>
                                        <td className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-danger btn-block" style={{'width': '25%'}} onClick={(e) => SuppressionProfession(e, Profession.id)} ><i className="now-ui-icons shopping_basket"></i></button>
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

export default ListeProfession
