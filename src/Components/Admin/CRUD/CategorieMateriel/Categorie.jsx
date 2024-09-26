import { useState } from "react";
import ListeCategorie from "./ListeCategorie";
import ModifierCategorie from "./ModifierCategorie";
import InsertionCategorie from "./InsertionCategorie";

const Categorie = () => {
    const [page, setPage] = useState(0);
    
  return (
    <>
      <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Categorie materiel</h4></div>
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
                {page === 0 && <ListeCategorie />}
                {page === 1 && <ModifierCategorie />}
                {page === 2 && <InsertionCategorie />}
                
                
              </div>
            </div>
    </>
  )
}

export default Categorie
