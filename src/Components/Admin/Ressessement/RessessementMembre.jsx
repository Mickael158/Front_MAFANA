import { useEffect, useState } from "react";
import ModificationMembre from "./ModificationMembre";
import InsertionMembre from "./InsertionMembre";
import ListeMembre from "./ListeMembre";
import Famille from "./Famille/Famille";

const Ressenssement = () => {

  const [page, setPage] = useState(0);
      
  return (
    <>
      <div className="panel-header panel-header-sm">
      </div>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Membre</h4></div>
                    <div className="col-md-8 d-flex">
                    <button className="btn btn-warning btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(0);
                }}>Liste</button>
                      <button className="btn btn-success btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(2);
                }}>Nouveau</button>
                        <button className="btn btn-primary btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(1);
              }}>Modification</button>
              <button className="btn btn-info btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(3);
              }}>Famille</button>
                        
                    </div>
                </div>
              </div>
              <div className="card-body">
                {page === 0 && <ListeMembre />}  
                {page === 1 && <ModificationMembre />}
                {page === 2 && <InsertionMembre />}
                {page === 3 && <Famille />}
              </div>
            </div>
    </>
  )
}

export default Ressenssement
