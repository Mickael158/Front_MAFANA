import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionPrixCharge = () => {
    const [Charge, setCharge] = useState([]);
    const [idCharge, setIdCharge] = useState('');
    const [Montant, setMontant] = useState('');
    const [DateMofid, setDateMofid] = useState('');
    const token = localStorage.getItem("token");
    const ListeCharge = async () => {
        try {
          const response = await axios.get('https://localhost:8000/api/Selects',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          });
          setCharge(response.data);
        } catch (error) {
          console.error('Erreur de chargement des Charges', error);
        }
      };
    
      useEffect(() => {
        ListeCharge();
        console.log(Charge);
      });
      const InsertionPrixCharge = async (event) => {
        event.preventDefault();
        try {
          await axios.post('https://localhost:8000/api/PrixCharge',{ idCharge: idCharge, Valeur: Montant  , DateInsertionPrixCharge : DateMofid}, 
            { 
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` } 
            }
          );
          console.log('PrixCharge inseré');
          setMontant(''); 
          setDateMofid(''); 
          toast.success("Prix Charge inserer!");
        } catch (error) {
          console.error('Erreur d\'insertion', error);
          toast.error('Erreur d\'insertion!');
        }
      };
  return (
    <>
       <div>
        <ToastContainer />
      <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion nouveau prix Charge</h5>
              </div>
              <div className="card-body">
                <form onSubmit={InsertionPrixCharge}>
                  <div className="row mb-5">
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Nom Charge</label>
                        <select 
                      className="form-control" 
                      value={idCharge} 
                      onChange={(e) => setIdCharge(e.target.value)}
                    >
                      {Array.isArray(Charge) ? (
                        Charge.map((charges) => (
                          <option className="form-control" key={charges.id} value={charges.id}>
                            {charges.NomCharge}
                          </option>
                        ))
                      ) : (
                        <option className="form-control text-center">Null</option>
                      )}
                    </select>
                       </div>
                    </div>
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Montant du nouveau Charge</label>
                        <input type="number" className="form-control"  placeholder="en Ariary/Mois" value={Montant} onChange={(e) => setMontant(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Debut validation de ce Nouveau Montant</label>
                        <input type="date" className="form-control"   value={DateMofid} onChange={(e) => setDateMofid(e.target.value)}/>
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
  )
}

export default InsertionPrixCharge
