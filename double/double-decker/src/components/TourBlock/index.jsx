import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import MapModal from './MapModal';
import Cart from "../../pages/Cart";
import WeatherComponent from "../WeatherBlock/WeatherComponent";




function TicketBlock({ id, city, price, locations = [] }) {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [activeTimingIndex, setActiveTimingIndex] = useState(null); // Изначально не выбрано
  const [showTimings, setShowTimings] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null); // Индекс блока с открытой картой
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const {items} = useSelector(state =>state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0 );
  const currentTime = new Date();
  const [isWeatherComponentOpen, setIsWeatherComponentOpen] = useState(false);



  const countByKey = (key) => {
    const initialCount = 10; // начальное количество
    const addedCount = items.reduce((count, item) => {
      const itemKey = `${item.date}_${item.street}_${item.activeTimingIndex}`;
      return itemKey === key ? count + item.count : count;
    }, 0);

    const remainingCount = initialCount - addedCount;
    return remainingCount >= 0 ? remainingCount : 0;
  };

  const onClickAdd = () => {
    const selectedLocation = locations[activeLocationIndex];
    const selectedTiming = selectedLocation.timings[activeTimingIndex];

    if (!selectedLocation || !selectedLocation.timings || !selectedLocation.timings.length) {
      console.error('Invalid location or timings');
      return;
    }
    if (activeTimingIndex === null || !selectedTiming) {
      console.error('Invalid timing');
      return;
    }

    const item = {
      id,
      city: {
        city: city[0]?.city,
        coatOfArms: city[0]?.coatOfArms,
      },
      price,
      activeTimingIndex,
      image: selectedLocation.image,
      time: selectedTiming,
      street: selectedLocation.street,
      date: currentTime.toISOString().split("T")[0], // Только дата
      formattedTimestamp: currentTime.toLocaleString(), // Добавляем timestamp (ISO формат)
    };

    dispatch(addItem(item));
  };

  const toggleTimings = () => {
    setShowTimings(!showTimings);
  };

  const changeTiming = (timingIndex) => {
    setActiveTimingIndex(timingIndex);
  };
  const remainingCount =
      countByKey(`${currentTime.toISOString().split("T")[0]}_${locations[activeLocationIndex]?.street}_${activeTimingIndex}`);

  const createMapData = (locationIndex) => {
    const selectedLocation = locations[locationIndex];

    if (!selectedLocation) {
      console.error('Invalid location');
      return;
    }

    const mapData = {
      id: selectedLocation.id,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      image: selectedLocation.image,
      street: selectedLocation.street,
    };
    if (selectedBlockIndex === locationIndex) {
      closeMap();
    } else {

      setMapData(mapData);
      setIsMapModalOpen(false);
      setSelectedBlockIndex(locationIndex); // Устанавливаем индекс блока с открытой картой
    }
  };

  const closeMap = () => {
    setIsMapModalOpen(true);
    setSelectedBlockIndex(null); // Закрываем карту в текущем блоке
  };

  useEffect(() => {
    if (activeLocationIndex !== null) {
      createMapData(activeLocationIndex);
    }
  }, [activeLocationIndex]);



  const changeActiveLocation = (locationIndex) => {
    if (selectedBlockIndex !== null) {
      // Закрываем предыдущую открытую карту перед открытием новой
      closeMap();
    }
    setActiveLocationIndex(locationIndex);
    setActiveType(0);
    setActiveTimingIndex(null);
  };

  return (
      <div className="tickets">

        {/*<div className="ticket-header">*/}
        {/*  <div className="ticket-header__header-city">*/}
        {/*    {city.map((cityData, index) => (*/}
        {/*        <div className="city" key={index}>*/}
        {/*          {cityData.coatOfArms && (*/}
        {/*              <img src={cityData.coatOfArms} alt={`${cityData.cityName}`} />*/}
        {/*          )}*/}
        {/*          <h2 key={`city-name-${index}`}>{cityData.cityName}</h2>*/}
        {/*          <p>TICKET</p>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}

        {/*  {locations.map((location, locationIndex) => (*/}
        {/*      <button*/}
        {/*          key={location.id}*/}
        {/*          onClick={() => changeActiveLocation(locationIndex)}*/}
        {/*          className={activeLocationIndex === locationIndex ? "active" : ""}*/}
        {/*      >*/}
        {/*        <h3>Location:</h3>*/}
        {/*        <h4 key={`location-street-${location.id}`}>{location.street}</h4>*/}
        {/*        <img className="location-image" src={location.image} alt={location.image} />*/}
        {/*      </button>*/}
        {/*  ))}*/}
        {/*</div>*/}

        {/*<div className="ticket-item">*/}
        {/*  <div className="ticket-item__block-timing">*/}

        {/*    <button onClick={toggleTimings}*/}
        {/*            className={activeTimingIndex !== null ? '' : 'active'}*/}
        {/*    >*/}
        {/*      <h4>TIME BOARD</h4>*/}
        {/*      {activeTimingIndex !== null*/}
        {/*          ? locations[activeLocationIndex]?.timings[activeTimingIndex]*/}
        {/*          : <p>Select Time</p>}*/}
        {/*    </button>*/}

        {/*    {showTimings && (*/}

        {/*        <ul>*/}
        {/*          <h4>Remaining number of tickets <br />*/}
        {/*            for this excursion [{remainingCount}]</h4>*/}
        {/*          {locations[activeLocationIndex]?.timings.map((timing, timingIndex) => (*/}
        {/*              <li*/}
        {/*                  key={timingIndex}  // Используем индекс в качестве ключа*/}
        {/*                  onClick={() => changeTiming(timingIndex)}*/}
        {/*                  className={activeTimingIndex === timingIndex ? "active" : ""}*/}
        {/*              >*/}
        {/*                {timing}*/}
        {/*              </li>*/}
        {/*          ))}*/}
        {/*        </ul>*/}
        {/*    )}*/}
        {/*  </div>*/}

        {/*  <div className="ticket-item__price-add">*/}
        {/*    <div className="price">*/}
        {/*  <span onClick={onClickAdd}*/}
        {/*        className={activeTimingIndex !== null ? 'active' : ''}>*/}
        {/*    <h3>ADD</h3>*/}
        {/*  </span>*/}
        {/*      <h4 className={activeTimingIndex !== null ? 'active' : ''}>*/}
        {/*        all[{totalCount}] </h4> <h4> eu{price}</h4>*/}

        {/*      <span onClick={() => setIsCartModalOpen(prevState => !prevState)}*/}
        {/*            className={isCartModalOpen ? 'active' : ''}>*/}

        {/*    <h3>CART</h3>*/}
        {/*  </span>*/}
        {/*    </div>*/}
        {/*    <div className="CartModal">*/}
        {/*      {isCartModalOpen && <Cart onClose={() => setIsCartModalOpen(false)} />}*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="ticket-item__block-map">*/}
        {/*    <button onClick={() => createMapData(activeLocationIndex)}*/}
        {/*            className={selectedBlockIndex !== null ? '' : 'active'}*/}
        {/*    >*/}
        {/*      <h4>LANDING LOCATION: </h4>*/}
        {/*      <p className={activeTimingIndex !== null ? 'active' : ''}> {locations[activeLocationIndex]?.street}</p>*/}
        {/*    </button>*/}

        {/*    {isMapModalOpen && (*/}
        {/*        <MapModal*/}
        {/*            onClose={closeMap}*/}
        {/*            mapData={mapData}*/}
        {/*        />*/}
        {/*    )}*/}
        {/*  </div>*/}

        {/*  <div className="ticket-item__price-add">*/}
        {/*    <div className="price">*/}
        {/*      <h3 className={isWeatherComponentOpen ? 'show-weather active' : 'close-weather'}>WEATHER:</h3>*/}
        {/*      {city.map((cityData, index) => (*/}
        {/*          <h4 key={`city-name-weather-${index}`}>{cityData.cityName}</h4>*/}
        {/*      ))}*/}
        {/*      <span className={activeTimingIndex !== null ? 'active' : ''}*/}
        {/*            onClick={() => {*/}
        {/*              setIsWeatherComponentOpen((prev) => !prev);*/}
        {/*            }}*/}
        {/*      >*/}
        {/*    <h3 className={isWeatherComponentOpen ? 'show-weather active' : 'close-weather'}>*/}
        {/*      {isWeatherComponentOpen ? 'CLOS' : 'SHOW'}</h3>*/}
        {/*  </span>*/}
        {/*    </div>*/}
        {/*    {isWeatherComponentOpen && (*/}
        {/*        <WeatherComponent location={mapData} />*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<p className="tickets__text">*/}
        {/*  There should be descriptions of popular routes in a given city. A description of a separate route is possible.*/}
        {/*  There should be descriptions of popular routes in a given city. A description of a separate route is possible.*/}
        {/*  There should be descriptions of popular routes in a given city. A description of a separate route is possible.*/}
        {/*  There should be descriptions of popular routes in a given city. A description of a separate route is possible.*/}
        {/*  There should be descriptions of popular routes in a given city. A description of a separate route is possible.</p>*/}

        {/*<div className='image-ticket-footer'>*/}
        {/*    <p></p>*/}
        {/*</div>*/}
      </div>
  );
}

export default TicketBlock;






