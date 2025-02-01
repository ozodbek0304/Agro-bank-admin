// @ts-nocheck

import { MfoData, MfoItemType } from '@/interfaces/mfo'
import { UserParamsType } from '@/interfaces/user'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const mfosApi = createApi({
    reducerPath: 'mfosApi',
    baseQuery: httpBaseQuery(),
    tagTypes:["mfo-list"],
    endpoints: (builder) => ({
        getMfo: builder.query<MfoData, UserParamsType>({
            query: (params) => ({
                url: 'common/mfo/',
                method: 'get',
                params,
            }),
            providesTags:["mfo-list"]
        }),
        createMfo: builder.mutation<MfoItemType, MfoItemType>({
            query: (data) => ({
                url: `common/mfo/`,
                method: 'post',
                data
            }),
            invalidatesTags:["mfo-list"]
        }),
        updateMfo: builder.mutation<MfoItemType, any>({
            query: (data) => ({
                url: `common/mfo/${data.id}/`,
                method: 'patch',
                data
            }),
            invalidatesTags:["mfo-list"]
        }),
    })
})

export const { useCreateMfoMutation, useGetMfoQuery, useUpdateMfoMutation } = mfosApi