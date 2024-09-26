import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionTypeDepense = () => 
  {
  const [TypeDepense, setTypeDepense] = useState('');
  const token = localStorage.getItem("token");
  const insertionTypeDInsertionTypeDepense = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/TypeDepense',{ Motif_Depense : TypeDepense },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Type de depense inserer !");
      setTypeDepense('');
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Erreur lors de l'insertion");
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion Type Depense</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionTypeDInsertionTypeDepense}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du TypeDepensee</label>
                        <input type="text" className="form-control"  placeholder="Nom du TypeDepense" value={TypeDepense} onChange={(e) => setTypeDepense(e.target.value)}/>
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

export default InsertionTypeDepense
