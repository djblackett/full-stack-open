import {createSlice} from "@reduxjs/toolkit";


export const setNotification = args => {
    return async dispatch => {
        const { message, delay } = args;
        dispatch(setMessage(message));

        setTimeout(() => {
            dispatch(clearMessage());
        }, delay * 1000)
    }
}

const initialState = {message: ""}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload;
        },
        clearMessage(state, action) {
            state.message = "";
        }
    }
});

export const selectNotification = state => state.notification.message;

export const {setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
