// @ts-nocheck

import { CreateUserDto, UpdateUserDto, UserItemType, UserParamsType, UsersResponseType } from '@/interfaces/user'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponseType, UserParamsType>({
            query: (params) => ({
                url: 'admin-all-user/',
                method: 'get',
                params
            }),
        }),
        createUser: builder.mutation<UserItemType, CreateUserDto>({
            query: (data) => ({
                url: `admin-user-register/`,
                method: 'post',
                data
            }),
        }),
        updateUser: builder.mutation<UserItemType, ({ user_id: string, data: any })>({
            query: (data) => ({
                url: `user-update/${data.user_id}/`,
                method: 'patch',
                data: data.data
            }),
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = userApi