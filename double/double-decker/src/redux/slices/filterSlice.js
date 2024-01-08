import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние среза Redux для фильтров.
const initialState = {
    searchValue: '',       // Поисковый запрос.
    countryId: 0,          // Идентификатор страны (по умолчанию 0).
    currentPage: 1,        // Текущая страница (по умолчанию 1).
};

// Создание среза Redux с использованием createSlice.
const filterSlice = createSlice({
    name: 'filters',    // Имя среза Redux.
    initialState,       // Начальное состояние.
    reducers: {
        // Редьюсер для установки идентификатора страны.
        setCountryId(state, action) {
            state.countryId = action.payload;
        },

        // Редьюсер для установки текущей страницы.
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

// Экспорт экшенов и редьюсера для использования в приложении.
export const { setCountryId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;




