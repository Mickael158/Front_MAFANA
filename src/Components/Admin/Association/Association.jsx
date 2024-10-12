import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Association = () => {
  const [Siege,setSiege] = useState('');
  const [Description,setDescription] = useState('');
  const [Email,setEmail] = useState('');
  const [Telephone,setTelephone] = useState('');
  const [Secteur_activite,setSecteur_activite] = useState('');
  const [Nature_juridique,setNature_juridique] = useState('');
  const [Slogan,setSlogan] = useState('');
  const [Logo,setLogo] = useState('');
  const [Nom,setNom] = useState('');
  const token = localStorage.getItem('token');

  const ListeAssociation = async () => {
      const response = await axios.get('https://localhost:8000/api/Associations/1');
      setNom(response.data.Nom);
      setSiege(response.data.Siege);
      setDescription(response.data.Description);
      setEmail(response.data.Email);
      setTelephone(response.data.Telephone);
      setSecteur_activite(response.data.secteurActivite);
      setNature_juridique(response.data.natureJuridique);
      setSlogan(response.data.Slogan);
      setLogo(response.data.Logo);
  }
  
  const ModificationAssociation = async (event) => {
    event.preventDefault();
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }

    // Validation téléphone (doit contenir exactement 10 chiffres)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(Telephone)) {
      toast.error("Le numéro de téléphone doit comporter exactement 10 chiffres.");
      return;
    }
    try {
      const response = await axios.post(`https://127.0.0.1:8000/api/Association/1`, 
        {
          Nom: Nom,
          Siege:Siege,
          Description:Description,
          Email:Email,
          Telephone:Telephone,
          secteurActivite:Secteur_activite,
          natureJuridique:Nature_juridique,
          Slogan:Slogan,
          Logo:Logo
         }, {
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
        toast.success("modification effectuer!");
    } catch (error) {
        toast.error("erreur lors de la modification");
      console.error('Erreur de modification', error);
    }
  };

  useEffect(()=>{
      ListeAssociation();
  },[]);
    
  return (
    <>
      <ToastContainer />
      <div className="panel-header panel-header-sm">
      </div>
      <div className="card">
      </div>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
              <div className="card">
              <div className="card-header">
                <h5 className="title">Association</h5>
              </div>
              <div className="card-body">
                <form onSubmit={ModificationAssociation}>
                  <div className="row">
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Nom de l'association</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Nom} onChange={(e) => setNom(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Siège</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Siege} onChange={(e) => setSiege(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Nature Juridique</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Nature_juridique} onChange={(e) => setNature_juridique(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Secteur d'activité</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Secteur_activite} onChange={(e) => setSecteur_activite(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Téléphone</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Telephone} onChange={(e) => setTelephone(e.target.value)}/>
                      </div>
                    </div>
                     <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Date debut" value={Email} onChange={(e) => setEmail(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Slogan</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Slogan} onChange={(e) => setSlogan(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-6 px-1">
                      <div className="form-group">
                        <label>Logo</label>
                        <input type="text" className="form-control" placeholder="Date debut" value={Logo} onChange={(e) => setLogo(e.target.value)}/>
                      </div>
                    </div>
                    <div className="col-md-12 px-1">
                      <div className="form-group">
                        <label>Déscription</label>
                        <textarea type="text" className="form-control" placeholder="Date debut" value={Description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
    </>
  )
}

export default Association
