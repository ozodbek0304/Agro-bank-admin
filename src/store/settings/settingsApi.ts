// @ts-nocheck

import { AdminItemType } from '@/interfaces/admins'
import { SettingsType } from '@/interfaces/settings'
import httpBaseQuery from '@/utils/http'
import { createApi } from '@reduxjs/toolkit/query/react'

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: httpBaseQuery(),
    endpoints: (builder) => ({
        getPriceSettings: builder.query<SettingsType, string>({
            query: () => ({
                url: 'list-settings/',
                method: 'get',
            }),
        }),
        updateSettings: builder.mutation<SettingsType, SettingsType>({
            query: (data) => ({
                url: `settings-update/`,
                method: 'put',
                data
            }),
        })
    })
})

export const { useGetPriceSettingsQuery, useUpdateSettingsMutation } = settingsApi