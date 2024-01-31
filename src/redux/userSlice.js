import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = null;
            localStorage.removeItem("user");
        },
        refresh: (state, action) =>{
            state.value = null;
            localStorage.removeItem("user");
            state.value = action.payload;
        }
    }
});

export const {login,logout,refresh} = userSlice.actions;

export default userSlice.reducer;