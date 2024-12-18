import { useState } from "react";
import Enfant from "./Enfant";
import Liste from "./Liste";
import Mariage from "./Mariage";

const Famille = () => {
  const [page,setPage] = useState(0);  
  return (
        <>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="title">FAMILLE</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-info" onClick={() => {
                setPage(0);
              }}>Personne Mariée</button>
                  <button className="btn btn-info" onClick={() => {
                setPage(1);
              }}>Nouveau Marié</button>
                  <button className="btn btn-info" onClick={() => {
                setPage(2);
              }}>Enfant</button>
                </div>
              </div>
              <div className="card-body">
              {page === 0 && <Liste />}
              {page === 1 && <Mariage />}
              {page === 2 && <Enfant />}
              </div>
            </div>
        </>
    );
};

export default Famille;