import { useState } from "react";
import Demande from "./Demande";
import ChoixListeDemande from "./ChoixListeDemande";

const ChoixDemande = () => {
    const [page, setPage] = useState(0);
  return (
    <>
      <div className="panel-header panel-header-sm">
      </div>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title">Vous voulez faire quoi</h4></div>
                    <div className="col-md-8 d-flex">
                    <button className="btn btn-warning btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(0);
                }}>Liste Demande</button>
                      <button className="btn btn-success btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(1);
                }}>Nouveau Demande</button>
                    </div>
                </div>
              </div>
              <div className="card-body">
                {page === 1 && <Demande />}
                {page === 0 && <ChoixListeDemande />}
              </div>
            </div>
    </>
  )
}

export default ChoixDemande
