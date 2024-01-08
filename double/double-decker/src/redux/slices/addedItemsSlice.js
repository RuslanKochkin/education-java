import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const addedItemsSlice = createSlice({
    name: 'addedItems',
    initialState,
    reducers: {
        setAddedItems(state, action) {
            // Объединение существующих элементов с новыми
            return { ...state, ...action.payload };
        },
    },
});

export const { setAddedItems } = addedItemsSlice.actions;

export default addedItemsSlice.reducer;

