import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionCategorie = () => 
  {
  const [nomCategorie, setNomCategorie] = useState('');
  const token = localStorage.getItem("token");
  const insertionCategorie = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/Categorie',{ Nom_Categorie : nomCategorie },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
        toast.success("Inserer avec success!");
      console.log(nomCategorie);
      console.log('Categorie inserer');
      setNomCategorie('');
    }
    catch(error)
    {
        toast.error("erreur d'insertion");
      console.error('Erreur d\'insertion' , error)
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion Categorie</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionCategorie}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du Categoriee</label>
                        <input type="text" className="form-control"  placeholder="Nom du Categorie" value={nomCategorie} onChange={(e) => setNomCategorie(e.target.value)}/>
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

export default InsertionCategorie
