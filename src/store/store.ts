import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import theme from './theme'
import auth from './auth/auth'
import { authApi } from './auth/authApi'
import admins from './admins/admins'
import mfos from './mfo/mfo'
import { adminsApi } from './admins/adminsApi'
import orders from './orders/orders'
import { ordersApi } from './orders/ordersApi'
import user from './employee/employee'
import status from './status/status'
import { userApi } from './employee/employeApi'
import payments from './payments/payments'
import { paymentsApi } from './payments/paymentsApi'
import { mfosApi } from './mfo/mfosApi'
import { statusApi } from './status/statusApi'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminsApi.reducerPath]: adminsApi.reducer,
        [mfosApi.reducerPath]: mfosApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [statusApi.reducerPath]: statusApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [paymentsApi.reducerPath]: paymentsApi.reducer,
        theme,
        auth,
        admins,
        orders,
        status,
        user,
        payments,
        mfos,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            mfosApi.middleware,
            adminsApi.middleware,
            ordersApi.middleware,
            statusApi.middleware,
            userApi.middleware,
            paymentsApi.middleware,
        ),
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector