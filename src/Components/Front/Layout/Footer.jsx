import axios from 'axios';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [Asoociation,setAsoociation] = useState('');

  const ListeAssociation = async () => {
      const response = await axios.get('https://localhost:8000/api/Associations/1');
      setAsoociation(response.data);
  }
  useEffect(()=>{
    ListeAssociation();
},[]);
    return (
        <>
            <footer className="footer pt-5 border ">
  <div style={{'width':'83%','margin':'auto'}}>
    <div className=" row">
      <div className="col-md-3 mb-4 ms-auto">
        <div>
          <a href="https://www.creative-tim.com/product/material-kit">
            <img src="/affichage/logo.png" className="mb-3 footer-logo " alt="main_logo"/>
          </a>
          <h6 className="font-weight-bolder mb-4">{Asoociation.Nom}</h6>
        </div>
      </div>



      <div className="col-md-3 col-sm-6 col-6 mb-4">
        <div>
          <h6 className="text-sm">Contenus</h6>
          <ul className="flex-column ms-n3 nav">
            <li className="nav-item">
              <a className="nav-link" href="#accueil" >
                Accueil
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#apropos" >
                A propos
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#qui" >
                Qui somme nous
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contact" >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#evenement" >
                Evenement
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 col-6 mb-4">
        <div>
          <h6 className="text-sm">Technologie</h6>
          <ul className="flex-column ms-n3 nav">
            <li className="nav-item">
              <a className="nav-link" href="#" >
                Symfony
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
                ReactJS
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
                Postgres
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-md-3 col-sm-6 col-6 mb-4">
        <div>
          <h6 className="text-sm">Contacts</h6>
          <ul className="flex-column ms-n3 nav">

            <li className="nav-item">
              <a className="nav-link" href="#" >
                {Asoociation.Siege}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
              {Asoociation.Telephone}
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
              {Asoociation.Email}
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* <div className="col-md-2 col-sm-6 col-6 mb-4 me-auto">
        <div>
          <h6 className="text-sm"></h6>
          <ul className="flex-column ms-n3 nav">
            <li className="nav-item">
              <a className="nav-link" href="#" >
                
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
                
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#" >
                
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="col-12">
        <div className="text-center">
          <p className="text-dark my-4 text-sm font-weight-normal">
            Copyright © <script>document.write(new Date().getFullYear())</script> MA.FA.NA
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
        </>
    );
    
};

export default Footer;