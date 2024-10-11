
import {  useState } from "react";
import ListeRole from "./ListeRole";
import ModifierRole from "./ModifierRole";
import InsertionRole from "./InsertionRole";

function Role() {
    const [page, setPage] = useState(0);
  return (
    <>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Rôle</h4></div>
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
                {page === 0 && <ListeRole />}
                {page === 1 && <ModifierRole />}
                {page === 2 && <InsertionRole />}
                
                
              </div>
            </div>
    </>
  )
}

export default Role
