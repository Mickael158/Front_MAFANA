import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Apropos = () => {
    const [mot,setMot]=useState('');
    const token = localStorage.getItem('token');
    const BaseApropos = async () => {
        try {
            const response = await axios.get('https://localhost:8000/api/Aproposs/1');
            setMot(response.data.Mots);
        } catch (error) {
            console.error(error);
        }     
    }
    const Modifier = async (event) => {
        if(event){
            event.preventDefault();
        }
        try {
            const response = await axios.post('https://localhost:8000/api/Apropos/1',{Mots:mot},
                {
                    headers:
                    {
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Erreur de modification!");
        }
    }
    useEffect(()=>{
        BaseApropos();
    },[])
  return (
    <>
    <ToastContainer />
    <div className="card">
    </div>
    <div className="content">
        <div className="row">
          <div className="col-md-12">
              <div className="card">
              <div className="card-header">
                <h5 className="title">Apropos de l'Association</h5>
              </div>
              <div className="card-body">
                <form onSubmit={Modifier}>
                  <div className="row">
                    <div className="col-md-12 px-1">
                      <div className="form-group">
                        <label>Mot du professeur</label>
                        <textarea type="text" className="form-control" placeholder="Mot de Monsieur le professeur" value={mot} onChange={(e) => setMot(e.target.value)}></textarea>
                      </div>
                    </div> 
                  </div>
                  <button type='submit' className='btn btn-success'>Valider</button>
                </form>
              </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Apropos