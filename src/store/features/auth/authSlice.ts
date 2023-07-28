import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('editor_value');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;