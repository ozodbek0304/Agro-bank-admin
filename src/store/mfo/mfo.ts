// ** Redux Imports
import { IMFOsState } from '@/interfaces/mfo'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IMFOsState = {
    openCreate: false,
    adminData: null,
    queryParams: {
        search: '',
        limit: Number(localStorage.getItem('mfoPageSize')) || 10,
        offset: 0
    },
}

export const appAdminsSlice = createSlice({
    name: 'mfos',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setAdminData: (state, action) => {
            state.adminData = action.payload
        },
        updateMfoParams: (state, action) => {
            state.queryParams = { ...state.queryParams, ...action.payload }
        }
      
    },
})

export const {
    setOpenCreate,
    setAdminData,
    updateMfoParams,
} = appAdminsSlice.actions


export default appAdminsSlice.reducer
