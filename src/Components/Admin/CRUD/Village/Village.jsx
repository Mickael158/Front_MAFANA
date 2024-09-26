import { useState } from "react";
import InsertionVillage from "./InsertionVillage";
import ListeVillage from "./ListeVillage";
import ModifierVillage from "./ModifierVillage";

const Village = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Village</h4></div>
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
                {page === 0 && <ListeVillage />}
                {page === 1 && <ModifierVillage />}
                {page === 2 && <InsertionVillage />}
                
                
              </div>
            </div>
  )
}

export default Village
