// ** Redux Imports
import { IUserState } from '@/interfaces/user'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUserState = {
    openCreate: false,
    userData: null,
    deleteId: null,
    queryParams: {
        limit: Number(localStorage.getItem('userPageSize')) || 10,
        offset: 0,
    }
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setDeleteId: (state, action) => {
            state.deleteId = action.payload
        },
        updateUserParams: (state, action) => {
            state.queryParams = { ...state.queryParams, ...action.payload }
        }
    },
})

export const {
    setOpenCreate,
    setUserData,
    setDeleteId,
    updateUserParams
} = userSlice.actions


export default userSlice.reducer
