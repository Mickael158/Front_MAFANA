import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierRole = () => {
    const [roles, setRoles] = useState([]);
  const [roleModif, setRoleModif] = useState('');
  const [idValle, setIdValle] = useState('');
  const token = localStorage.getItem("token");

  const ListeRoles = () => {
    axios.get('https://localhost:8000/api/Role',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setRoles(response.data);
    });
  };

  useEffect(() => {
    ListeRoles();
  });

  const ModificationVallee = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://127.0.0.1:8000/api/Role/${idValle}`, { Nom_Role: roleModif }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success("Moodificaion effectuer");
    } catch (error) {
      console.error('Erreur de modification', error);
      toast.error("Erreur d'insertion");
    }
  };
  return (
    <>
      <div>
        <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h5 className="title">Modifier la Role</h5>
        </div>
        <div className="card-body">
          <form onSubmit={ModificationVallee}>
            <div className="row mb-5">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Role à modifier</label>
                  <select className="form-control" onChange={(e) => setIdValle(e.target.value)}>
                    {Array.isArray(roles) ? (
                      roles.map(vallee => (
                        <option className="form-control text-center" key={vallee.id} value={vallee.id}>
                          {vallee.nomRole}
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
                  <label>Nom de la Role</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la Role"
                    value={roleModif}
                    onChange={(e) => setRoleModif(e.target.value)}
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

export default ModifierRole
