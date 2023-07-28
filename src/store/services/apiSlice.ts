import { cookies } from 'next/headers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { login, logout, refresh } from '@/store/features/auth/authSlice';
import { Mutex } from 'async-mutex';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if(result.error && result.error.status === 401) {
        if(!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refresh = localStorage.refresh;
                console.log(refresh);
                
                const refreshResult = await baseQuery(
                    {
                        url: '/auth/token/refresh',
                        method: 'POST',
                        body: {refresh: refresh}
                    },
                    api,
                    extraOptions
                );
                if(refreshResult.data) {
                    api.dispatch(refresh());
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});