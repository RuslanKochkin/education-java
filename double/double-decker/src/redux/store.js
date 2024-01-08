// Импорт функции configureStore из библиотеки Redux Toolkit для создания хранилища.
import { configureStore } from '@reduxjs/toolkit';

// Импорт редьюсеров из соответствующих файлов срезов (slices).
import filter from './slices/filterSlice';   // Редьюсер для фильтрации.
import cart from './slices/cartSlice';       // Редьюсер для управления корзиной.
import tours from './slices/toursSlice'; // Редьюсер для управления билетами.

// Создание и конфигурация хранилища с использованием configureStore.
export const store = configureStore({
  reducer: {
    filter,     // Добавление редьюсера для фильтрации в состав хранилища.
    cart,       // Добавление редьюсера для корзины в состав хранилища.
    tours,    // Добавление редьюсера для билетов в состав хранилища.
  },
});




