import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierVallee = () => {
  const [vallees, setVallees] = useState([]);
  const [valleModif, setValleModif] = useState('');
  const [idValle, setIdValle] = useState('');
  const token = localStorage.getItem("token");

  const ListeVallees = () => {
    axios.get('https://localhost:8000/api/valle',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setVallees(response.data);
    });
  };

  useEffect(() => {
    ListeVallees();
  });

  const ModificationVallee = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://127.0.0.1:8000/api/valle/${idValle}`, { Nom_valle: valleModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    toast.success("Modification effectuer!");
      console.log('Vallee modifiée', response.data);
    } catch (error) {
        toast.error("Erreur de modification du valle");
      console.error('Erreur de modification', error);
    }
  };

  return (
    <div>
        <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Vallée</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationVallee}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Vallée à modifier</label>
                  <select className="form-control" onChange={(e) => setIdValle(e.target.value)}>
                    {Array.isArray(vallees) ? (
                      vallees.map(vallee => (
                        <option className="form-control text-center" key={vallee.id} value={vallee.id}>
                          {vallee.nomVallee}
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
                  <label>Nom de la vallée</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la vallée"
                    value={valleModif}
                    onChange={(e) => setValleModif(e.target.value)}
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

export default ModifierVallee;
