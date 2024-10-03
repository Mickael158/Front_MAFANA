import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionMateriel = () => 
  {
  const [nomMateriel, setNomMateriel] = useState('');
  const [IdCategorie, setIdCategorie] = useState('');
  const [Categorie, setCategorie] = useState('');
  const token = localStorage.getItem("token");
  const insertionMateriel = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/Materiel',{ Nom_Materiel : nomMateriel,Id_Categorie_Materiel: IdCategorie },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Materiel inserer !");
      setNomMateriel('');
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Erreur d'insrtion");
    }
  }

  const ListeCategorie = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/Categorie',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      });
      setCategorie(response.data);
    } catch (error) {
      console.error('Erreur de chargement des Catgorie', error);
    }
  };

  useEffect(() => {
    ListeCategorie();
  });
  return (
    
    <div>
    <ToastContainer />  
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion Materiel</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionMateriel}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du Materiele</label>
                        <input type="text" className="form-control"  placeholder="Nom du Materiel" value={nomMateriel} onChange={(e) => setNomMateriel(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-5 pr-1">
                  <div className="form-group">
                    <label>Nom du Categorie correspondant</label>
                    <select 
                      className="form-control" 
                      value={IdCategorie} 
                      onChange={(e) => setIdCategorie(e.target.value)}
                    >
                      {Array.isArray(Categorie) ? (
                        Categorie.map((Categories) => (
                          <option className="form-control text-center" key={Categories.id} value={Categories.id}>
                            {Categories.nomCategorie}
                          </option>
                        ))
                      ) : (
                        <option className="form-control">Null</option>
                      )}
                    </select>
                  </div>
                </div>
                    <div className="col-md-3 pr-1 mt-3">
                      <button className="btn btn-success btn-block" type="submit">Valider</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
    </div>
  )
}

export default InsertionMateriel
