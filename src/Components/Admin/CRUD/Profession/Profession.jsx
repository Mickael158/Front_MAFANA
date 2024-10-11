import { useState } from "react";
import ListeProfession from "./ListeProfession";
import ModifierProfession from "./ModifierProfession";
import InsertionProfession from "./InsertionProfession";

const Profession = () => {
    const [page, setPage] = useState(0);
    
  return (
    <>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Profession</h4></div>
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
                {page === 0 && <ListeProfession />}
                {page === 1 && <ModifierProfession />}
                {page === 2 && <InsertionProfession />}
                
                
              </div>
            </div>
    </>
  )
}

export default Profession
