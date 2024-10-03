import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierProfession = () => {
  const [Professions, setProfessions] = useState([]);
  const [ProfessionModif, setProfessionModif] = useState('');
  const [idProfession, setIdProfession] = useState('');
  const token = localStorage.getItem("token");

  const ListeProfessions = () => {
    axios.get('https://localhost:8000/api/Profession',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setProfessions(response.data);
    });
  };

  useEffect(() => {
    ListeProfessions();
  });

  const ModificationProfession = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://127.0.0.1:8000/api/Profession/${idProfession}`, { Nom_Profession: ProfessionModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success("Modification effectuer");
    } catch (error) {
      console.error('Erreur de modification', error);
      toast.error("erreur de suppression");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Profession</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationProfession}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Profession à modifier</label>
                  <select className="form-control" onChange={(e) => setIdProfession(e.target.value)}>
                    {Array.isArray(Professions) ? (
                      Professions.map(Profession => (
                        <option className="form-control text-center" key={Profession.id} value={Profession.id}>
                          {Profession.nomProfession}
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
                  <label>Nom de la Profession</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la Profession"
                    value={ProfessionModif}
                    onChange={(e) => setProfessionModif(e.target.value)}
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

export default ModifierProfession;
