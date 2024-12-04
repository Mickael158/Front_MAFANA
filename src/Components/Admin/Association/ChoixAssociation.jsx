import Association from './Association';
import Apropos from './Apropos';
import Qui from './Qui';
import { useState } from 'react';

const ChoixAssociation = () => {
    const [page, setPage] = useState(0);
  return (
    <>
    <div className="panel-header panel-header-sm">
    </div>
        <div className="card">
              <div className="card-header">
                <div className="row">
                    <div className="col-md-4"><h4 className="card-title"> Association</h4></div>
                    <div className="col-md-8 d-flex">
                    <button className="btn btn-info btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(0);
                }}>Association</button>
                <button className="btn btn-info btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                setPage(1);
              }}>A propos</button>
                      <button className="btn btn-info btn-block" style={{'width': '50%'}} type="submit" onClick={() => {
                  setPage(2);
                }}>Qui somme Nous</button>
                        
                    </div>
                </div>
              </div>
              <div className="card-body">
                {page === 0 && <Association />}  
                {page === 1 && <Apropos />}
                {page === 2 && <Qui />}
              </div>
            </div>
    </>
  )
}

export default ChoixAssociation