import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Materiel = () => {
    const [selectedNom, setSelectedNom] = useState('');
    const [Materiel, setMateriel] = useState();
    const [IdMateriel, setIdMateriel] = useState();
    const [nombre, setNombre] = useState();
    const [image, setImage] = useState();
    const token = localStorage.getItem("token");
    const insertionDonnationMateriel = (event) => 
        {
          event.preventDefault();
          console.log("TOKEN ",token ,"MATERIEL " , IdMateriel ,"NOM " ,  selectedNom ,"NBR ", nombre ,"iMAGE ", image);
          try
          {
            axios.post('https://127.0.0.1:8000/api/DonnationMateriel',
                { 
                    utilisateur : token,
                    id_materiel_id: IdMateriel, 
                    nom_donnateur_materiel: selectedNom, 
                    nombre: nombre, 
                    image: image 
                },
            {
              headers: 
              {
                'content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            }
          );
          toast.success("Inserer!");
          setSelectedNom('');
          setNombre('');
          setImage('');
        }
        catch(error)
        {
          console.error('Erreur d\'insertion' , error)
          toast.error("Erreur");
        }
      }
    const ListeMateriel = async () => {
        try {
          const response = await axios.get('https://localhost:8000/api/Materiel',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          });
          setMateriel(response.data);
          console.log(Materiel)
        } catch (error) {
          console.error('Erreur de chargement des Catgorie', error);
        }
      };
    
      useEffect(() => {
        ListeMateriel();
      } , []);
  return (
    <>
      <div>
        <ToastContainer />
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Cotisation</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={insertionDonnationMateriel}>
                            <div className="row mb-5">
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Nom de la personne </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la Personne"
                                            value={selectedNom} onChange={(e) => setSelectedNom(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label> Materiel </label>
                                        <select 
                                            className="form-control text-center" 
                                            value={IdMateriel} 
                                            onChange={(e) => setIdMateriel(e.target.value)}
                                            >
                                            {Array.isArray(Materiel) ? (
                                                Materiel.map((m) => (
                                                <option  key={m.id} value={m.id}>
                                                    {m.NomMateriel}
                                                </option>
                                                ))
                                            ) : (
                                                <option className="form-control">Null</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre de mois" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Image</label>
                                        <input type="file" className="form-control" placeholder="Nombre de mois" value={image} onChange={(e) => setImage(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1 mt-3">
                                    <button
                                        className="btn btn-success btn-block"
                                        type="submit"
                                    >
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Materiel
