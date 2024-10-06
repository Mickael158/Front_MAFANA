import axios from 'axios';
import { useEffect, useState } from 'react';

const Header = () => {
  const [Association, setAssociation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ListeAssociation = async () => {
    const response = await axios.get('https://localhost:8000/api/Associations/1');
    setAssociation(response.data);
  }

  useEffect(() => {
    ListeAssociation();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-5 py-3 start-0 end-0 mx-0">
              <div className="container-fluid px-0">
                <a className="navbar-brand font-weight-bolder ms-sm-3 text-primary" href="#" rel="tooltip" title="Designed and Coded by Creative Tim" data-placement="bottom" target="_blank">
                  <img className="img img-fluid" style={{ 'width': '50px' }} src="/affichage/logo.png" alt="" />{Association.Nom}
                </a>
                <button className="navbar-toggler shadow-none ms-2" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className={`collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100 ${isMenuOpen ? 'show' : ''}`} id="navigation">
                  <ul className="navbar-nav navbar-nav-hover m-auto">
                    <li className="nav-item ms-lg-auto">
                      <a className="nav-link nav-link-icon me-2" href="#accueil">
                        <i className="fas fa-home"></i>
                        <p className="d-inline text-lg z-index-1 font-weight-bold text-info" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tongasoa" style={{"borderBottom":"1px solid blue"}}>Accueil</p>
                      </a>
                    </li>
                    <li className="nav-item ms-lg-auto">
                      <a className="nav-link nav-link-icon me-2" href="#apropos">
                        <i className="fas fa-info-circle"></i>
                        <p className="d-inline text-lg text-info z-index-1 font-weight-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Momba ahy" style={{"borderBottom":"1px solid blue"}}>A propos</p>
                      </a>
                    </li>
                    <li className="nav-item ms-lg-auto">
                      <a className="nav-link nav-link-icon me-2" href="#qui">
                        <i className="fas fa-user"></i>
                        <p className="d-inline text-lg text-info z-index-1 font-weight-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Iza moa izahay" style={{"borderBottom":"1px solid blue"}}>Qui sommes-nous</p>
                      </a>
                    </li>
                    <li className="nav-item ms-lg-auto">
                      <a className="nav-link nav-link-icon me-2" href="#contact">
                        <i className="fas fa-mail-bulk"></i>
                        <p className="d-inline text-lg text-info z-index-1 font-weight-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Fifandraisana" style={{"borderBottom":"1px solid blue"}}>Contact</p>
                      </a>
                    </li>
                    <li className="nav-item ms-lg-auto">
                      <a className="nav-link nav-link-icon me-2" href="#evenement">
                        <i className="fas fa-calendar-alt"></i>
                        <p className="d-inline text-lg text-info z-index-1 font-weight-bold" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Hetsika" style={{"borderBottom":"1px solid blue"}}>Événement</p>
                      </a>
                    </li>
                  </ul>
                  <a href="/login" className="btn btn-sm bg-gradient-warning mb-0 me-1 mt-2 mt-md-0 d-flex gap-1 align-items-center justify-content-center">
                    <i className="fas fa-user-circle fs-6"></i> SE CONNECTER
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;