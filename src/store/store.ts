import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import theme from './theme'
import auth from './auth/auth'
import { authApi } from './auth/authApi'
import admins from './admins/admins'
import { adminsApi } from './admins/adminsApi'
import orders from './orders/orders'
import { ordersApi } from './orders/ordersApi'
import settings from './settings/settings'
import { settingsApi } from './settings/settingsApi'
import user from './employee/employee'
import { userApi } from './employee/employeApi'
import payments from './payments/payments'
import { paymentsApi } from './payments/paymentsApi'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminsApi.reducerPath]: adminsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [paymentsApi.reducerPath]: paymentsApi.reducer,
        theme,
        auth,
        admins,
        orders,
        settings,
        user,
        payments
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            adminsApi.middleware,
            ordersApi.middleware,
            settingsApi.middleware,
            userApi.middleware,
            paymentsApi.middleware,
        ),
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector