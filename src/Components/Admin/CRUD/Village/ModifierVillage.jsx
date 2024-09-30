import axios from "axios";
import { useEffect, useState } from "react";
import Vallee from "../Valle/Vallee";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ModifierVillage = () => {
    const [village,setVillage] = useState('');
    const [idVillage,setIdVillage] = useState('');
    const [vallee,setVallee] = useState('');
    const token = localStorage.getItem('token');
    const ListeVillage = () => {
      axios.get('https://localhost:8000/api/village',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
          setVillage(response.data)
      });
    };  
    useEffect(() => {
      ListeVillage(); 
    });
    const VillageById = () => {
        axios.get(`https://localhost:8000/api/village/2`,{
          headers:
          {
            'Authorization' : `Bearer ${token}`
          }
        }).then(response => {
            setVallee(response.data);
        });
      };
      useEffect(() => {
        VillageById(); 
      });
      console.log(Vallee);
    const [villageModif, setVillageModif] = useState('');
    const [idValle, setIdValle] = useState('');
    const ModificationVillage = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`https://127.0.0.1:8000/api/village/${idVillage}`, { Nom_village: villageModif , Id_vallee : idValle}, {
            headers: {
              'content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            },
          });
          console.log('Vallee modifiée', response.data);
          toast.success("Village modifier !");
        } catch (error) {
          console.error('Erreur de modification', error);
          toast.error("Erreur de suppression !");
        }
      };
      const [vallees, setVallees] = useState([]);
      const ListeVallees = async () => {
        try {
          const response = await axios.get('https://localhost:8000/api/valle',{
            headers:{
              'Authorization':`Bearer ${token}`
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
            <h5 className="title">Modifier Village</h5>
          </div>
          <div className="card-body">
            <form onSubmit={ModificationVillage}>
              <div className="row mb-5">
                <div className="col-md-12  pr-1 d-flex">
                  <div className="form-group col-md-6">
                    <label>Nom du vallee correspondant</label>
                    <select 
                      className="form-control" 
                      value={idVillage} 
                      onChange={(e) => setIdVillage(e.target.value)}
                    >
                      {Array.isArray(village) ? (
                        village.map((villages) => (
                          <option className="form-control text-center" key={villages.id} value={villages.id}>
                            {villages.nomVillage} à {villages.idVallee.Nom_Vallee}
                          </option>
                        ))
                      ) : (
                        <option className="form-control">Null</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-12  pr-1 d-flex">
                <div className="col-md-5 pr-1">
                  <div className="form-group">
                    <label>Nom du village</label>
                    <input 
                      type="text" 
                      className="form-control"  
                      placeholder="Nom du village" 
                      value={villageModif} 
                      onChange={(e) => setVillageModif(e.target.value)} 
                    />
                  </div>
                </div>
              <div className="col-md-5 pr-1">
                  <div className="form-group">
                    <label>Nom du vallee correspondant</label>
                    <select 
                      className="form-control" 
                      value={idValle} 
                      onChange={(e) => setIdValle(e.target.value)}
                    >
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
              </div>
              
              <div className="col-md-3 pr-1 mt-3">
                  <button className="btn btn-success btn-block" type="submit">Valider</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModifierVillage
