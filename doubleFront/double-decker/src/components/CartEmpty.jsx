import React from 'react'


import carEmptytImg  from '../asset/IconImg/empty-cart.png'

const CartEmpty = () => {
    return (
        <div className="cart-empty">
            <h4>Cart empty add ticket! </h4>
            <img src={carEmptytImg } alt="Empty cart" />
        </div>

    )
}
export default CartEmpty;
