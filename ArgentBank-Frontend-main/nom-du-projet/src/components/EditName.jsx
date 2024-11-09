import { useEffect, useState } from 'react';

function EditName() {
  // Récupère les données utilisateur et le token depuis localStorage
  const initialUserProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const token = localStorage.getItem('authToken') || '';

  // États pour gérer l'utilisateur, l'édition et les erreurs
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userProfile.userName || '');
  const [errorMessage, setErrorMessage] = useState('');

  // Met à jour le nom d'utilisateur quand le profil change
  useEffect(() => {
    setEditedUserName(userProfile.userName || '');
  }, [userProfile]);

  // Active le mode d'édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Sauvegarde les modifications
  const handleSaveClick = (event) => {
    event.preventDefault();
    setIsEditing(false);

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: editedUserName }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(err => {
            throw new Error(err.message || 'Erreur inconnue');
          });
        }
      })
      .then(data => {
        const updatedProfile = { ...userProfile, userName: editedUserName };
        setUserProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      })
      .catch(error => {
        setErrorMessage(error.message || 'Une erreur est survenue');
      });
  };

  // Annule l'édition
  const handleCancelClick = () => {
    setEditedUserName(userProfile.userName || '');
    setIsEditing(false);
  };

  // Met à jour la valeur de l'input
  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <div className="edit-user-info-container">
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <h1 className="edit-title">Edit User Info</h1>
          <div className="edit-user-info">
            <div className="input-group">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                value={editedUserName}
                onChange={handleUserNameChange}
                className="edit-username-input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={userProfile.firstName || ''}
                readOnly
                className="edit-firstname-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={userProfile.lastName || ''}
                readOnly
                className="edit-lastname-input"
              />
            </div>
          </div>
          <div className="edit-button-container">
            <button type="submit" className="edit-button edit-button--save">Save</button>
            <button type="button" className="edit-button edit-button--cancel" onClick={handleCancelClick}>Cancel</button>
          </div>
          {errorMessage && <p className="errorMsg">{errorMessage}</p>}
        </form>
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {userProfile ? `${userProfile.firstName} ${userProfile.lastName} !` : 'Loading'}
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </>
      )}
    </div>
  );
}

export default EditName;
