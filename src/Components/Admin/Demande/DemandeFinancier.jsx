import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DemandeFinancier = () => {
    const [Membre, setMembre] = useState([]);
    const [selectedNom, setSelectedNom] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [montant, setMontant] = useState('');
    const [motif, setMotif] = useState('');
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [Idvillage,setIdvillage] = useState(null);
    const [Village,setVillage] = useState('');
    const ListeVillage = () => {
      axios.get('https://localhost:8000/api/village',{
      headers: 
      {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      }).then(response => {
          setVillage(response.data)
      });
    };  
    const ListeMembre = (event) => {
        if(event){
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/Etat',{
            data: Data,
            village: Idvillage
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setMembre(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des membres:", error);
        });
    };
    const handleSelectMember = (member) => {
        setSelectedNom(member.personnMembre.nomMembre + ' ' + member.personnMembre.prenomMembre);
        setSelectedId(member.personnMembre.id);
    };
    const DemandeFinancier = (event) => {
        event.preventDefault();
        if (!selectedId) {
            toast.error("La personne de la personne est requis.");
            return; 
        }
    
        if (montant <= 0) {
            toast.error("Le montant doit être infierieur ou égale à 0.");
            return; 
        }
        try{
            
             axios.post(` https://localhost:8000/api/DemandeFinancier`,{id_personne_membre_id : selectedId, montant : montant, motif: motif },
                {
                    headers: 
                    {
                      'content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });
                  toast.success("Demande Financier inserer");
                  ListeMembre();
        }catch(error){
            toast.error('Erreur d\'insertion' , error);
        }
        
    }
    useEffect(() => {
        ListeMembre(); 
        ListeVillage();
    }, []);
  return (
    <>
      <div>
        <ToastContainer />
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Faire une demande financière</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={DemandeFinancier}>
                            <div className="row mb-5">
                                <div className="col-md-6 pr-1">
                                    <div className="form-group">
                                        <label>Nom de la personne qui demande</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la Personne"
                                            value={selectedNom}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 pr-1">
                                    <div className="form-group">
                                        <label>Montant</label>
                                        <input type="number" className="form-control" placeholder="en Ariary" value={montant} onChange={(e) => setMontant(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-12 pr-1">
                                    <div className="form-group">
                                        <label>Motif</label>
                                        <textarea type="text" style={{'height' : '100px','fontSize' : '18px'}} className="form-control border" placeholder="Motif..." value={motif} onChange={(e) => setMotif(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1 mt-3">
                                    <button
                                        className="btn btn-success btn-block"
                                        type="submit"
                                        disabled={!selectedNom}
                                    >
                                        Envoyer le demande
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Membre Responsable</h4>
                </div>
                <div className="card-body">
                <form onSubmit={ListeMembre}>
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className="col-4">
                            <select className="form-control" value={ Idvillage } onChange={(e) => setIdvillage(e.target.value)}>
                            <option>Choisir un Tranobe</option>
                            {Array.isArray(Village) ? (
                                Village.map(Village => (
                                    <option key={Village.id} value={Village.id} className="form-control">
                                    {Village.nomVillage}
                                    </option>
                                ) )
                            ) : ( <option>Aucune Valeur</option> ) }
                            </select>
                        </div>
                        <div className="col-4">
                            <Button type="submit" className="btn btn-sm btn-success" style={{fontSize: '110%' , marginTop: '-0.0001%'}}> <i className="now-ui-icons ui-1_zoom-bold"></i> Rechercher</Button>
                        </div>
                    </div>
                        
                    </form>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th className="text-left">Nom du Membre</th>
                                    <th className="text-left">Prénom</th>
                                    <th className="text-left">Téléphone</th>
                                    <th className="text-left">Email</th>
                                    <th className="text-center">Pourcentage</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
                                    Membre.map(member => (
                                        <tr key={member.personnMembre.id}>
                                            <td className="text-left">{member.personnMembre.nomMembre}</td>
                                            <td className="text-left">{member.personnMembre.prenomMembre}</td>
                                            <td className="text-left">{member.personnMembre.Telephone}</td>
                                            <td className="text-left">{member.personnMembre.Email}</td>
                                            <td className="text-center">{Number.isInteger(member.pourcentage) 
                                                                    ? member.pourcentage 
                                                                    : member.pourcentage.toFixed(2)} % </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ width: '50%' }}
                                                    onClick={() => handleSelectMember(member)}
                                                >
                                                    <i className="now-ui-icons gestures_tap-01 fs-5"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="6">Aucun membre trouvé</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
  )
}

export default DemandeFinancier
