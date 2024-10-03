
import "../../../assets/admin/js/core/jquery.min.js"
import General from "./General.jsx";
import Cotisation from "./Cotisation.jsx";
import Donnation from "./Donnation.jsx";
import Membre from "./Membre.jsx";

const Statistic = () => {
  
  return (
    <>
      <div className="panel-header panel-header-lg">
        <General />
      </div>
      <div className="content">
        <div className="row">
          <div className="col-lg-4">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Cette annee</h5>
                <h4 className="card-title">Cotisations</h4>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Cotisation />
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69"></i> Voir detail
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Cette Annee</h5>
                <h4 className="card-title">Donnations</h4>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Donnation />
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69"></i> Voir detail
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Cette Annee</h5>
                <h4 className="card-title">Membre Inscrit cette annee</h4>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Membre />
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm"></i> Voir Tous
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
          
    </>
  )
}

export default Statistic
