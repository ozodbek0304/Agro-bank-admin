// @ts-nocheck

import { StatsResponse, YearlyResponse } from '@/interfaces/dashboard'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getStats: builder.query<StatsResponse, string>({
            query: () => ({
                url: 'order-stats/',
                method: 'get',
            }),
        }),
        getYearly: builder.query<YearlyResponse, { year: number }>({
            query: (params) => ({
                url: 'yearly_summary/',
                method: 'get',
                params
            }),
        }),
    })
})

export const { useGetStatsQuery, useGetYearlyQuery } = dashboardApi