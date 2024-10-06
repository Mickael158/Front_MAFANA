
const Navbars = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a className="navbar-brand" href="#pablo">Statistique</a>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
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
    </>
  )
}

export default Navbars
