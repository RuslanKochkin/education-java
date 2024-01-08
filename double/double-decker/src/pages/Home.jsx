import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import Countries from '../components/Countries'
import ToursBlock from '../components/TourBlock/index'
import Skeleton from '../components/TourBlock/Skeleton'
import Pagination from '../components/Pagination/index'

import { setCountryId, setCurrentPage } from '../redux/slices/filterSlice';

import { SearchContext } from "../App";
import {fetchTours} from "../redux/slices/toursSlice";

const Home = () => {
    // Получение dispatch и данных из Redux-стейта.
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.tours);
    const { countryId, currentPage} = useSelector((state) => state.filter);

    // Получение значения searchValue из контекста поиска.
    const { searchValue } = React.useContext(SearchContext);

    // Callback-функция для изменения выбранной страны.
    const onChangeCountry = React.useCallback((id) => {
        dispatch(setCountryId(id));
    }, [dispatch]);

    // Функция для изменения текущей страницы.
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    // Загрузка билетов при изменении параметров фильтрации.
    React.useEffect(() => {
        const getTickets = async () => {
            const country = countryId > 0 ? `country=${countryId}` : ''; // Формирование строки с идентификатором страны, если он больше 0.
            const search = searchValue ? `&search=${searchValue}` : ''; // Формирование строки поиска, если searchValue существует.

            // Вызов асинхронного экшена fetchTickets для получения билетов с сервера.
            dispatch(fetchTours({
                country,
                search,
                currentPage
            }));
        };

        getTickets();
    }, [countryId, searchValue, currentPage]);


    const tickets = items.map((obj) => (
        <ToursBlock key={obj.id} searchValue={searchValue} {...obj} />
    ));
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

// Отображение компонента Home.
    return (
        // Обертка для компонента, применяющая стили через класс "container".
        <div className="container">
            {/* Верхняя часть контейнера, содержащая компонент Countries и, возможно, Sort. */}
            <div className="container__top">
                {/* Компонент Countries для отображения списка и выбора страны. */}
                <Countries
                    // Проп "value" передает текущее значение выбранной страны в компонент Countries.
                    value={countryId}

                    // Проп "onChangeCountry" передает функцию "onChangeCountry" в компонент Countries.
                    // Функция "onChangeCountry" вызывается при выборе новой страны.
                    onChangeCountry={onChangeCountry}
                    tours={items}
                />


            </div>

            <div className="item-page">
                {/* Обработка статуса загрузки данных (загрузка, ошибка или отображение билетов). */}
                {status === 'error' ? (
                    <div className="content__error-info">
                        <h2>An error occurred while loading data</h2>
                        <p>Didn't manage to get the sneakers</p>
                    </div>
                ) : (
                    <div className="content__items">{status === 'Loading' ? skeletons : tickets}</div>
                )}
                {/* Компонент Pagination для управления страницами. */}
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </div>
    );
};

// Экспорт компонента для использования в других частях приложения.
export default Home;
