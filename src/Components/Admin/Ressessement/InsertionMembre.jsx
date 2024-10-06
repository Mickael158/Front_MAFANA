import axios from "axios";
import { useEffect, useState } from "react"
import '../../../assets/TelInput/css/intlTelInput.min.css'
import '../../../assets/TelInput/js/intlTelInputWithUtils.js'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InsertionMembre = () => 
  {
    const token = localStorage.getItem("token");
  const [Genre,setGenre] = useState('');
  const ListeGenre = () => {
    axios.get('https://localhost:8000/api/Genre',{
      headers: 
      {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
        setGenre(response.data)
    });
  };  

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

  const [PersonneMembre, setPersonneMembre] = useState({
    Nom : '',
    Prenom : '',
    Adresse : '',
    Email : '',
    Telephone : '',
    IdVillage : '',
    IdGenre : '',
    DateNaissance : ''
  });
  const insertionMembre = (event) => 
    {
      event.preventDefault();
       // Regex pour valider le nom et prénom (seulement lettres)
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
      // Regex pour valider l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regex pour valider le téléphone (10 chiffres)
      const phoneRegex = /^\d{10}$/;

      // Vérification des champs
      if (!PersonneMembre.Nom || !nameRegex.test(PersonneMembre.Nom)) {
          toast.error("Le nom doit contenir uniquement des lettres");
          return;
      }
      if (!PersonneMembre.Prenom || !nameRegex.test(PersonneMembre.Prenom)) {
          toast.error("Le prénom doit contenir uniquement des lettres");
          return;
      }
      if (!PersonneMembre.Email || !emailRegex.test(PersonneMembre.Email)) {
          toast.error("Veuillez entrer un email valide");
          return;
      }
      if (!PersonneMembre.Telephone || !phoneRegex.test(PersonneMembre.Telephone)) {
          toast.error("Le numéro de téléphone doit contenir 10 chiffres");
          return;
      }
      if (!PersonneMembre.Adresse || !PersonneMembre.DateNaissance || 
          !PersonneMembre.IdGenre || !PersonneMembre.IdVillage) {
          toast.error("Tous les champs doivent être remplis");
          return;
      }
      try
      {
        axios.post('https://127.0.0.1:8000/api/Personne',
        { 
          Nom : PersonneMembre.Nom,
          Prenom : PersonneMembre.Prenom,
          Adresse : PersonneMembre.Adresse,
          Email : PersonneMembre.Email,
          Telephone : PersonneMembre.Telephone,
          DateNaissance : PersonneMembre.DateNaissance,
          IdGenre : PersonneMembre.IdGenre,
          IdVillage : PersonneMembre.IdVillage 
        },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
        
      );
      toast.success("Personne inserrer");
      setPersonneMembre({...PersonneMembre,
        Nom: '',
        Prenom: '',
        Adresse: '',
        Email: '',
        Telephone: '',
        IdVillage: '',
        IdGenre: '',
        DateNaissance: ''
      });
    }
    catch(error)
    {
      console.error('Erreur d\'insertion' , error)
      toast.error("Error de ressesement");
    }
  }
  useEffect(() => {
      ListeVillage();
      ListeGenre();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <div className="card">
              <div className="card-header">
                <h5 className="title">Nouveau membre chez MA.FA.NA</h5>
              </div>
              <div className="card-body">
                <form onSubmit={insertionMembre}>
                  <div className="row mb-5">
                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Nom Membre</label>
                        <input type="text" className="form-control"  placeholder="Nom" value={ PersonneMembre.Nom } onChange={(e) => setPersonneMembre({...PersonneMembre,Nom : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Prenom Membre</label>
                        <input type="text" className="form-control"  placeholder="Prenom" value={ PersonneMembre.Prenom } onChange={(e) => setPersonneMembre({...PersonneMembre,Prenom : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Adresse</label>
                        <input type="text" className="form-control"  placeholder="Adresse" value={ PersonneMembre.Adresse } onChange={(e) => setPersonneMembre({...PersonneMembre,Adresse : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Date de Naissance</label>
                        <input type="date" className="form-control"  placeholder="Date de Naissance" value={ PersonneMembre.DateNaissance } onChange={(e) => setPersonneMembre({...PersonneMembre,DateNaissance : e.target.value})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"  placeholder="Email" value={ PersonneMembre.Email } onChange={(e) => setPersonneMembre({...PersonneMembre,Email : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                        <label>Telephone</label>
                        <input className="form-control"  placeholder="Numero de telephone" value={ PersonneMembre.Telephone } onChange={(e) => setPersonneMembre({...PersonneMembre,Telephone : e.target.value,})}/>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                      <label>Genre</label>
                        <select className="form-control" value={ PersonneMembre.IdGenre } onChange={(e) => setPersonneMembre({...PersonneMembre,IdGenre : e.target.value,})}>
                        <option>CHoisier Genre</option>
                        {Array.isArray(Genre) ? (
                            Genre.map(Genre => (
                                <option key={Genre.id} value={Genre.id} clasName="form-control">
                                  {Genre.nomGenre}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                      </div>
                    </div>

                    <div className="col-md-5 pr-1">
                      <div className="form-group">
                      <label>Village</label>
                        <select className="form-control" value={ PersonneMembre.IdVillage } onChange={(e) => setPersonneMembre({...PersonneMembre,IdVillage : e.target.value,})}>
                        <option>CHoisier un Village</option>
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

                    <div className="col-md-3 pr-1 mt-3">
                      <button className="btn btn-success btn-block" style={{'fontSize' : '18px'}} type="submit">Valider</button>
                    </div>
                  </div> 
                </form>
              </div>
            </div>
    </div>
  )
}

export default InsertionMembre
