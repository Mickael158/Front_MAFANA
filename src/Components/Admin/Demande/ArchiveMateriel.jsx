import { Button } from "bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const ArchiveMateriel = () => {
    const token = localStorage.getItem("token");
    const [Data, setData] = useState(null);
    const [Materiel, setMateriel] = useState([]);
    const [IdMateriel, seIdMateriel] = useState(null);
    const [DateDebut, setDateDebut] = useState(null);
    const [DateFin, setDateFin] = useState(null);
    const [DonnationMateriel, setDonnationMateriel] = useState([]);

    const ListeDonnationMateriel = (event) => {
        if (event) {
            event.preventDefault();
        }
        axios.post('https://localhost:8000/api/rechercheDemandeMateriels', {
            data: Data,
            materielId: IdMateriel,
            dateDebut: DateDebut,
            dateFin: DateFin
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setDonnationMateriel(response.data.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des DonnationMateriels:", error);
        });
    };
    const listeAll_Materiel = () => {
        axios.get('https://127.0.0.1:8000/api/Materiel',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                setMateriel(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données", error);
            });
    };   

    useEffect(() => {
        ListeDonnationMateriel();
        listeAll_Materiel();
    }, []); 

  return (
    <>
      <div className="card">
        <div className="card-header">
            <h4 className="card-title">Liste des Demandes Tranobe Déjà Validées</h4>
        </div>
        <div className="card-body">
            <form onSubmit={ListeDonnationMateriel}>
                <div className="row">
                    <div className="col-3">
                        <input className="form-control" placeholder="rechercher..." value={Data} onChange={(e) => setData(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <select className="form-control" value={ IdMateriel } onChange={(e) => seIdMateriel(e.target.value)}>
                        <option>Choisir un Tragnobe</option>
                        {Array.isArray(Materiel) ? (
                            Materiel.map(materiel => (
                                <option key={materiel.id} value={materiel.id} className="form-control">
                                  {materiel.NomMateriel}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                    </div>
                    <div className="col-2">
                        <input type="date" className="form-control" value={DateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                    </div>
                    <div className="col-2">
                        <input type="date" className="form-control" value={DateFin} onChange={(e) => setDateFin(e.target.value)} />
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-sm btn-success" style={{fontSize: '100%' , marginTop: '-0.0001%'}}><i className="now-ui-icons ui-1_zoom-bold"></i> Rechercher</button>
                    </div>
                </div>
                
            </form>
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-dark">
                        <tr>
                            <th className="text-left">Nom</th>
                            <th className="text-left">Tranobe</th>
                            <th className="text-right">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(DonnationMateriel) && DonnationMateriel.length > 0 ? (
                            DonnationMateriel.map(donnationMateriel => (
                                <tr key={donnationMateriel.id}>
                                    <td className="text-left">{donnationMateriel.nom_membre} {donnationMateriel.prenom_membre} </td>
                                    <td className="text-left">{donnationMateriel.nom_materiel}</td>
                                    <td className="text-right">{donnationMateriel.nombre}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucune demande trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default ArchiveMateriel
