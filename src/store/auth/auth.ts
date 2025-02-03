// ** Redux Imports
import { AppAuthTypes } from '@/interfaces/app'
import { createSlice } from '@reduxjs/toolkit'

const role: any = localStorage.getItem('role')

const initialState: AppAuthTypes = {
    isLogin: !!localStorage.getItem('isLogin'),
    token: localStorage.getItem('token') || null,
    role: role || 'admin'
}

export const appAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogin = true
            state.token = action.payload?.access
            if (action.payload?.is_superuser) {
                state.role = 'superuser'
                localStorage.setItem('role', 'superuser')
            } else {
                state.role = 'admin'
                localStorage.setItem('role', 'admin')
            }
            localStorage.setItem('isLogin', 'true')
            localStorage.setItem('token', action.payload?.access)

            if (action.payload?.is_superuser) {
                window.location.replace('/blanks')
            } else {
                window.location.replace('/employes')
            }
        },
        logoutSuccess: (state) => {
            localStorage.clear()
            state.isLogin = false
            state.token = null

            window.location.replace('/login')
        }
    },
})

export const {
    loginSuccess,
    logoutSuccess
} = appAuthSlice.actions


export default appAuthSlice.reducer
