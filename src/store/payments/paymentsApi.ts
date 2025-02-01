// @ts-nocheck

import { CreatePaymentDto, PaymentData, PaymentItemType, UpdatePaymentDto } from '@/interfaces/payments'
import { UserParamsType } from '@/interfaces/user'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: httpBaseQuery(),
    tagTypes:["blank-list"],
    endpoints: (builder) => ({
        getPayments: builder.query<PaymentData, UserParamsType>({
            query: () => ({
                url: 'common/blank/',
                method: 'get',
            }),
            providesTags:["blank-list"]
        }),
        updateAdmin: builder.mutation<PaymentItemType, any>({
            query: (data) => ({
                url: `common/blank/${data.id}/`,
                method: 'patch',
                data
            }),
            invalidatesTags:["blank-list"]
        }),
    })
})

export const { useGetPaymentsQuery, useUpdateAdminMutation } = paymentsApi