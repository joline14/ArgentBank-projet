import { createSlice } from "@reduxjs/toolkit";



const profileSlice= createSlice({
    name: 'user',
    // État initial du slice d'authentification
initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
  },
    // Reducteurs définissant des actions qui peuvent être effectuées sur cet état
    reducers:{
        //Màj des champs du profil utilisateur avec les valeurs fournies dans l'action
        setProfile:(state, action)=>{
            state.firstName= action.payload.body.firstName;
            state.lastName = action.payload.body.lastName;
            state.userName = action.payload.body.userName;
            state.email = action.payload.body.email;
        },
        // Màj du champ 'userName' du profil avec la valeur fournie dans l'action
        updateUserName: (state, action) => {
        state.userName = action.payload;
        },
    }    
})

// Export les actions générées par le slice
export const { setProfile, updateUserName } = profileSlice.actions;
export default profileSlice.reducer;