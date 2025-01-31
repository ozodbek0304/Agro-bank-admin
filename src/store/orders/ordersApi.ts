// @ts-nocheck

import { AdminItemType } from '@/interfaces/admins'
import { OrderItemType, OrderResponseType, UpdateOrderType } from '@/interfaces/order'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getOrders: builder.query<OrderResponseType, any>({
            query: (params) => ({
                url: 'all-order-list/?limit=10&offset=0',
                method: 'get',
                params
            }),
        }),
        createOrder: builder.mutation<OrderItemType, any>({
            query: (data) => ({
                url: `order-create/`,
                method: 'post',
                data
            }),
        }),
        updateOrder: builder.mutation<OrderItemType, UpdateOrderType>({
            query: (data) => ({
                url: `order-update/${data.id}/`,
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

export const { useGetOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation } = ordersApi