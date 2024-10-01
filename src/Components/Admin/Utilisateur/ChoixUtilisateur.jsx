import React from 'react'
import Nouveau from './Nouveau';
import { useEffect, useState } from "react";

const ChoixUtilisateur = () => {
    const [page, setPage] = useState(0);
  return (
    <>
    <div className="panel-header panel-header-sm">
      </div>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title">Gestion d utilisateur</h4></div>
                    <div className="col-md-8 d-flex">
                    <button className="btn btn-warning btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(0);
                }}>Nouveau</button>
                      <button className="btn btn-success btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(2);
                }}>Modification</button>
                    </div>
                </div>
              </div>
              <div className="card-body">
                {page === 0 && <Nouveau />} 
              </div>
            </div>
    </>
  )
}

export default ChoixUtilisateur
