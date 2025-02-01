// ** Redux Imports
import { IAdminsState } from '@/interfaces/admins'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IAdminsState = {
    openCreate: false,
    adminData: null,
    deleteId: null
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
        }
    },
})

export const {
    setOpenCreate,
    setAdminData,
    setDeleteId
} = appAdminsSlice.actions


export default appAdminsSlice.reducer
