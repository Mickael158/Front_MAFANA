import axios from "axios";
import { useEffect, useState } from "react";

const Evenement = () => {
  const [evenements, setEvenements] = useState([]);

  const ListeEvenement = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/Evenement/proche_evenement');
      setEvenements(response.data); 
      console.log(evenements);
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    ListeEvenement();
  }, []);

  return (
    <>
      <div className="container mt-sm-5" id="evenement">
        <div
          className="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg')",
            loading: "lazy",
          }}
        >
          <span className="mask bg-gradient-dark"></span>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 ms-lg-5 scrollable">
                {evenements.length > 0 && (
                  <>
                    <h4 className="text-white">
                      Evenement plus proche débute le{" "}
                      {new Date(evenements[0].date_evenement).toLocaleDateString()} et se termine le{" "}
                      {new Date(evenements[0].date_fin_evenement).toLocaleDateString()}
                    </h4>
                    <h1 className="text-white">
                      Elle aura lieu à {evenements[0].lieu_evenement}
                    </h1>
                    <p className="lead text-white opacity-8 fs-3">
                    {evenements[0].description_evenement}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-6 w-75 m-auto">
        
          {Array.isArray(evenements) && evenements.length > 1 ? (
            evenements.slice(1).map((E, index) => (
              <div key={index} className="col-lg-4 col-md-8 card scrollable">
              <div className="card card-plain">
                <div className="card-body">
                  <div className="author">
                    <div className="name">
                      <h6 className="mb-0 font-weight-bolder">
                        Prochain evenement aurras lieu a {E.lieu_evenement}
                      </h6>
                      <div className="stats">
                        <i className="far fa-clock"></i>et se derouleras le {new Date(E.date_evenement).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4">{E.description_evenement}</p>
                  <div className="rating mt-3">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              </div>
            ))
          ) : (
            <h1>Aucun evenement à venir</h1>
          )}
        
      </div>
    </>
  );
};

export default Evenement;