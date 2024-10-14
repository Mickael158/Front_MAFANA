import Contact from '../Front/Contact/Contact';
import Apropos from '../Front/Apropos/Apropos';
import Evenement from '../Front/Evenement/Evenement';
import Accueil from '../Front/Accueil/Accueil';
import Qui from '../Front/Qui_somme_nous/Qui';
import Header from '../Front/Layout/Header';
import Footer from '../Front/Layout/Footer';


const Index = () => {

    return (
        
                <>
                    <Header />
                    <Accueil />
                    <Apropos />
                    <Contact />
                    <Qui />
                    <Evenement />
                    <Footer />
                </>
    );
}

export default Index;
