import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: JSON.parse(localStorage.getItem("bilinkUser")) || null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("bilinkUser",  JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.value = null;
            localStorage.removeItem("bilinkUser");
        },
        refresh: (state, action) =>{
            state.value = null;
            localStorage.removeItem("bilinkUser");
            state.value = action.payload;
            localStorage.setItem("bilinkUser",  JSON.stringify(action.payload));
        }
    }
});

export const {login,logout,refresh} = userSlice.actions;

export default userSlice.reducer;