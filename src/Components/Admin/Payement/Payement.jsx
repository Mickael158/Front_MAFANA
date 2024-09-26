import { useState } from "react"
import Cotisation from "./Cotisation";
import Don from "./Don";
import Materiel from "./Materiel";

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
                <p className="category">Les operations de payement Chez<a href="#"> MA.FA.NA</a></p>
              </div>
              <div className="card-body all-icons">
                <div className="row">
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(0);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons business_money-coins fs-2"></i>
                      <p className="fs-6">Cotisation</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(1);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons ui-2_favourite-28 fs-2"></i>
                      <p className="fs-6">Donation</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(2);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons shopping_cart-simple fs-2"></i>
                      <p className="fs-6">Materiel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {page === 0 && <Cotisation />}
            {page === 1 && <Don />}
            {page === 2 && <Materiel />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Payement
