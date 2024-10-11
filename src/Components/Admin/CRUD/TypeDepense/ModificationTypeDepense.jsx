import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModificationTyeDepense = () => {
  const [TypeDepenses, setTypeDepenses] = useState([]);
  const [TypeDepenseModif, setTypeDepenseModif] = useState('');
  const [idTypeDepense, setIdTypeDepense] = useState('');
  const token = localStorage.getItem("token");

  const ListeTypeDepenses = () => {
    axios.get('https://localhost:8000/api/TypeDepense',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setTypeDepenses(response.data);
    });
  };

  useEffect(() => {
    ListeTypeDepenses();
  });

  const ModificationTypeDepense = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://127.0.0.1:8000/api/TypeDepense/${idTypeDepense}`, { Motif_Depense: TypeDepenseModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
     toast.success("MOdification effectuer!");
    } catch (error) {
      console.error('Erreur de modification', error);
      toast.error('Erreur de modification!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier une type de dépense</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationTypeDepense}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Type de dépense à modifier</label>
                  <select className="form-control" onChange={(e) => setIdTypeDepense(e.target.value)}>
                  <option className="form-control text-center">Choisir une type de dépense</option>
                    {Array.isArray(TypeDepenses) ? (
                      TypeDepenses.map(TypeDepense => (
                        <option className="form-control text-center" key={TypeDepense.id} value={TypeDepense.id}>
                          {TypeDepense.motifDepense}
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
                  <label>Nom de la Type de dépense</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la TypeDepense"
                    value={TypeDepenseModif}
                    onChange={(e) => setTypeDepenseModif(e.target.value)}
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

export default ModificationTyeDepense;
