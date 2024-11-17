import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {login, logout } from '../Redux/Reducer/authSlice'
import Logo from '../assets/argentBankLogo.png'

function Header() {

    //useSelector pour extraire la valeur de isAuthenticated depuis le store Redux
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

    // useDispatch pour obtenir la fonction de dispatch du store Redux
    const dispatch = useDispatch();
  
    const userProfile = useSelector((state) => state.user);
  
    //Vérifie la présence du token au chargement
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        //cofirme une authentification
        dispatch(login({ token }));
      }
    }, [dispatch]);

    
    const handleSignOut = () => {
      dispatch(logout()); // Déconnecte l'utilisateur via Redux
      localStorage.removeItem('authToken'); // Supprime le token de localStorage
      localStorage.removeItem('userProfile'); // Supprime le profil utilisateur de localStorage (si stocké)
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
            <Link className="main-nav-item" to="./user">
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