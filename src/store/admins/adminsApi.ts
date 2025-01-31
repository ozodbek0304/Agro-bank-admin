// @ts-nocheck

import { AdminItemType } from '@/interfaces/admins'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const adminsApi = createApi({
    reducerPath: 'adminsApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getAdmins: builder.query<AdminItemType[], string>({
            query: () => ({
                url: 'admin-list/',
                method: 'get',
            }),
        }),
        createAdmin: builder.mutation<AdminItemType, AdminItemType>({
            query: (data) => ({
                url: `admin-create/`,
                method: 'post',
                data
            }),
        }),
        updateAdmin: builder.mutation<AdminItemType, AdminItemType>({
            query: (data) => ({
                url: `admin-update/${data.id}/`,
                method: 'patch',
                data
            }),
        }),
        deleteAdmin: builder.mutation<AdminItemType, number>({
            query: (id) => ({
                url: `admin-archive/${id}/`,
                method: 'patch'
            }),
        }),
    })
})

export const { useCreateAdminMutation, useGetAdminsQuery, useUpdateAdminMutation, useDeleteAdminMutation } = adminsApi