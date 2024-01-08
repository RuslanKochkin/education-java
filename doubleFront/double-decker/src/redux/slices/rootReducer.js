// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import addedItemsReducer from './addedItemsSlice';

const rootReducer = combineReducers({
    cart: cartReducer,
    addedItems: addedItemsReducer,
});

export default rootReducer;
