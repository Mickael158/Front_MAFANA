import { useState } from "react"
import DemandeFinancier from "./DemandeFinancier";
import DemandeMateriel from "./DemandeMateriel";

const Payement = () => {
    const [page, setPage] = useState(0);
  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="title">VOUS CHOISISSEZ</h5>
                <p className="category">Les operations de demande Chez<a href="#"> MA.FA.NA</a></p>
              </div>
              <div className="card-body all-icons">
                <div className="row">
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(0);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons shopping_credit-card fs-2"></i>
                      <p className="fs-6">Financier</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(1);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons shopping_cart-simple fs-2"></i>
                      <p className="fs-6">Tragnombe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {page === 0 && <DemandeFinancier />}
            {page === 1 && <DemandeMateriel />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Payement
