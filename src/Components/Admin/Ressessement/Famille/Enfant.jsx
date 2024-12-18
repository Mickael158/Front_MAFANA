import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Enfant = () => {
    const [Pere,setPere] = useState('');
    const [PersonneEnfant,setPersonneEnfant] = useState('');
    const [PereEnfant,setPereEnfant] = useState('');
    const token = localStorage.getItem("token");

    const ListePere = () => {
        axios.get('https://localhost:8000/api/Personne_parent',{
        headers: 
        {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => {
            setPereEnfant(response.data)
        });
    }; 

    const [Enfant,setEnfant] = useState('');
    const ListeEnfant = () => {
        axios.get('https://localhost:8000/api/PersonneEnfant',{
        headers: 
        {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => {
            setEnfant(response.data)
        });
    }; 


    const submit = (event) => {
        event.preventDefault();
      try
      {
         axios.post('https://127.0.0.1:8000/api/Enfant',
        { 
          id_pere : Pere,
          id_enfant : PersonneEnfant
        },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
        
      );
      toast.success("Félicitation Enfant inserer");
    }
    catch(error)
    {
      toast.error('Erreur d\'insertion' , error);
    }
    }

    useEffect(() => {
        ListePere();
        ListeEnfant();
    } , [])
    return (
        <>  
        <form onSubmit={submit}>
        <div className="col-md-5 pr-1">
        <ToastContainer/>
            <div className="form-group">
                <label>Père et Mère</label>
                <select className="form-control" value={ Pere } onChange={(e) => setPere(e.target.value)}>
                <option>Choisisez les parents</option> 
                    {Array.isArray(PereEnfant) ? (
                        PereEnfant.map(PereEnfant => (
                            <option key={PereEnfant['id']} value={PereEnfant['id']} >
                                {PereEnfant['nommari'] } {PereEnfant['pernommari'] } marier avec {PereEnfant['nommarie']} {PereEnfant['prenommarie'] } 
                            </option>
                    ) )
                    ) : ( <option>Aucune Valeur</option> ) }
                </select>
            </div>
        </div>    
        <div className="col-md-5 pr-1">
            <div className="form-group">
                <label>Enfant</label>
                <select className="form-control" value={ PersonneEnfant } onChange={(e) => setPersonneEnfant(e.target.value)}>
                <option>Choisisez l'enfant</option> 
                    {Array.isArray(Enfant) ? (
                        Enfant.map(Enfant => (
                            <option key={Enfant.id} value={Enfant.id} >
                                {Enfant.nomMembre} {Enfant.prenomMembre}
                            </option>
                    ) )
                    ) : ( <option>Aucune Valeur</option> ) }
                </select>
            </div>
        </div>  
        <button className="btn btn-outline-success" type="submit">Valider</button> 
        </form>     
        </>
    )
}

export default Enfant