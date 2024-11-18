import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../Redux/Reducer/profileSlice';

function EditName() {

  const dispatch= useDispatch();

  const userProfile= useSelector((state)=>state.user)

   // Récupère le token d'authentification depuis le Redux store
   const token = useSelector((state) => state.authentication.token);

  // États pour gérer l'utilisateur et l'édition
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userProfile.userName || '');

  // Met à jour userName" quand le profil change
  useEffect(() => {
    setEditedUserName(userProfile.userName || '');
  }, [userProfile.userName]);

  // Active le mode d'édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Sauvegarde les modifications
  const handleSaveClick = async (event) => {
    event.preventDefault();
    setIsEditing(false);
    try{
    const response= await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: editedUserName }),
    })
        if (response.ok) {
          const responseData= await response.json();
          dispatch(updateUserName(editedUserName));// Met à jour dans Redux
          console.log('Le nom d/utilisateur a été mis à jour avec succès :', responseData);
        } else {
          if (response.status === 401) {
            const errorData = await response.json();
            console.error('Error 401 :', errorData.message);
        }
    
      else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Error 400 :', errorData);
      } else {
        console.error('Error :', response.statusText);
      }
    }
    }
    catch (error) {
      // Gestion des erreurs liées à la requête
      console.error('Error : ', error);
    }
  };

  // Annule l'édition
  const handleCancelClick = () => {
    setEditedUserName(userProfile.userName || '');
    setIsEditing(false);
  };

  // Met à jour le champ "editedUserName"
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
