// @ts-nocheck

import { AdminData, AdminItemType } from '@/interfaces/admins'
import { UserParamsType } from '@/interfaces/user'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const adminsApi = createApi({
    reducerPath: 'adminsApi',
    baseQuery: httpBaseQuery(),
    tagTypes:["admin-list"],
    endpoints: (builder) => ({
        getAdmins: builder.query<AdminData, UserParamsType>({
            query: () => ({
                url: 'admin-list/',
                method: 'get',
            }),
            providesTags:["admin-list"]
        }),
        createAdmin: builder.mutation<AdminItemType, AdminItemType>({
            query: (data) => ({
                url: `admin-create/`,
                method: 'post',
                data
            }),
            invalidatesTags:["admin-list"]
        }),
        updateAdmin: builder.mutation<AdminItemType, any>({
            query: (data) => ({
                url: `admin-update/${data.id}/`,
                method: 'patch',
                data
            }),
            invalidatesTags:["admin-list"]
        }),
        deleteAdmin: builder.mutation<AdminItemType, number>({
            query: (id) => ({
                url: `admin-archive/${id}/`,
                method: 'patch'
            }),
            invalidatesTags:["admin-list"]
        }),
    })
})

export const { useCreateAdminMutation, useGetAdminsQuery, useUpdateAdminMutation, useDeleteAdminMutation } = adminsApi