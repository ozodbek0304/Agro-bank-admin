// ** Redux Imports
import { IStatusState } from '@/interfaces/status'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IStatusState = {
    openCreate: false,
    userData: null,
    deleteId: [],
    queryParams: {
        parent: '',
        limit: Number(localStorage.getItem('statusPageSize')) || 0,
        offset: 0
    }
}


export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        updateStatusParams: (state, action) => {
            const newQueryParams = { ...state.queryParams, ...action.payload };
        
            if (newQueryParams.parent === '') {
                delete newQueryParams.parent;  
            }
            state.queryParams = newQueryParams;
        }
        
    },
})

export const {
    setOpenCreate,
    setUserData,
    updateStatusParams
} = statusSlice.actions


export default statusSlice.reducer
