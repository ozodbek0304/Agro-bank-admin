// ** Redux Imports
import { IPaymentsState } from '@/interfaces/payments'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IPaymentsState = {
    openCreate: false,
    paymentData: null,
    deleteId: null
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
        }
    },
})

export const {
    setOpenCreate,
    setPaymentData,
    setDeleteId
} = paymentsSlice.actions


export default paymentsSlice.reducer
