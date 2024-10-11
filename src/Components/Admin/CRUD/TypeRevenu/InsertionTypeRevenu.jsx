import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const InsertionTypeRevenu = () => {
  const [nomTypeRevenu, setNomTypeRevenu] = useState('');
  const token = localStorage.getItem("token");
  const insertiontypeRevenu = (event) => 
    {
      event.preventDefault();
      try
      {
        axios.post(' https://127.0.0.1:8000/api/TypeRevenu',{ motif_revenu : nomTypeRevenu },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      setNomTypeRevenu('');
      toast.success("Type revenu inserer");
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
                <h5 className="title">Insertion type de revenu</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertiontypeRevenu}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom du type de revenu</label>
                        <input type="text" className="form-control"  placeholder="Nom du type de revenus" value={nomTypeRevenu} onChange={(e) => setNomTypeRevenu(e.target.value)}/>
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

export default InsertionTypeRevenu
