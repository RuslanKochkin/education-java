
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTours = createAsyncThunk('tickets/fetchTicketsStatus', async (params) => {
    const { sortBy, order, countryId, search, currentPage } = params;
    const { data } = await axios.get(
        `http://localhost:8080/noauth/all?${countryId}`
        // `https://6559fdf76981238d054d035a.mockapi.io/items?page=${currentPage}&limit=8&${country}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading',
};

const toursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchTours.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchTours.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export default toursSlice.reducer;

