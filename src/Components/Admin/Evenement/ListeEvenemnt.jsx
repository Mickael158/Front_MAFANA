import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListeEvenement = () => {
  const [evenements, setEvenement] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token);

  // Fonction pour récupérer la liste des événements
  const getEvenements = () => {
    axios
      .get("https://localhost:8000/api/Evenement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvenement(response.data);
      });
  };

  useEffect(() => {
    getEvenements();
  }, []);

  // Fonction pour supprimer un événement
  const SuppressionEvenement = async (event, id) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `https://127.0.0.1:8000/api/Evenement/supprimer/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      getEvenements();
      toast.success(response.data.message);
      console.log("Événement supprimé");
    } catch (error) {
      toast.error("Erreur de suppression !");
      console.error("Erreur de suppression", error);
    }
  };

  // Fonction pour gérer le toggle d'affichage
  const handleToggle = async (id, currentValue) => {
    const newValue = currentValue === false ? true : false; // Inverse l'état actuel
    console.log(id,newValue);
    try {
      await axios.post(`https://127.0.0.1:8000/api/Evenement/affichable/${id}/${newValue}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      getEvenements();
      toast.success("Affichage mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'affichage");
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Tous les Événements</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="text-dark">
                <tr>
                  <th>Date début</th>
                  <th>Date fin</th>
                  <th>Lieu</th>
                  <th>Type d'événement</th>
                  <th>Description</th>
                  <th>Affichage</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(evenements) && evenements.length > 0 ? (
                  evenements.map((evenement) => (
                    <tr key={evenement.id}>
                      <td>
                        {new Date(evenement.dateEvenement)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>
                        {new Date(evenement.dateFinEvenement)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>{evenement.lieuEvenement}</td>
                      <td>{evenement.idTypeEvenement.Nom_Type_Evenement}</td>
                      <td>{evenement.descriptionEvenement}</td>
                      <td>
                        <div
                          className={`toggle-switch ${
                            evenement.publier === true ? "toggled" : ""
                          }`}
                          onClick={() => handleToggle(evenement.id, evenement.publier)}
                        >
                          <div className="toggle-button" />
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-block"
                          style={{ width: "50%" }}
                          onClick={(e) => SuppressionEvenement(e, evenement.id)}
                        >
                          <i className="now-ui-icons shopping_basket"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Aucun événement trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListeEvenement;