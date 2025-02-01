// ** Redux Imports
import { IAdminsState } from '@/interfaces/admins'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IAdminsState = {
    openCreate: false,
    adminData: null,
    deleteId: null,
    queryParams: {
        search: '',
        limit: Number(localStorage.getItem('adminPageSize')) || 10,
        offset: 0
    }
}

export const appAdminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setAdminData: (state, action) => {
            state.adminData = action.payload
        },
        setDeleteId: (state, action) => {
            state.deleteId = action.payload
        },
        updateAdminParams: (state, action) => {
            state.queryParams = { ...state.queryParams, ...action.payload }
        }
    },
})

export const {
    setOpenCreate,
    setAdminData,
    setDeleteId,
    updateAdminParams
} = appAdminsSlice.actions


export default appAdminsSlice.reducer
