import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierMateriel = () => {
  const [Materiel, setMateriel] = useState([]);
  const [MaterielModif, setMaterielModif] = useState('');
  const [idMateriel, setIdMateriel] = useState('');
  const token = localStorage.getItem("token");

  const ListeMateriel = () => {
    axios.get('https://localhost:8000/api/Materiel',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setMateriel(response.data);
    });
  };

  useEffect(() => {
    ListeMateriel();
  }, []);

  const ModificationMateriel = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://127.0.0.1:8000/api/Materiel/${idMateriel}`, { Nom_Materiel: MaterielModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success("Materiel Modifier!");
    } catch (error) {
      console.error('Erreur de modification', error);
      toast.error("Erreur de modification");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Materiel</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationMateriel}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Materiel à modifier</label>
                  <select className="form-control" onChange={(e) => setIdMateriel(e.target.value)}>
                    {Array.isArray(Materiel) ? (
                      Materiel.map(Materiel => (
                        <option className="form-control text-center" key={Materiel.id} value={Materiel.id}>
                          {Materiel.NomMateriel}
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
                  <label>Nom de la Materiel</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la Materiel"
                    value={MaterielModif}
                    onChange={(e) => setMaterielModif(e.target.value)}
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

export default ModifierMateriel;
