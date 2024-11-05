import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DemandeMateriel = () => {
  const [Materiel, setMateriel] = useState();
  const [Membre, setMembre] = useState([]);
  const [IdMateriel, setIdMateriel] = useState();
  const [selectedNom, setSelectedNom] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [nbr, setNbr] = useState('');
    const [motif, setMotif] = useState('');
    const token = localStorage.getItem("token");
  const ListeMateriel = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/Materiel/existantDon',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      });
      setMateriel(response.data);
    } catch (error) {
      console.error('Erreur de chargement des Catgorie', error);
    }
  };
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
const DemandeMateriel = (event) => {
  event.preventDefault();
  if (!selectedId) {
    toast.error("L'ID de la personne est requis.");
    return; 
    }

    if (!IdMateriel) {
        toast.error("L'ID du matériel est requis.");
        return; 
    }

    if (nbr <= 0) {
        toast.error("Le nombre de matériel doit être supérieur à 0.");
        return; 
    }
  try{
      
      axios.post('https://localhost:8000/api/DemandeMateriel',
        {
          id_personne_membre_id : selectedId,
          id_materiel_id : IdMateriel,
          motif: motif ,
          nbr : nbr
        },
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            toast.success("Demande Financier inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}

  useEffect(() => {
    ListeMateriel();
    ListeMembre();
    ListeVillage();
  } , []);
  return (
    <>
    <ToastContainer/>
      <div>
          <div className="card">
              <div className="card-header">
                  <h5 className="title">Demande Matériel</h5>
              </div>
              <div className="card-body">
                  <form onSubmit={DemandeMateriel} >
                      <div className="row mb-5">
                          <div className="col-md-4 pr-1">
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
                          <div className="col-md-4 pr-1">
                              <div className="form-group">
                                  <label>Le matériel a demande</label>
                                  <select 
                                      className="form-control" 
                                      value={IdMateriel} 
                                      onChange={(e) => setIdMateriel(e.target.value)}
                                      >
                                     <option className="form-control">Choisir un matériel</option>
                                      {Array.isArray(Materiel) ? (
                                          Materiel.map((m) => (
                                          <option className="form-control" key={m.id} value={m.id}>
                                              {m.nom_materiel}
                                          </option>
                                          ))
                                      ) : (
                                          <option className="form-control">Null</option>
                                      )}
                                  </select>
                              </div>
                          </div>
                          <div className="col-md-4 pr-1">
                              <div className="form-group">
                                  <label>Nombre</label>
                                  <input type="number" className="form-control" placeholder="Nombre" value={nbr} onChange={(e) => setNbr(e.target.value)}/>
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
                        <div className="col-3">
                            <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)}></input>
                        </div>
                        <div className="col-3">
                            <select className="form-control" value={ Idvillage } onChange={(e) => setIdvillage(e.target.value)}>
                            <option>Choisir un Village</option>
                            {Array.isArray(Village) ? (
                                Village.map(Village => (
                                    <option key={Village.id} value={Village.id} className="form-control">
                                    {Village.nomVillage}
                                    </option>
                                ) )
                            ) : ( <option>Aucune Valeur</option> ) }
                            </select>
                        </div>
                    </div>
                        <Button type="submit" className="btn btn-sm btn-warning">Rechercher</Button>
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
                                        <tr key={member.id}>
                                             <td className="text-left">{member.personnMembre.nomMembre}</td>
                                            <td className="text-left">{member.personnMembre.prenomMembre}</td>
                                            <td className="text-left">{member.personnMembre.Telephone}</td>
                                            <td className="text-left">{member.personnMembre.Email}</td>
                                            <td className="text-center">{Number.isInteger(member.pourcentage) 
                                                                    ? member.pourcentage 
                                                                    : member.pourcentage.toFixed(2)} % </td>
                                            <td>
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

export default DemandeMateriel
