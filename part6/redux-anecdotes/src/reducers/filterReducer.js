import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    filter: ""
};

const filterSlice = createSlice( {
    name: "filter",
    initialState,
    reducers: {
        updateFilter(state, action) {
            state = action.payload;
            return state;
        }
    }
})


export const selectFilter = (state) => state.filter.filter;

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
