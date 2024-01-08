import React from 'react'
import { useDispatch } from 'react-redux';
import { addItem, minusItem } from '../redux/slices/cartSlice';


const CartItem = ({ id, image, time, price, count, street, city,activeTimingIndex,formattedTimestamp,}) => {
    const dispatch = useDispatch();
    const { cityName, coatOfArms } = city;

    const onClickPluse = () => {dispatch(addItem({activeTimingIndex,}),);};

    const onClickMinus = () => {
        dispatch(minusItem({id, activeTimingIndex }));
    };
    // const onClickRemove = () => {
    //     if(window.confirm('You really nail it?')){
    //         dispatch(removeItem(activeTimingIndex));
    //     }
    // };
  return (
      <div>
    <div className="cart-item">

        <div className="cart-item__ticket-header" >
            <h3>TICKET<br/>
            {formattedTimestamp}</h3>
            {coatOfArms && (
                <img src={coatOfArms} alt={`${cityName}`} />
            )}
        </div>

    <div className="cart-item__ticket-cart">
      <img src={image} alt="img"/>
        <h4>{cityName}<br/>
        {street}<br/>
        {time}</h4>
    </div>

    <div className="cart-item__count">
        <button onClick={onClickMinus} className="minus">
            <b>-</b>
        </button>
        <h4>Quantity</h4>
        <span>{count}</span>
        <h4>Price:</h4>
        <span>{price*count}eu</span>
    </div>

    </div>

        <div className='cart-item__img-footer'>
            <p></p>
        </div>

  </div>

  )
}
export default CartItem;
