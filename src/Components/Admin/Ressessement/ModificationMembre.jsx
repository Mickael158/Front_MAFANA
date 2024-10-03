import axios from "axios";
import { useEffect, useState } from "react";

const ModificationMembre = () => {
  const [Membres, setMembres] = useState([]);
  const [MembreModif, setMembreModif] = useState('');
  const [idMembre, setIdMembre] = useState('');
  const token = localStorage.getItem("token");

  const ListeMembre = () => {
    axios.get('https://localhost:8000/api/Membre',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setMembres(response.data);
    });
  };

  useEffect(() => {
    ListeMembre();
  } , []);

  const ModificationMembre = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://127.0.0.1:8000/api/Membre/${idMembre}`, { Nom_Membre: MembreModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('Membre modifiée', response.data);
    } catch (error) {
      console.error('Erreur de modification', error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Membre</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationMembre}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Membre à modifier</label>
                  <select className="form-control" onChange={(e) => setIdMembre(e.target.value)}>
                    {Array.isArray(Membres) ? (
                      Membres.map(Membre => (
                        <option className="form-control" key={Membre.id} value={Membre.id}>
                          {Membre.nomMembre}
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
                  <label>Nom de la Membre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la Membre"
                    value={MembreModif}
                    onChange={(e) => setMembreModif(e.target.value)}
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

export default ModificationMembre;
