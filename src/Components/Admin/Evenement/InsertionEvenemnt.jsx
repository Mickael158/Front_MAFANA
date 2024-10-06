import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListeEvenemnt from './ListeEvenemnt';

const InsertionEvenemnt = () => {
    const [dateDebut,setDateDebut] = useState('');
    const [dateFin,setDateFin] = useState('');
    const [nom,setNom] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [Lieu,setLieu] = useState('');
    const [Description,setDescription] = useState('');
    const [IdTypeEvenement,setIdTypeEvenement] = useState('');
    const [TypeEvenement,setTypeEvenement] = useState('');
    const token = localStorage.getItem('token');

    const ListeTypeEvenement = async () => {
        const response = await axios.get('https://localhost:8000/api/TypeEvenement',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        setTypeEvenement(response.data);
    }

const Insertion = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://localhost:8000/api/evenement',
            {description:Description, date_debut:dateDebut,date_fin:dateFin,lieu:Lieu,typeEvenement_id:IdTypeEvenement,association_id:1,user_id:token,nom:nom,publier:isToggled},
        {
            headers:
            {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        toast.success("Inserer");

    } catch (error) {
        console.log(error);
        toast.error("Erreur d'insertion");
    }
}

    useEffect(()=>{
        ListeTypeEvenement();
    } , []);
    const toggle = () => {
      setIsToggled(!isToggled);
    };
  return (
    <>
    <ToastContainer />
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card">
              <div className="card-header">
                <h5 className="title">Insertion evenement</h5>
              </div>
              <div className="card-body">
                <form onSubmit={Insertion}>
                  <div className="row">
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Nom de Evenement</label>
                        <input type="text" className="form-control"  value={nom} onChange={(e) => setNom(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1 text-center">
                      <div className="form-group">
                        <label>Afficher ou pas</label>
                        <div className="d-flex justify-content-center text-center">
                            <span className="me-2">{isToggled ? "Activé" : "Désactivé"}</span>
                            <div
                              className={`toggle-switch ${isToggled ? "toggled" : ""}`}
                              onClick={toggle}
                            >
                              <div className="toggle-button" />
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Date debut de l evenement</label>
                        <input type="date" className="form-control"  value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 pl-1">
                      <div className="form-group">
                        <label >Date fin de l evenement</label>
                        <input type="date" className="form-control" value={dateFin} onChange={(e) => setDateFin(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6 pr-1">
                        <div className="form-group">
                            <label>Lieu de l evenement</label>
                            <input type="text" className="form-control" placeholder="Lieu de l'evenement" value={Lieu} onChange={(e) => setLieu(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Type de l evenement</label>
                        <select className="form-control" value={ IdTypeEvenement } onChange={(e) => setIdTypeEvenement(e.target.value)}>
                          <option value="">Selectionner un Type</option>  
                        {Array.isArray(TypeEvenement) ? (
                            TypeEvenement.map(TypeEvenement => (
                                <option key={TypeEvenement.id} value={TypeEvenement.id} className="form-control">
                                  {TypeEvenement.nomTypeEvenement}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Description Evenement</label>
                        <textarea rows="4" cols="80" className="form-control" placeholder="Description de l'evenement" value={Description} onChange={(e) => setDescription(e.target.value)}>Lamborghini Mercy, Your chick she so thirsty, I m in that two seat Lambo.</textarea>
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-success'>Valider</button>
                </form>
              </div>
            </div>    
            </div>
        </div>
        </div>
    </div>
    <ListeEvenemnt/>
    </>
  )
}

export default InsertionEvenemnt
