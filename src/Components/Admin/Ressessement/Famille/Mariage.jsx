import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Mariage = () => {
    const [DateMariage,setDateMariage] = useState('');
    const [IdMari,setIdMari] = useState('');
    const [IdFemme,setIdFemme] = useState('');
    const token = localStorage.getItem("token");

    const [Mari,setMari] = useState('');
    const ListeMari = () => {
        axios.get('https://localhost:8000/api/PersonneGenre/Homme',{
        headers: 
        {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => {
            setMari(response.data)
        });
    }; 

    const [Femme,setFemme] = useState('');
    const ListeFemme = () => {
        axios.get('https://localhost:8000/api/PersonneGenre/Femme',{
        headers: 
        {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => {
            setFemme(response.data)
        });
    }; 

    const submit = (event) => {
        event.preventDefault();
        if (!IdMari || !IdFemme) {
          toast.error("Les identifiants des mariés sont requis.");
          return; 
      }

      const today = new Date(); 
      const selectedDate = new Date(DateMariage); 

      if (selectedDate > today) {
          toast.error("La date de mariage ne peut pas être dans le futur.");
          return; 
      }
      try
      {
        console.log(DateMariage)
        axios.post('https://127.0.0.1:8000/api/Mariage',
        { 
          Id_Mari : IdMari,
          Id_Femme : IdFemme,
          Date_Mariage : DateMariage
        },
        {
          headers: 
          {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
        
      );
      toast.success("Félicitation Mariage inserer");
      setDateMariage('');
    }
    catch(error)
    {
      toast.error('Erreur d\'insertion' , error);

    }
    }

    useEffect(() => {
        ListeMari();
        ListeFemme();
    }, []);
    return (
        <>
            <form onSubmit={submit}>
                  <div className="row mb-5">
                  <ToastContainer/>
                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                        <label>Date de Mariage</label>
                        <input type="date" className="form-control"  placeholder="Date de Naissance" value={ DateMariage } onChange={(e) => setDateMariage(e.target.value)}/>
                      </div>
                    </div>

                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                      <label>Mari</label>
                        <select className="form-control" value={ IdMari } onChange={(e) => setIdMari(e.target.value)}>
                        <option>Choisisez le mari</option>
                        {Array.isArray(Mari) ? (
                            Mari.map(Mari => (
                                <option key={Mari.id} value={Mari.id} className="form-control">
                                  {Mari.nomMembre}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4 pr-1">
                      <div className="form-group">
                      <label>Femme</label>
                        <select className="form-control" value={ IdFemme } onChange={(e) => setIdFemme(e.target.value)}>
                        <option>Choisisez la marie</option>
                        {Array.isArray(Femme) ? (
                            Femme.map(Femme => (
                                <option key={Femme.id} value={Femme.id} className="form-control">
                                  {Femme.nomMembre}
                                </option>
                            ) )
                        ) : ( <option>Aucune Valeur</option> ) }
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3 pr-1 mt-3">
                      <button className="btn btn-success btn-block" style={{'fontSize' : '15px'}} type="submit">Valider</button>
                    </div>
                  </div> 
                </form>
        </>
    )
}

export default Mariage