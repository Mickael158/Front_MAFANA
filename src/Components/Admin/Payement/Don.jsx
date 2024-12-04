import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Don = () => {
  const [Montant, setMontant] = useState('');
  const [selectedNom, setSelectedNom] = useState('');
  const [Membre, setMembre] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const token = localStorage.getItem("token");

  const ListeMembre = () => {
    axios.get('https://localhost:8000/api/PersonneIndep', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setMembre(response.data);
    });
  };

  const PayementDonation = (event) => {
    event.preventDefault();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(selectedNom)) {
        toast.error("Le nom ne doit contenir que des lettres.");
        return; // Arrêter l'exécution si le nom contient des caractères invalides
    }

    // Vérification que le montant est supérieur à 0
    if (Montant <= 0) {
        toast.error("Le montant doit être supérieur à 0.");
        return; // Arrêter l'exécution si le montant est invalide
    }
    try {
      axios.post(`https://localhost:8000/api/DonationFinancier`, {
          utilisateur: token,
          nom_donation_financier: selectedNom,
          montant: Montant
        },
        {
          headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      toast.success("Donnation insérée!");
      setMontant('');
      setSelectedNom('');
      setFilteredMembers([]); // Clear suggestions on successful submission
    } catch (error) {
      console.error('Erreur d\'insertion', error);
      toast.error("Erreur dans l'insertion");
    }
  };

  useEffect(() => {
    ListeMembre();
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setSelectedNom(value);
    if (value) {
      const filtered = Membre.filter(member =>
        `${member.nom_membre} ${member.prenom_membre}`.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers([]);
    }
  };

  const handleSuggestionClick = (nom) => {
    setSelectedNom(nom);
    setFilteredMembers([]);
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card">
          <div className="card-header">
            <h5 className="title">Donation Fiancié</h5>
          </div>
          <div className="card-body">
            <form onSubmit={PayementDonation}>
              <div className="row mb-5">
                <div className="col-md-5 pr-1">
                  <div className="form-group position-relative">
                    <label>Nom du donateur</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom de la Personne"
                      value={selectedNom}
                      onChange={handleNameChange}
                    />
                    {filteredMembers.length > 0 && (
                      <ul className="suggestions-list">
                        {filteredMembers.map((member, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(`${member.nom_membre} ${member.prenom_membre}`)}
                          >
                            {member.nom_membre} {member.prenom_membre}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-md-4 pr-1">
                  <div className="form-group">
                    <label>Montant</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="en Ariary"
                      value={Montant}
                      onChange={(e) => setMontant(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3 pr-1 mt-3">
                  <button
                    className="btn btn-success btn-block"
                    type="submit"
                  >
                    Donner
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>
        {`
          .suggestions-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            max-height: 150px;
            overflow-y: auto;
            position: absolute;
            background: white;
            z-index: 1000;
            width: calc(100% - 20px); /* Match the width of the input */
          }
          .suggestions-list li {
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .suggestions-list li:hover {
            background-color: #f1f1f1;
          }
        `}
      </style>
    </>
  );
}

export default Don;