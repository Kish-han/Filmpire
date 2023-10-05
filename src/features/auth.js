import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user: {},
        isAuthenticated: false,
        sessionId: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem("session_id");
            localStorage.setItem('accountId', action.payload.id)
        },
    },
});


export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.auth;