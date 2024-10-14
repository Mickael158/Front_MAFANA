import axios from "axios";
import { useEffect, useState } from "react";

const Qui = () => {
  const [last, setLast] = useState(null); // initialiser avec null
  const LastDirigeant = async () => {
    try {
      const response = await axios.get('https://localhost:8000/api/last');
      setLast(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    LastDirigeant();
  }, []);

  if (!last) {
    return <div>Loading...</div>; // Afficher un état de chargement pendant la récupération des données
  }

  return (
    <>
      <section className="pb-5 position-relative bg-gradient-dark w-100" id="qui">
        <div className="w-80 ms-auto me-auto">
          <div className="row">
            <div className="col-md-8 text-start mb-5 mt-5">
              <h3 className="text-white z-index-1 position-relative ps-3">Qui sommes-nous</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="card mt-4">
                <div className="row d-flex">
                  <div className="col-lg-6 col-md-12 col-12 mt-n5">
                    <div className="p-3 pe-md-0">
                      <img
                        className="w-100 border-radius-md shadow-lg"
                        src={`https://localhost:8000/uploads/images/${last.Image}`}
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12 my-auto">
                    <div className="card-body ps-lg-0">
                      <h2 className="mb-0">
                        {last.personneId.Nom_Membre} {last.personneId.Prenom_Membre}
                      </h2>
                      <h4 className="text-info">Poste : {last.professionId.Nom_Profession}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Qui;
