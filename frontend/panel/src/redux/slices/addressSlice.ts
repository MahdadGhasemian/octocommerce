import { Address } from '@/services/basic.service'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AddressState {
  addresses: Array<Address>
}

const initialState: AddressState = {
  addresses: []
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<Array<Address>>) => {
      // Object.assign(state.addresses, action.payload)
      state.addresses = action.payload
    }
  }
})

export const { setAddresses } = addressSlice.actions

export const selectAddresses = (state: RootState) => state.address.addresses

export default addressSlice.reducer
