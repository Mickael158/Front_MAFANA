import axios from "axios";
import { useEffect, useState } from "react";
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
  const ListeMembre = () => {
    axios.get('https://localhost:8000/api/PersonneIndep',{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
        setMembre(response.data);
    });
};
const handleSelectMember = (member) => {
    setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
    setSelectedId(member.id);
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
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-dark">
                                <tr>
                                    <th>Nom du Membre</th>
                                    <th>Prénom</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Dérnière Cotisation Payée</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(Membre) ? (
                                    Membre.map(member => (
                                        <tr key={member.id}>
                                            <td>{member.nom_membre}</td>
                                            <td>{member.prenom_membre}</td>
                                            <td>{member.telephone}</td>
                                            <td>{member.email}</td>
                                            <td>{member.situation}</td>
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
