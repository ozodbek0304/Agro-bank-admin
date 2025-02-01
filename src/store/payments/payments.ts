// ** Redux Imports
import { IPaymentsState } from '@/interfaces/payments'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IPaymentsState = {
    openCreate: false,
    paymentData: null,
    deleteId: null,
    queryParams: {
        search: '',
        limit: Number(localStorage.getItem('blankPageSize')) || 10,
        offset: 0
    },
}

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setPaymentData: (state, action) => {
            state.paymentData = action.payload
        },
        setDeleteId: (state, action) => {
            state.deleteId = action.payload
        },
        updateBlankParams: (state, action) => {
            state.queryParams = { ...state.queryParams, ...action.payload }
        }
    },
})

export const {
    setOpenCreate,
    setPaymentData,
    setDeleteId,
    updateBlankParams
} = paymentsSlice.actions


export default paymentsSlice.reducer
