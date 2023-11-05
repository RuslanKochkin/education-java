import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Products from './features/counter/products/Products';


function App(): JSX.Element {
 return (
  <div className="App">
   <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Counter />
    <Products />
   </header>
  </div>
 );
}

export default App;
