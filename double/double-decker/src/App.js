import React from 'react';

import { Routes, Route } from 'react-router-dom';
// притащили из папки components содержимый в Header jsx xml код с помощью функционального-компонента Header
import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NoteFound from './pages/NotFound';

// импортировали наш scss код с помощью библиотеки scss
import './scss/app.scss';
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import LogoLink from "./components/Logo/LogoLink";
import Clock from "./components/ClockBlock/clock";

//создали контекст глобальную переменную
export const SearchContext = React.createContext('');


// функция которая возврашает html
function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
      <div className="wrapper">

        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="header">
                <Clock />
                <Header />
                    {/*<Routes>*/}
                    {/*    <Route index element={<PhotoGallery />} />*/}
                    {/*</Routes>*/}
                <div className='image-ticket-footer'>
                    <p>.</p>
                </div>
                </div>
          <div className="content">
            <Routes>
              {/* Route перемещает по страницам в зависимости от path="/" и отображает element={<Home/>} */}
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart/>} />
              {/* path="*" - перекидывает если страница не найдена то  */}
              <Route path="*" element={<NoteFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
  );
}
// экспорт хоть куда
export default App;
