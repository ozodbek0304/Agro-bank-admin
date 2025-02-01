// ** Redux Imports
import { IStatusState } from '@/interfaces/status'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IStatusState = {
    openCreate: false,
    userData: null,
    deleteId: null,
    queryParams: {
        parent: [], 
        limit: Number(localStorage.getItem('statusPageSize')) || 10,
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
        setDeleteId: (state, action) => {
            state.deleteId = action.payload
        },
        updateStatusParams: (state, action: PayloadAction<{ parent: { id: string } | null }>) => {
            const newParent = action.payload?.parent?.id;
            if (!newParent) return; 

            const currentParents = state.queryParams.parent;

            if (currentParents.includes(newParent)) {
                state.queryParams.parent = currentParents.filter(id => id !== newParent);
            } else {
                state.queryParams.parent = [...currentParents, newParent];
            }
        }
    },
})

export const {
    setOpenCreate,
    setUserData,
    setDeleteId,
    updateStatusParams
} = statusSlice.actions


export default statusSlice.reducer
