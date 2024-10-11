import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ModificationtypeEvenement = () => {
    const [typeEvenement, setTypeEvenement] = useState([]);
  const [typeEvenementModif, setTypeEvenementModif] = useState('');
  const [idTypeEvenement, setIdTypeEvenement] = useState('');
  const token = localStorage.getItem("token");

  const ListeTypeEvenement = () => {
    axios.get('https://localhost:8000/api/TypeEvenement',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setTypeEvenement(response.data);
    });
  };

  useEffect(() => {
    ListeTypeEvenement();
  });

  const ModificationTypeEvenement = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://127.0.0.1:8000/api/TypeEvenement/${idTypeEvenement}`, { Nom_Type_Evenement: typeEvenementModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
     toast.success("Type evenement modifier!");
    } catch (error) {
      console.error('Erreur de modification', error);
      toast.error("Erreur de modification!");
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier un type d'évènement</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationTypeEvenement}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Type d'évènement à modifier</label>
                  <select className="form-control" onChange={(e) => setIdTypeEvenement(e.target.value)}>
                    <option className="form-control text-center">Choir le Type d'évènement </option>
                    {Array.isArray(typeEvenement) ? (
                      typeEvenement.map(typeEvenements => (
                        <option className="form-control text-center" key={typeEvenements.id} value={typeEvenements.id}>
                          {typeEvenements.nomTypeEvenement}
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
                  <label>Nouveau Nom du Type d'évènement </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nouveau Nom du Type d'évènement"
                    value={typeEvenementModif}
                    onChange={(e) => setTypeEvenementModif(e.target.value)}
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

export default ModificationtypeEvenement
