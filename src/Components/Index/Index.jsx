import { useState, useEffect } from 'react';
import Contact from '../Front/Contact/Contact';
import Apropos from '../Front/Apropos/Apropos';
import Evenement from '../Front/Evenement/Evenement';
import Accueil from '../Front/Accueil/Accueil';
import Qui from '../Front/Qui_somme_nous/Qui';
import Header from '../Front/Layout/Header';
import Footer from '../Front/Layout/Footer';


const loaderStyle = {
  border: '16px solid #f3f3f3', /* Couleur du fond du loader */
  borderTop: '16px solid #3498db', /* Couleur de l'animation */
  borderRadius: '50%', /* Forme ronde */
  width: '80px', // Taille augmentée
  height: '80px', // Taille augmentée
  animation: 'spin 1s linear infinite', /* Animation de rotation */
  margin: 'auto', // Centre le loader horizontalement
  display: 'flex', // Utilise flexbox pour centrer verticalement
  justifyContent: 'center', // Centre horizontalement
  alignItems: 'center', // Centre verticalement
  position: 'absolute', // Position absolue pour le centrer
  top: '50%', // Positionne à 50% du haut
  left: '50%', // Positionne à 50% de la gauche
  transform: 'translate(-50%, -50%)' // Ajuste la position pour centrer complètement
};


const Index = () => {
    const [loading, setLoading] = useState(true);

    // Fonction pour simuler le chargement des données
    const fetchData = async () => {
        // Simuler un délai pour le chargement (remplace ça par tes appels d'API)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading ? ( 
                <div style={loaderStyle}></div>
            ) : (
                <>
                    <Header />
                    <Accueil />
                    <Apropos />
                    <Contact />
                    <Qui />
                    <Evenement />
                    <Footer />
                </>
            )}
        </>
    );
}

export default Index;
