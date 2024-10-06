import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListeMembre = () => {
  const [Membre,setMembre] = useState('');
  const token = localStorage.getItem("token");
  console.log(token);
  const [showModal, setShowModal] = useState(false);
  const [showModaldece, setShowModalDece] = useState(false);
  const [ShowModalQuitte, setShowModalQuitte] = useState(false);
  const [Proffesion, setProffesion] = useState([]);
  const [ProffesionPerso, setProffesionPerso] = useState([]);
  const [selectedNom, setSelectedNom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIdProfession, setSelectedIdProfession] = useState('');
    const [selectedId, setSelectedId] = useState('');
  const ListeMembre = () => {
    axios.get('https://localhost:8000/api/getPersNotQuitte',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
        setMembre(response.data)
    });
  };  
  useEffect(() => {
    ListeMembre(); 
  } , []);

  const VoireProffession = () => {
    axios.get(`https://localhost:8000/api/Profession`,{
        headers:
        {
          'Authorization' : `Bearer ${token}`
        }
      }).then(response => {
        setProffesion(response.data);
    });
    setShowModal(true);
};
const VoireProffessionByPersonne = (id) => {
  axios.get(`https://localhost:8000/api/PersonneMembreProfessions/${id}`,{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      setProffesionPerso(response.data);
      console.log(response.data);
  });
  setShowModal(true);
};
const Decede = (event) => {
  event.preventDefault();
  try{
      axios.post(`https://localhost:8000/api/Decede`,
        {IdPersonneMembre : selectedId, date_dece :  selectedDate},
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
            setShowModalDece(false);
            toast.success("Declaration decede inserer");
  }catch(error){
    toast.error('Erreur d\'insertion' , error);
  }
  
}
const AjouterProfessionMembre = (event) => {
  event.preventDefault();
  try{
       axios.post(`https://localhost:8000/api/PersonneMembreProfession`,
        {IdPersonneMembre : selectedId, IdProfession : selectedIdProfession },
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
          VoireProffessionByPersonne(selectedId);
          setShowModal(false);
            toast.success("Ajouter Profession inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}
const QuitteMembre = (event) => {
  event.preventDefault();
  try{
       axios.post(`https://127.0.0.1:8000/api/Quitte`,
        {IdPersonneMembre : selectedId, date : new Date() },
          {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            });
            setShowModalQuitte(false);
            toast.success("Personne quitter inserer");
  }catch(error){
      toast.error('Erreur d\'insertion' , error);
  }
  
}

  const handleSelectMember = (member) => {
    setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
    setSelectedId(member.id);
    VoireProffession();
    VoireProffessionByPersonne(member.id);
};
const handleSelectMemberDece = (member) => {
  setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
  setSelectedId(member.id);
  setShowModalDece(true);
};
const handleSelectMemberQuitte = (member) => {
  setSelectedNom(member.nom_membre + ' ' + member.prenom_membre);
  setSelectedId(member.id);
  setShowModalQuitte(true);
};
  return (
    <>
    <ToastContainer/>
      <div className="card">
              <div className="card-header">
                <h4 className="card-title">Membre responsable</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th className="text-left">
                        Nom
                      </th>
                      <th className="text-left">
                        Prenom
                      </th>
                      <th className="text-left">
                        Adresse
                      </th>
                      <th className="text-left">
                        Téléphone
                      </th >
                      <th className="text-left">
                        Date de naissance
                      </th>
                      <th className="text-left">
                        Email
                      </th>
                      <th className="text-center">
                        Supprimer
                      </th>
                      <th className="text-center">
                        Profession
                      </th>
                      <th className="text-center">
                        Décédé
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Membre) ? (
                            Membre.map(Membre => (
                                <tr key={Membre.id}>
                                        <td className="text-left">
                                            {Membre.nom_membre}
                                        </td>
                                        <td className="text-left">
                                            {Membre.prenom_membre}
                                        </td>
                                        <td className="text-left">
                                            {Membre.address}
                                        </td>
                                        <td className="text-left">
                                            {Membre.telephone}
                                        </td>
                                        <td className="text-left">
                                        {new Date(Membre.date_de_naissance).toISOString().split('T')[0]}
                                        </td>
                                        <td className="text-left">
                                            {Membre.email}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-danger" style={{'width': '50%' , 'fontSize':'15px'}} onClick={() => handleSelectMemberQuitte(Membre)} ><i className="now-ui-icons shopping_basket"></i></button>
                                        </td>
                                        <td className="text-center">
                                        <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => handleSelectMember(Membre)}
                                    >
                                        Voire
                                    </button>
                                        </td>
                                        <td>
                                        <button
                                        className="btn btn-success btn-block"
                                        type="button"
                                        onClick={() => handleSelectMemberDece(Membre)}
                                    >
                                        Marquer
                                    </button>
                                        </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Proffession de {selectedNom} {selectedIdProfession}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ajouter plus de proffession</p>
                        <select className="form-control" onChange={(e) => setSelectedIdProfession(e.target.value)}>
                            {Array.isArray(Proffesion) ? (
                              Proffesion.map(pro => (
                                <option className="form-control text-center" key={pro.id} value={pro.id}>
                                  {pro.nomProfession}
                                </option>
                              ))
                            ) : (
                              <option className="form-control">Null</option>
                            )}
                        </select>
                      <hr/>
                      <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className=" text-dark">
                      <th>
                        Profession de {selectedNom}
                      </th>
                    </thead>
                    <tbody>
                        {Array.isArray(Proffesion) ? (
                            ProffesionPerso.map(professionpers => (
                                <tr key={professionpers.id}>
                                  <td>
                                      {professionpers.nom_profession}
                                  </td>
                                </tr>
                            ) )
                        ) : ( <tr><td>Null</td></tr>) }
                    </tbody>
                  </table>
                </div>
              </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={AjouterProfessionMembre} >Ajouter</button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModaldece} onHide={() => setShowModalDece(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Personne decede {selectedNom} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Date de dece</p>
                        <input type="date" className="form-control"  value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={Decede} >Declarer</button>
                    <button className="btn btn-secondary" onClick={() => setShowModalDece(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
            <Modal show={ShowModalQuitte} onHide={() => setShowModalQuitte(false)} dialogClassName="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNom} va vraiment quitter le groupe </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={QuitteMembre} >Quitter</button>
                    <button className="btn btn-secondary" onClick={() => setShowModalQuitte(false)}>Fermer</button>
                </Modal.Footer>
            </Modal>
    </>
  )
}

export default ListeMembre
