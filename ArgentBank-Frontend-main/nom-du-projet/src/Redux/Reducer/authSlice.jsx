import { createSlice } from "@reduxjs/toolkit";

// Vérifie si un jeton d'authentification est présent dans le LocalStorage
const checkToken = () => {
    return localStorage.getItem('authToken') || null;
  };

// État initial du slice d'authentification
const initialState = {
    token: checkToken(), 
    isAuthenticated: false, 
  };


const authSlice= createSlice({
    name: 'authentication',
    initialState,
    reducers:{
          // Réducteur qui met à jour l'état pour indiquer une connexion réussi
        login: (state, action)=>{
            state.token= action.payload.token;
            state.isAuthenticated=true
        },
           // Réducteur qui met à jour l'état pour indiquer une déconnexion
        logout: (state)=>{
            state.token= null;
            state.isAuthenticated=false;
            localStorage.removeItem('authToken')
        }
    }
})

// Export les actions générées par le slice
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;