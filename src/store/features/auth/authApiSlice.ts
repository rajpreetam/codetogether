import { apiSlice } from "@/store/services/apiSlice";
import { TokenData, User } from "@/types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUser: builder.query<User, void>({
            query: () => ({
                url: '/auth/me',
                headers: {
                    Authorization: `Bearer ${localStorage.access}`
                }
            })
        }),
        loginUser: builder.mutation<TokenData, {username: string, password: string}>({
            query: ({username, password}) => ({
                url: '/auth/token',
                method: 'POST',
                body: {username, password}
            })
        }),
        verifyUser: builder.mutation({
            query: () => ({
                url: '/auth/token/verify',
                method: 'POST'
            })
        })
    })
});

export const {
    useRetrieveUserQuery,
    useLoginUserMutation,
    useVerifyUserMutation
} = authApiSlice;