import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {login} from '../Redux/Reducer/authSlice'

 function Form() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

   // États pour les champs du formulaire et les messages d'erreur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Création d'un objet 'formData' 
    const formData = {
      email: email,
      password: password,
    };

    try {
      // Envoie d'une requête HTTP POST
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
         // Récupération et stockage du token si la requête réussit
        const responseData = await response.json();
        console.log(responseData);
        const token = responseData.body.token;
        localStorage.setItem('authToken', token);
        dispatch(login({ token })); 
        navigate('/User');  // Redirection vers la page UserJ

        // Réinitialisation des champs et des messages d'erreur
        setEmail('');
        setPassword('');
        setErrorMessage('');

      } else {
       // Affichage du message d'erreur en cas d'échec
        const errorData = await response.json();
        console.error('Erreur :', response.statusText);
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Gestion des erreurs réseau/imprévues
      console.error('Erreur :', error);
      setErrorMessage('An error has occurred');
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>

      {/*Formulaire affichant le message d'erreur uniquement en cas de besoin*/}
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="errorMsg">{errorMessage}</p>}
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
}

export default Form