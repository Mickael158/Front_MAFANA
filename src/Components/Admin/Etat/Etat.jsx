import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Button, Modal } from 'react-bootstrap'; 

const Etat = () => {
    const [Membre, setMembre] = useState([]);
    const token = localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [selectId, setSelectId] = useState('');
    const [selectNom, setSelectNom] = useState('');
    const [Cotisation, setCotisation] = useState();
    const [Annee, setAnnee] = useState([]);
    const [Taona, setTaona] = useState([]);
    const [CotisationAll, setCotisationAll] = useState();
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

    // Fonction pour exporter les membres en fichier Excel
    const exportToExcel = () => {
        // Aplatir les données des membres pour faciliter l'exportation
        const dataToExport = Membre.map(member => ({
            Nom: member.personnMembre.nomMembre,
            Prénom: member.personnMembre.prenomMembre,
            Téléphone: member.personnMembre.Telephone,
            Village: member.personnMembre.idVillage.Nom_Village,
            Vallée: member.personnMembre.idVillage.Id_Vallee.Nom_Vallee,
            Pourcentage: member.pourcentage
        }));

        // Créer une feuille de calcul à partir des données aplaties
        const ws = XLSX.utils.json_to_sheet(dataToExport);

        // Créer un classeur
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Membres');

        // Exporter le fichier Excel
        XLSX.writeFile(wb, 'etat_membres.xlsx');
    };

    useEffect(() => {
        ListeMembre();
        ListeVillage();
    } ,[]);  
    const Ans = (id) => {
        axios.get(`https://localhost:8000/api/getAnneInscription/${id}`,{
            headers:
            {
                'content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setAnnee(response.data);
        });
    };
    const VoireDevis = (select) => {
        setSelectId('');
        setSelectNom('');
        setCotisation([]);
        setCotisationAll([]);
        setAnnee([]);
        axios.get(`https://localhost:8000/api/getAllRecueFamille/${select.personnMembre.id}`,{
            headers:
            {
                'content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setCotisation(response.data);
            Ans(select.personnMembre.id);
            setSelectId(select.personnMembre.id);
            setSelectNom(select.personnMembre.nomMembre+" "+ select.personnMembre.prenomMembre)
            setShowModal(true);
        });
    };
    const VoireDevisBy = (id , a) => {
        axios.get(`https://localhost:8000/api/getAllRecueFamilleBy/${id}/${a}`,{
            headers:
            {
                'content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            setCotisationAll(response.data);
        });
    };
    
    return (
        <>
            <div className="panel-header panel-header-sm"></div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-4">
                            <h4 className="card-title">Etat Membres</h4>
                        </div>
                    </div>
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
                            <Button type="submit" className="btn btn-sm btn-success" style={{"width" : "30%" , "height" : "95%" , "marginTop" : "-0.3%"}}><i className="now-ui-icons ui-1_zoom-bold"></i> Rechercher</Button>
                        </div>
                    </div>
                    
                </form> <br/>
                    <div className="card">
                        <div className="col-md-8 d-flex">
                            <button className="btn btn-primary btn-block" style={{ width: '10%' , height: '60%'  }} type="button" onClick={exportToExcel}>
                            <i className="now-ui-icons arrows-1_cloud-upload-94" style={{ fontSize: '24px' }}></i>
                            </button>
                        </div>
                        <div className="card-header">
                            <h4 className="card-title">Etat de tous les membres</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-dark text-center">
                                        <tr>
                                            <th className="text-left">Nom</th>
                                            <th className="text-left">Téléphone</th>
                                            <th className="text-left">Tranobe</th>
                                            <th className="text-left">Vallée</th>
                                            <th className="text-center">Détail</th>
                                            <th className="text-right">Cotisation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(Membre) && Membre.length > 0 ? (
                                            Membre.map(member => {
                                                // Déterminer la couleur basée sur le pourcentage
                                                let color = '';
                                                if (member.pourcentage <= 25) {
                                                    color = 'red';
                                                } else if (member.pourcentage <= 50) {
                                                    color = 'orange';
                                                } else if (member.pourcentage <= 75) {
                                                    color = 'yellow';
                                                } else if (member.pourcentage <= 100) {
                                                    color = 'green';
                                                }
                                                return (
                                                    <tr key={member.personnMembre.id} className="text-center">
                                                        <td className="text-left">{member.personnMembre.nomMembre} {member.personnMembre.prenomMembre}</td>
                                                        <td  className="text-left">{member.personnMembre.Telephone}</td>
                                                        <td  className="text-left">{member.personnMembre.idVillage.Nom_Village}</td>
                                                        <td  className="text-left">{member.personnMembre.idVillage.Id_Vallee.Nom_Vallee}</td>
                                                        <td className="text-center">
                                                            <button
                                                                className="btn btn-block"
                                                                style={{ backgroundColor: '#D3D3D3'}}
                                                                type="button"
                                                                onClick={() => VoireDevis(member)}
                                                            >
                                                                Voir <i className="now-ui-icons arrows-1_minimal-right" style={{ fontSize: '12px' }}></i>
                                                            </button>
                                                        </td>
                                                        <td className="text-right">
                                                            <button className="btn" style={{ backgroundColor: color }}>
                                                                {Number.isInteger(member.pourcentage) 
                                                                    ? member.pourcentage 
                                                                    : member.pourcentage.toFixed(2)}%
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr><td colSpan="5">Aucun membre trouvé</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Totat cotisation de la famille {selectNom} est de {Cotisation}Ar </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex  w-100 justify-content-center align-items-center gap-3 align-content-center ">
                        <p className="w-25">Total cotisation en </p>
                    <select 
                        className="form-control text-center w-25"
                        value={Taona}
                        onChange={(e) => setTaona(e.target.value) }
                    >
                        <option value=''>
                            Choisir une année
                        </option>
                    {Annee.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select> <p> est de valeur de  {CotisationAll ? CotisationAll : 0}Ar avec ces charges</p>
                    </div>
                    
                <button className="btn btn-success" style={{ fontSize: '120%'}} onClick={() =>VoireDevisBy(selectId , Taona)}>Voire</button>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false) }>Fermer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Etat;
