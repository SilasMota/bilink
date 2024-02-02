import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: "",
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.value = action.payload;
        },
        clear: (state) => {
            state.value = null;
        }
    }
});

export const {setFilter,clear} = filterSlice.actions;

export default filterSlice.reducer;