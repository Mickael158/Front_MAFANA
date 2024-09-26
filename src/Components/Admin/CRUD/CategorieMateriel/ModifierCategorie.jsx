import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierCategorie = () => {
  const [Categories, setCategories] = useState([]);
  const [CategorieModif, setCategorieModif] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const token = localStorage.getItem("token");

  const ListeCategorie = () => {
    axios.get('https://localhost:8000/api/Categorie',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    ListeCategorie();
  }, []);

  const ModificationCategorie = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://127.0.0.1:8000/api/Categorie/${idCategorie}`, { Nom_Categorie: CategorieModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
        toast.success("modification effectuer!");
      console.log('Categorie modifiée', response.data);
    } catch (error) {
        toast.error("erreur lors de la modification");
      console.error('Erreur de modification', error);
    }
  };

  return (
    <div>
        <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Categorie</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationCategorie}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Categorie à modifier</label>
                  <select className="form-control" onChange={(e) => setIdCategorie(e.target.value)}>
                    {Array.isArray(Categories) ? (
                      Categories.map(Categorie => (
                        <option className="form-control text-center" key={Categorie.id} value={Categorie.id}>
                          {Categorie.nomCategorie}
                        </option>
                      ))
                    ) : (
                      <option className="form-control">Null</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Nom de la Categorie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la Categorie"
                    value={CategorieModif}
                    onChange={(e) => setCategorieModif(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3 pr-1 mt-3">
                <button type="submit" className="btn btn-success btn-block">
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierCategorie;
