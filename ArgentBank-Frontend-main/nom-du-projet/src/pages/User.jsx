import React, { useEffect, useState } from 'react';
import Account from '../components/Acount';
import EditName from '../components/EditName';

function User() {
  // État pour stocker le profil utilisateur
  const [profile, setProfile] = useState(null);

  // Utilisation de useEffect pour récupérer le profil au chargement de la page
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Récupération du token
    if (authToken) {
      fetchProfileData(authToken); // Appel de la fonction pour récupérer les données
    }
  }, []);

  // Fonction pour récupérer les données du profil depuis l'API
  function fetchProfileData(authToken) {
    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Convertit la réponse en JSON si OK
        } else {
          console.error('Erreur :', response.statusText); // Affiche une erreur si non OK
        }
      })
      .then(data => {
        if (data) {
          setProfile(data.body); // Met à jour l'état avec les données
          localStorage.setItem('userProfile', JSON.stringify(data.body)); // Stocke les données dans localStorage
          console.log(data.body); // Affiche les données dans la console
        }
      })
      .catch(error => {
        console.error('Erreur :', error); // Affiche une erreur en cas de problème
      });
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <EditName />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
  );
}

export default User;
