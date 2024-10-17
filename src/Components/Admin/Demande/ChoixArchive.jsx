import { useState } from "react";
import ArchiveMateriel from "./ArchiveMateriel";
import ArchiveFinancier from "./ArchiveFinancier";

const ChoixArchive = () => {
    const [page, setPage] = useState(0);
  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="title">VOUS CHOISISSEZ</h5>
                <p className="category">Les opérations de demande Chez<a href="#"> MA.FA.NA</a></p>
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
                      <p className="fs-6">Matériel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {page === 1 && <ArchiveMateriel />}
            {page === 0 && <ArchiveFinancier />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChoixArchive
