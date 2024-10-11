import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionProfession = () => 
  {
  const [nomProfession, setNomProfession] = useState('');
  const token = localStorage.getItem("token");
  const insertionProfession = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/Profession',{ Nom_Profession : nomProfession },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Profession inserer");
      setNomProfession('');
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Erreur d'insertion");
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion Profession</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionProfession}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom de la Profession</label>
                        <input type="text" className="form-control"  placeholder="Nom de la Profession" value={nomProfession} onChange={(e) => setNomProfession(e.target.value)}/>
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

export default InsertionProfession
