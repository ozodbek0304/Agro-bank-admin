// @ts-nocheck

import { CreateUserDto, UpdateUserDto, UserItemType, UserParamsType, UsersResponseType } from '@/interfaces/user'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: httpBaseQuery(),
   tagTypes:["Employes"],
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponseType, UserParamsType>({
            query: (params) => ({
                url: 'common/employee/',
                method: 'get',
                params
            }),
            providesTags:["Employes"]
        }),
        createUser: builder.mutation<UserItemType, CreateUserDto>({
            query: (data) => ({
                url: `common/employee/`,
                method: 'post',
                data
            }),
            invalidatesTags:["Employes"]
        }),
        updateUser: builder.mutation<UserItemType, ({ user_id: string, data: any })>({
            query: (data) => ({
                url: `common/employee/${data.user_id}/`,
                method: 'patch',
                data: data.data
            }),
            invalidatesTags:["Employes"]
        })
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = userApi