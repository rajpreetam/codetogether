import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/features/auth/authSlice";
import chatWsReducer from "@/store/features/webSockets/chatWsSlice";
import codeWsReducer from "@/store/features/webSockets/codeWsSlice";
import { apiSlice } from "@/store/services/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        chatWs: chatWsReducer,
        codeWs: codeWsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
