
import { useState,useEffect } from "react"

import CRUD from "../CRUD/CRUD"
import Navbars from "../Layout/Navbars"
import Statistic from "../Statistic/Statistic"
import Evenement from "../Evenement/Evenement"
import Association from "../Association/Association"
import Ressenssement from "../Ressessement/RessessementMembre"
import { useNavigate } from "react-router-dom";
import ChoixPayement from "../Payement/ChoixPayement"
import ChoixDemande from "../Demande/ChoixDemande"
import Etat from "../Etat/Etat";
import ChoixUtilisateur from "../Utilisateur/ChoixUtilisateur"

const Dashbord = () => {
  const [page, setPage] = useState(0);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedRoles = localStorage.getItem('decode');
    
    if (storedRoles) {
      setRoles(storedRoles.split(','));  
    }
  }, []);

  const deconnexion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('decode');
    navigate('/login');
  }
  const hasRole = (role) => {
    return roles.includes(role);
  };
  return (
    <>
      <div className="wrapper ">
      <div className="sidebar" data-color="blue">
      <div className="logo">
        <a href="#" className="simple-text ">
        <img className="img img-fluid" style={{ 'width' : '50px' }} src="/affichage/logo.png" alt=""/>  MA.FA.NA
        </a>
      </div>
      <div className="sidebar-wrapper" id="sidebar-wrapper">
        <ul className="nav">
        <li className="active"
            onClick={() => {
                setPage(0);
              }}
              >
            <a href="#">
              <i className="now-ui-icons design_app"></i>
              <p>Tableau de bord</p>
            </a>
          </li>
          {hasRole('ROLE_ADMIN') && (
                <>
                  
          <li onClick={() => {
                setPage(4);
              }}>
            <a href="#">
              <i className="now-ui-icons education_atom"></i>
              <p>Association</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(3);
              }}>
            <a href="#">
              <i className="now-ui-icons business_badge"></i>
              <p>Ressessement</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(6);
              }}>
            <a href="#">
              <i className="now-ui-icons ui-1_bell-53"></i>
              <p>Demande</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(7);
              }}>
            <a href="#">
              <i className="now-ui-icons users_single-02"></i>
              <p>Etat Membre</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(2);
              }}>
            <a href="#">
              <i className="now-ui-icons ui-1_calendar-60"></i>
              <p>Evenement</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(1);
              }}>
            <a href="#">
              <i className="now-ui-icons ui-1_settings-gear-63"></i>
              <p>CRUD</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(5);
              }}>
            <a href="#">
              <i className="now-ui-icons design_bullet-list-67"></i>
              <p>AQUISITION</p>
            </a>
          </li>
          <li onClick={() => {
                setPage(8);
              }}>
            <a href="#">
              <i className="now-ui-icons design_bullet-list-67"></i>
              <p>Utilisateur</p>
            </a>
          </li>
                </>
              )}

{hasRole('ROLE_CRUD') && (
                <>
                  <li onClick={() => setPage(1)}>
                    <a href="#">
                      <i className="now-ui-icons ui-1_settings-gear-63"></i>
                      <p>CRUD</p>
                    </a>
                  </li>
                </>
              )}

{hasRole('ROLE_ASSOCIATION') && (
                <>
                 <li onClick={() => {
                setPage(4);
              }}>
            <a href="#">
              <i className="now-ui-icons education_atom"></i>
              <p>Association</p>
            </a>
          </li>
                </>
              )}
              {hasRole('ROLE_MEMBRE') && (
                <>
                 <li onClick={() => {
                setPage(3);
              }}>
            <a href="#">
              <i className="now-ui-icons business_badge"></i>
              <p>Ressessement</p>
            </a>
          </li>
                </>
              )}

{hasRole('ROLE_DEMANDE') && (
                <>
                  <li onClick={() => {
                setPage(6);
              }}>
            <a href="#">
              <i className="now-ui-icons ui-1_bell-53"></i>
              <p>Demande</p>
            </a>
          </li>
                </>
              )}
              {hasRole('ROLE_PAYEMENT') && (
                <>
                  <li onClick={() => {
                setPage(5);
              }}>
            <a href="#">
              <i className="now-ui-icons design_bullet-list-67"></i>
              <p>AQUISITION</p>
            </a>
          </li>
                </>
              )}
          <li className="active-pro" onClick={deconnexion}>
            <a href="#">
              <i className="now-ui-icons arrows-1_cloud-download-93"></i>
              <p>Deconnexion</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
      <div className="main-panel" id="main-panel">
        <Navbars />
        {page === 0 && <Statistic />}
        {page === 1 && <CRUD />}
        {page === 2 && <Evenement />}
        {page === 3 && <Ressenssement /> }
        {page === 4 && <Association />}
        {page === 5 && <ChoixPayement />}
        {page === 6 && <ChoixDemande />}
        {page === 7 && <Etat />}
        {page === 8 && <ChoixUtilisateur />}
      </div>
    </div>
    </>
  )
}

export default Dashbord
