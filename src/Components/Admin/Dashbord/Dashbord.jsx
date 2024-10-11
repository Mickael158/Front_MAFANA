import { useState, useEffect } from "react";
import CRUD from "../CRUD/CRUD";
import Statistic from "../Statistic/Statistic";
import Evenement from "../Evenement/Evenement";
import Association from "../Association/Association";
import Ressenssement from "../Ressessement/RessessementMembre";
import { useNavigate } from "react-router-dom";
import ChoixPayement from "../Payement/ChoixPayement";
import ChoixDemande from "../Demande/ChoixDemande";
import Etat from "../Etat/Etat";
import ChoixUtilisateur from "../Utilisateur/ChoixUtilisateur";

const Dashbord = () => {
  const [page, setPage] = useState(0);
  const [roles, setRoles] = useState([]);
  const [navOpen, setNavOpen] = useState(false); // État pour la navigation
  const navigate = useNavigate();

  // Charger les rôles dès le chargement du composant
  useEffect(() => {
    const storedRoles = localStorage.getItem("decode");
    if (storedRoles) {
      setRoles(storedRoles.split(","));
    }
  }, []); // La dépendance vide signifie que cela ne s'exécute qu'une fois, au chargement initial

  // Fonction de déconnexion
  const deconnexion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("decode");
    navigate("/login");
  };

  // Vérifier si l'utilisateur a un certain rôle
  const hasRole = (role) => {
    return roles.includes(role);
  };

  // Fonction pour basculer la classe nav-open
  const toggleNav = () => {
    setNavOpen(!navOpen); // Inverse l'état de navOpen
  };

  return (
    <div className={`perfect-scrollbar-on ${navOpen ? "nav-open" : ""}`}>
      <div className="wrapper">
        <div className="sidebar" data-color="blue">
          <div className="logo">
            <a href="#" className="simple-text">
              <img
                className="img img-fluid"
                style={{ width: "50px" }}
                src="/affichage/logo.png"
                alt="Logo"
              />{" "}
              MA.FA.NA
            </a>
          </div>
          <div className="sidebar-wrapper" id="sidebar-wrapper">
            <ul className="nav">
              <li className={page === 0 ? "active" : ""} onClick={() => setPage(0)}>
                <a href="#">
                  <i className="now-ui-icons design_app"></i>
                  <p>Tableau de bord</p>
                </a>
              </li>
              {/* Afficher les éléments selon les rôles */}
              {hasRole("ROLE_ADMIN") && (
                <>
                  <li className={page === 4 ? "active" : ""} onClick={() => setPage(4)}>
                    <a href="#">
                      <i className="now-ui-icons education_atom"></i>
                      <p>Association</p>
                    </a>
                  </li>
                  <li className={page === 3 ? "active" : ""} onClick={() => setPage(3)}>
                    <a href="#">
                      <i className="now-ui-icons business_badge"></i>
                      <p>Ressessement</p>
                    </a>
                  </li>
                  <li className={page === 6 ? "active" : ""} onClick={() => setPage(6)}>
                    <a href="#">
                      <i className="now-ui-icons ui-1_bell-53"></i>
                      <p>Demande</p>
                    </a>
                  </li>
                  <li className={page === 7 ? "active" : ""} onClick={() => setPage(7)}>
                    <a href="#">
                      <i className="now-ui-icons users_single-02"></i>
                      <p>Etat Membre</p>
                    </a>
                  </li>
                  <li className={page === 2 ? "active" : ""} onClick={() => setPage(2)}>
                    <a href="#">
                      <i className="now-ui-icons ui-1_calendar-60"></i>
                      <p>Evenement</p>
                    </a>
                  </li>
                  <li className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>
                    <a href="#">
                      <i className="now-ui-icons ui-1_settings-gear-63"></i>
                      <p>CRUD</p>
                    </a>
                  </li>
                  <li className={page === 5 ? "active" : ""} onClick={() => setPage(5)}>
                    <a href="#">
                      <i className="now-ui-icons design_bullet-list-67"></i>
                      <p>AQUISITION</p>
                    </a>
                  </li>
                  <li className={page === 8 ? "active" : ""} onClick={() => setPage(8)}>
                    <a href="#">
                      <i className="now-ui-icons users_single-02"></i>
                      <p>Utilisateur</p>
                    </a>
                  </li>
                </>
              )}
              {hasRole("ROLE_CRUD") && (
                <li className={page === 1 ? "active" : ""} onClick={() => setPage(1)}>
                  <a href="#">
                    <i className="now-ui-icons ui-1_settings-gear-63"></i>
                    <p>CRUD</p>
                  </a>
                </li>
              )}
              {hasRole("ROLE_ASSOCIATION") && (
                <li className={page === 4 ? "active" : ""} onClick={() => setPage(4)}>
                  <a href="#">
                    <i className="now-ui-icons education_atom"></i>
                    <p>Association</p>
                  </a>
                </li>
              )}
              {hasRole("ROLE_MEMBRE") && (
                <li className={page === 3 ? "active" : ""} onClick={() => setPage(3)}>
                  <a href="#">
                    <i className="now-ui-icons business_badge"></i>
                    <p>Ressessement</p>
                  </a>
                </li>
              )}
              {hasRole("ROLE_DEMANDE") && (
                <li className={page === 6 ? "active" : ""} onClick={() => setPage(6)}>
                  <a href="#">
                    <i className="now-ui-icons ui-1_bell-53"></i>
                    <p>Demande</p>
                  </a>
                </li>
              )}
              {hasRole("ROLE_PAYEMENT") && (
                <li className={page === 5 ? "active" : ""} onClick={() => setPage(5)}>
                  <a href="#">
                    <i className="now-ui-icons design_bullet-list-67"></i>
                    <p>AQUISITION</p>
                  </a>
                </li>
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
          <nav className="navbar navbar-expand-lg navbar-transparent bg-primary navbar-absolute">
            <div className="container-fluid">
              <div className={`navbar-toggle ${navOpen ? "toggled" : ""}`}>
                <button
                  type="button"
                  className="navbar-toggler"
                  onClick={toggleNav} // Appel de la fonction pour basculer l'état
                >
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </button>
              </div>
              <div className="navbar-wrapper">
                <a className="navbar-brand" href="#pablo">
                  Statistique
                </a>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navigation">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#pablo">
                      <i className="now-ui-icons users_single-02"></i>
                      <p>
                        <span className="d-lg-none d-md-block">Deconnexion</span>
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Affichage de la page en fonction de l'état */}
          
            {page === 0 && <Statistic />}
            {page === 1 && <CRUD />}
            {page === 2 && <Evenement />}
            {page === 3 && <Ressenssement />}
            {page === 4 && <Association />}
            {page === 5 && <ChoixPayement />}
            {page === 6 && <ChoixDemande />}
            {page === 7 && <Etat />}
            {page === 8 && <ChoixUtilisateur />}
          
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
