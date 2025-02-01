// @ts-nocheck

import {StatusItemType, StatusParamsType, StatusResponseType } from '@/interfaces/status'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const statusApi = createApi({
    reducerPath: 'statusApi',
    baseQuery: httpBaseQuery(),
   tagTypes:["Status"],
    endpoints: (builder) => ({
        getStatus: builder.query<StatusResponseType, StatusParamsType>({
            query: (params) => ({
                url: 'common/blank/status/',
                method: 'get',
                params
            }), 
            providesTags:["Status"]
        }),
        createStatus: builder.mutation<StatusItemType, any>({
            query: (data) => ({
                url: `common/blank/status/`,
                method: 'post',
                data
            }),
            invalidatesTags:["Status"]
        }),
        updateStatus: builder.mutation<StatusItemType, StatusItemType>({
            query: (data) => ({
                url: `common/blank/status/${data.id}/`,
                method: 'patch',
                data: data.data
            }),
            invalidatesTags:["Status"]
        })
    })
})

export const {useCreateStatusMutation, useGetStatusQuery, useUpdateStatusMutation } = statusApi