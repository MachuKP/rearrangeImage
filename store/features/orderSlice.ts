import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataOrder: {},
} as OrderState;

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setDataOrder: (state, action: PayloadAction<dataOrder>) => {
      state.dataOrder = action.payload;
    },
    resetDataOrder: state => {
      state.dataOrder = {};
    },
  },
});

export type OrderState = {
  dataOrder: dataOrder;
};

export type dataOrder = {
  [key: string]: number;
};

export const {setDataOrder, resetDataOrder} = orderSlice.actions;

export default orderSlice.reducer;
