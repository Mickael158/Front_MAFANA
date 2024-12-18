import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierTypeRevenu = () => {
    const [typeRevenu, setTypeRevenu] = useState([]);
    const [typeRevenuModif, setTypeRevenuModif] = useState('');
    const [idTypeRevenu, setIdTypeRevenu] = useState('');
    const token = localStorage.getItem("token")
  
    const ListeTypeRevenu = () => {
      axios.get('https://localhost:8000/api/TypeRevenu',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
        setTypeRevenu(response.data);
      });
    };
  
    useEffect(() => {
      ListeTypeRevenu();
    });
  
    const ModificationTypeRevenu = async (event) => {
      event.preventDefault();
      try {
        await axios.post(`https://127.0.0.1:8000/api/TypeRevenu/${idTypeRevenu}`, { motif_revenu: typeRevenuModif }, {
          headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        toast.success("Modification effectuer");
      } catch (error) {
        console.error('Erreur de modification', error);
        toast.error("erreur de modification");
      }
    };
  
  return (
    <>
      <div>
        <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier un type de revenus</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationTypeRevenu}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Type de revenus à modifier</label>
                  <select className="form-control" onChange={(e) => setIdTypeRevenu(e.target.value)}>
                  <option className="form-control text-center">Choisir le type de revenus</option>
                    {Array.isArray(typeRevenu) ? (
                      typeRevenu.map(TypeRevenus => (
                        <option className="form-control text-center" key={TypeRevenus.id} value={TypeRevenus.id}>
                          {TypeRevenus.motifRevenu}
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
                  <label>Nom du type de revenus</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom du type de revenus"
                    value={typeRevenuModif}
                    onChange={(e) => setTypeRevenuModif(e.target.value)}
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
    </>
  )
}

export default ModifierTypeRevenu
