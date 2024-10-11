import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionVillage = () => {
  const [nomVillage, setNomVillage] = useState('');
  const [idValle, setIdValle] = useState('');
  const [vallees, setVallees] = useState([]);
  const token = localStorage.getItem("token");

  const InsertionVillage = async (event) => {
    event.preventDefault();
    try {
      console.log(nomVillage, idValle);
      await axios.post('https://localhost:8000/api/village', 
        { Nom_village: nomVillage, Id_vallee: idValle }, 
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
      );
      console.log('Village inseré');
      setNomVillage('');
      setIdValle(vallees.length > 0 ? vallees[0].id : '');
      toast.success("Village inserer !");
    } catch (error) {
      console.error('Erreur d\'insertion', error);
      toast.error("Erreur d'insrtion village !");
    }
  };

  const ListeVallees = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/valle',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      });
      setVallees(response.data);
    } catch (error) {
      console.error('Erreur de chargement des vallées', error);
    }
  };

  useEffect(() => {
    ListeVallees();
  });

  useEffect(() => {
    if (vallees.length > 0) {
      setIdValle(vallees[0].id);
    }
  }, [vallees]);

  return (
    <>
      <ToastContainer />
      <div>
        <div className="card">
          <div className="card-header">
            <h5 className="title">Inserer un nouveau Village</h5>
          </div>
          <div className="card-body">
            <form onSubmit={InsertionVillage}>
              <div className="row mb-5">
                <div className="col-md-5 pr-1">
                  <div className="form-group">
                    <label>Nom du village</label>
                    <input 
                      type="text" 
                      className="form-control"  
                      placeholder="Nom du village" 
                      value={nomVillage} 
                      onChange={(e) => setNomVillage(e.target.value)} 
                    />
                  </div>
                </div>
                <div className="col-md-5 pr-1">
                  <div className="form-group">
                    <label>Nom du vallée correspondant</label>
                    <select 
                      className="form-control" 
                      value={idValle} 
                      onChange={(e) => setIdValle(e.target.value)}
                    >
                      <option className="text-center">Choisir un vallée</option>
                      {Array.isArray(vallees) ? (
                        vallees.map((vallee) => (
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
                <div className="col-md-3 pr-1 mt-3">
                  <button className="btn btn-success btn-block" type="submit">Valider</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertionVillage;
