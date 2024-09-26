import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Don = () => {
  const [Montant, setMontant] = useState('');
    const [selectedNom, setSelectedNom] = useState('');
    const user = localStorage.getItem('user');
    const token = localStorage.getItem("token");
    const PayementDonation = (event) => {
      event.preventDefault();

      try{
          
          axios.post(` https://localhost:8000/api/DonationFinancier`,{utilisateur : user, nom_donation_financier : selectedNom , montant : Montant },
              {
                  headers: 
                  {
                    'content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                });
                toast.success("Donnation inserer!");
                setMontant('');
                setSelectedNom('');
      }catch(error){
          console.error('Erreur d\'insertion' , error)
          toast.error("Erreur dans l'inertion");
      }
      
  }
  return (
    <>
      <div>
        <ToastContainer />
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Donnation</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={PayementDonation}>
                            <div className="row mb-5">
                                <div className="col-md-5 pr-1">
                                    <div className="form-group">
                                        <label>Nom de la personne </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la Personne"
                                            value={selectedNom} onChange={(e) => setSelectedNom(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 pr-1">
                                    <div className="form-group">
                                        <label>Montant</label>
                                        <input type="number" className="form-control" placeholder="en Ariary" value={Montant} onChange={(e) => setMontant(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1 mt-3">
                                    <button
                                        className="btn btn-success btn-block"
                                        type="submit"
                                    >
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

export default Don
