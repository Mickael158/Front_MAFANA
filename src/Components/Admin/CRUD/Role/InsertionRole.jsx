import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionRole = () => {
    const [nomRole, setNomRole] = useState('');
    const token = localStorage.getItem("token");
  const insertionRole = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/Role',{ Nom_Role : nomRole },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success("Role inserer!");
      setNomRole('');
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
                <h5 className="title">Insertion rôle</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionRole}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du rôle</label>
                        <input type="text" className="form-control"  placeholder="Nom du rôle" value={nomRole} onChange={(e) => setNomRole(e.target.value)}/>
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

export default InsertionRole
