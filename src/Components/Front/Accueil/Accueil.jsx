import axios from 'axios';
import { useEffect, useState } from 'react';


const Accueil = () => {
  const [Asoociation,setAsoociation] = useState('');
  const [Membre,setMembre] = useState('');
  const [Valle,setValle] = useState('');
  const [Evenement,setEvenement] = useState('');

  const ListeAssociation = async () => {
      const response = await axios.get('https://localhost:8000/api/Associations/1');
      setAsoociation(response.data);
  }
  const TotalMembre = async () => {
    const response = await axios.get('https://localhost:8000/api/Personne_Total');
    setMembre(response.data);
  }
  const TotalEvenement = async () => {
    const response = await axios.get('https://localhost:8000/api/Evenement_Total');
    setEvenement(response.data);
  }
  const TotalValle = async () => {
    const response = await axios.get('https://localhost:8000/api/Valle_Total');
    setValle(response.data);
  }
  useEffect(()=>{
    ListeAssociation();
    TotalMembre();
    TotalEvenement();
    TotalValle();
},[]);
    return (
        <>
          <header className="header-2" id="accueil">
                <div className="page-header min-vh-75 relative" style={{ 'backgroundImage': 'url("/affichage/fond_1.jpg")' }}>
                  <span className="mask bg-gradient-secondary opacity-6"></span>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-7 text-center mx-auto">
                        <h1 className="text-white pt-3 mt-n5 ">{Asoociation.Slogan}</h1>
                        <p className="lead text-white mt-3">
                        {Asoociation.Description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </header>
            <div className="card card-body blur shadow-blur  mx-md-10 mt-n6">

<section className="pt-3 pb-4" id="count-stats">
  <div className="container">
    <div className="row">
      <div className="col-lg-9 mx-auto py-3">
        <div className="row">
          <div className="col-md-4 position-relative">
            <div className="p-3 text-center">
              <h1 className="text-gradient text-info"><span id="state1" >{Membre}</span>+</h1>
              <h5 className="mt-3">Membres</h5>
              <p className="text-sm font-weight-normal">Regroupant les 3 Vallees</p>
            </div>
            <hr className="vertical dark"/>
          </div>
          <div className="col-md-4 position-relative">
            <div className="p-3 text-center">
              <h1 className="text-gradient text-info"> <span id="state2" >{Evenement}</span>+</h1>
              <h5 className="mt-3">Evènement</h5>
              <p className="text-sm font-weight-normal">Fait depuis</p>
            </div>
            <hr className="vertical dark"/>
          </div>
          <div className="col-md-4">
            <div className="p-3 text-center">
              <h1 className="text-gradient text-info" id="state3" >{Valle}</h1>
              <h5 className="mt-3">Valléé</h5>
              <p className="text-sm font-weight-normal">Au Sud de Madagascar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
        </>
    );
};

export default Accueil;