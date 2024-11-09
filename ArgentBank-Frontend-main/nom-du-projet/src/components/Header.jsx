import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/argentBankLogo.png'

function Header() {
//État pour vérifier si l'utilisateur est connecté et le profil utilisateur
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userProfile, setUserProfile] = useState(null);

// Vérifie s'il y a un token au chargement de la page
useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setIsAuthenticated(true); // Met à jour l'état de connexion
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setUserProfile(storedProfile); // Charge le profil utilisateur
    }
  }
}, []);

// Fonction pour gérer la déconnexion
const handleSignOut = () => {
  localStorage.removeItem('authToken'); // Supprime le token
  localStorage.removeItem('userProfile'); // Supprime le profil
  setIsAuthenticated(false); // Met à jour l'état de connexion
  setUserProfile(null); // Réinitialise le profil
};

return(
    <header>
          <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {/* Affichage conditionnel des liens */}
        {isAuthenticated ? (
          // Si l'utilisateur est connecté
          <div className="main-nav-ctaItem">
            <Link className="main-nav-item" to="./profile">
              <i className="fa fa-user-circle"></i>
              {userProfile ? userProfile.userName : 'Load'}
            </Link>
            <Link className="main-nav-item" to="./" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          // Si l'utilisateur n'est pas connecté
        <div className="main-nav-ctaItem">
          <Link className="main-nav-item" to="/Login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
        )}
        </nav>
    </header>
);
}
export default Header