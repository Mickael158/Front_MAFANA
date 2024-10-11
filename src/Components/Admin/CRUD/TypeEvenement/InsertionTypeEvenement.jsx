import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionTypeEvenement = () => {
  const [typeEvenemet, setTypeEvenemet] = useState('');
  const token = localStorage.getItem("token");
  const insertionTypeEvenement = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post('https://localhost:8000/api/TypeEvenement',{ Nom_Type_Evenement : typeEvenemet },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Type evenement inserer!");
      setTypeEvenemet('');
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Erreur d'insertion!");
    }
  }
  return (
    <>
      <div>
        <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Nouveau Type d'évènement</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionTypeEvenement}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du Type d'évènement</label>
                        <input type="text" className="form-control"  placeholder="Ecrivez ici" value={typeEvenemet} onChange={(e) => setTypeEvenemet(e.target.value)}/>
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

export default InsertionTypeEvenement
