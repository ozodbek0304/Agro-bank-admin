// ** Redux Imports
import { IOrderState } from '@/interfaces/order'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IOrderState = {
    openCreate: null,
    orderData: null,
    queryParams: {
        search: '',
        limit: Number(localStorage.getItem('orderPageSize')) || 10,
        offset: 0
    }
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOpenCreate: (state, action) => {
            state.openCreate = action.payload
        },
        setOrderData: (state, action) => {
            state.orderData = action.payload
        },
        updateOrderParams: (state, action) => {
            let newParams = { ...state.queryParams, ...action.payload }
            if (action?.payload?.status === '') {
                delete newParams.status
            }
            state.queryParams = newParams
        }
    },
})

export const {
    setOpenCreate,
    setOrderData,
    updateOrderParams
} = ordersSlice.actions


export default ordersSlice.reducer
