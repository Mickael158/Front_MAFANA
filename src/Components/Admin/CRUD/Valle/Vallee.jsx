import { useState } from "react";
import ListeValle from "./ListeValle";
import InsertionValle from "./InsertionValle";
import ModifierVallee from "./ModifierVallee";

const Vallee = () => {
    const [page, setPage] = useState(0);
    
  return (
    <>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Vallée</h4></div>
                    <div className="col-md-8 d-flex">
                        <button className="btn btn-info btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(0);
              }}>Liste</button>
                        <button className="btn btn-primary btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(1);
              }}>Modifier</button>
                        <button className="btn btn-success btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(2);
              }}>Nouveau</button>
                    </div>
                </div>
              </div>
              <div className="card-body">
                {page === 0 && <ListeValle />}
                {page === 1 && <ModifierVallee />}
                {page === 2 && <InsertionValle />}
                
                
              </div>
            </div>
    </>
  )
}

export default Vallee
