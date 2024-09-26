import axios from "axios";
import { useEffect, useState } from "react"
import '../../../assets/TelInput/css/intlTelInput.min.css'
import '../../../assets/TelInput/js/intlTelInputWithUtils.js'

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
      try
      {
        const response = axios.post('https://127.0.0.1:8000/api/Personne',
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
      console.log("Personne inserer");
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
    }
  }
  useEffect(() => {
      ListeVillage();
      ListeGenre();
  }, []);

  return (
    <div>
      
      <div className="card">
              <div className="card-header">
                <h5 className="title">MA.FA.NA</h5>
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
