// @ts-nocheck

import { CreatePaymentDto, PaymentItemType, UpdatePaymentDto } from '@/interfaces/payments'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const paymentsApi = createApi({
    reducerPath: 'paymentsApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getPayments: builder.query<PaymentItemType[], string>({
            query: () => ({
                url: 'admin-all-payments/',
                method: 'get',
            }),
        }),
        createPayment: builder.mutation<PaymentItemType, CreatePaymentDto>({
            query: (data) => ({
                url: `admin-payments-create/`,
                method: 'post',
                data
            }),
        }),
        updateAdmin: builder.mutation<PaymentItemType, UpdatePaymentDto>({
            query: (data) => ({
                url: `admin-update/${data.id}/`,
                method: 'patch',
                data
            }),
        }),
    })
})

export const { useGetPaymentsQuery, useCreatePaymentMutation } = paymentsApi