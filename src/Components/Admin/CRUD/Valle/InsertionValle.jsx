import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionValle = () => 
  {
  const [nomValle, setNomValle] = useState('');
  const token = localStorage.getItem("token");
  const insertionValle = async (event) =>
    {
      event.preventDefault();
      try
      {
        await axios.post('https://127.0.0.1:8000/api/valle',{ Nom_valle : nomValle },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success('Vallée insérée avec succès!');
      setNomValle('');
    }
    catch(error)
    {
        toast.error('Erreur lors de l\'insertion de la vallée.');
        console.error('Erreur d\'insertion' , error)
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion Vallee</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionValle}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du vallee</label>
                        <input type="text" className="form-control"  placeholder="Nom du valle" value={nomValle} onChange={(e) => setNomValle(e.target.value)}/>
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

export default InsertionValle
