import { useEffect , useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const navigate = useNavigate();
  const [Asoociation,setAsoociation] = useState('');

  const ListeAssociation = async () => {
      const response = await axios.get('https://localhost:8000/api/Associations/1');
      setAsoociation(response.data);
  }
  const decodeToken = async (decode) => {
    try{
      const response = await axios.post('https://localhost:8000/api/decode',{token:decode},{
        headers: {
          'content-Type': 'application/json',
          'Authorization':`Bearer ${decode}`
        },
      });
      localStorage.setItem('decode',response.data);
      console.log(response.data);
    }catch(error){
    console.log(error)
    }
  }
  const Authentification = async (e) => {
    console.log(Email,Password);
    e.preventDefault();
    try {
      const response = await axios.post(`https://127.0.0.1:8000/api/login`, { username: Email , password : Password }, {
        headers: {
          'content-Type': 'application/json',
        },
      });
      const token = response.data;
      if(token.token != null) {
        localStorage.setItem('token',token.token);
        decodeToken(token.token);
        navigate('/admin')
      }
    } catch (error) {
      console.error('Erreur de Verification', error);
      toast.error("Erreur de connexion verifier vos infprmation");
    }
  };
  useEffect( () =>{
    const inputListe = document.querySelectorAll(".input-group input");
    Array.prototype.forEach.call(inputListe, (inputItem) =>{
      inputItem.addEventListener("focus" , function() {
        inputItem.parentElement.classList.add("is-focused");
      });
      inputItem.addEventListener("blur" , function() {
        if(inputItem.value.length === 0){
          inputItem.parentElement.classList.remove("is-filled");
          inputItem.parentElement.classList.remove("is-focused");
        }
        else{
          inputItem.parentElement.classList.add("is-filled");
        }
      });
    });
    ListeAssociation();
  }, [])
  return (
    <>
      <ToastContainer />
      
      <div className="page-header align-items-start min-vh-100" style={{ 'backgroundImage': "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",'loading':'lazy'}}>
    <span className="mask bg-gradient-dark opacity-6"></span>
    <div className="container my-auto">
      <div className="row">
        <div className="col-lg-4 col-md-8 col-12 mx-auto">
          <div className="card z-index-0 fadeIn3 fadeInBottom">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                <h4 className="text-white font-weight-bolder text-center mb-0">S identifiez</h4>
                <div className="row mt-3">
                  <div className="col-2 text-center ms-auto">
                    <a className="btn btn-link px-3" href="javascript:;">
                      <i className="fa fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div className="col-2 text-center px-1">
                    <a className="btn btn-link px-3" href="javascript:;">
                      <i className="fa fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div className="col-2 text-center me-auto">
                    <a className="btn btn-link px-3" href="javascript:;">
                      <i className="fa fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={Authentification}>
                <div className="input-group input-group-outline my-3  " >
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" defaultValue={ Email } onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-group input-group-outline mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input type="password" className="form-control" value={ Password } onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Connexion</button>
                </div>
              </form>
              <div className="text-center mt-4">
                <a href="/" className="btn btn-link text-secondary font-weight-bold">
                  <i className="fas fa-arrow-left me-2"></i>
                  Retour à l'accueil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer position-absolute bottom-2 py-2 w-100">
      <div className="container">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-12 col-md-6 my-auto">
            <div className="copyright text-center text-sm text-white text-lg-start">
              © <script>
                document.write(new Date().getFullYear())
              </script>,
              <a href="https://www.creative-tim.com" className="font-weight-bold text-white" target="_blank">Site Web {Asoociation.Nom}</a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a href="https://www.creative-tim.com/blog" className="nav-link text-white" target="_blank">{Asoociation.Telephone}</a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" target="_blank">{Asoociation.Email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  
    </>
  )
}

export default Login
