// ** Redux Imports
import { ISettingsState } from '@/interfaces/settings'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ISettingsState = {}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
})

export const {
} = settingsSlice.actions


export default settingsSlice.reducer
