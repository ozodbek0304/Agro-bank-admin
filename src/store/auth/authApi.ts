// @ts-nocheck

import { LoginProps, LoginUserType } from '@/interfaces/auth'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        handleLogin: builder.mutation<LoginUserType, LoginProps>({
            query: (data) => ({
                url: `admin-login/`,
                method: 'post',
                data
            }),
        }),
    })
})

export const { useHandleLoginMutation } = authApi