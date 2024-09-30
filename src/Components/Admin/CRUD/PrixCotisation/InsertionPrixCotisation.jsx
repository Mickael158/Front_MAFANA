import { useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionPrixCotisation = () => {
  const [Montant, setMontant] = useState('');
  const [DateModif, setDateModif] = useState('');
  const token = localStorage.getItem("token");
  const insertionPrixCotisation = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/PrixCotisation',{ Valeur : Montant  , DateModif : DateModif , Utilisateur : token },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Nouveau prix cotisation inserer!");
      setMontant('');
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Erreur d'insertion");
    }
  }
  return (
    <>
       <div>
       <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion nouveux prix Cotisation</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionPrixCotisation}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Montant du nouveau cotisatisation</label>
                        <input type="number" className="form-control"  placeholder="en Ariary/Mois" value={Montant} onChange={(e) => setMontant(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Debut validation de ce Nouveau Montant</label>
                        <input type="date" className="form-control"  placeholder="Nouveau Montant" value={DateModif} onChange={(e) => setDateModif(e.target.value)}/>
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
    </>
  )
}

export default InsertionPrixCotisation;
