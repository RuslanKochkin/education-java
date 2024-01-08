import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import React from "react";
import LogoLink from "./Logo/LogoLink";

function Header(){
    const {items} = useSelector(state =>state.cart)
    const totalCount = items.reduce((sum, item) => sum + item.count, 0 )
    return (
            <div className="header-content-cart">
                <Link to="/cart" className="button__cart">
                    <span>{totalCount}</span>
                </Link>
                <div className="LogoLink">
                    <LogoLink/>
                </div>
                <Link to="/cart" className="button__cart">
                    <span>{totalCount}</span>
                </Link>
            </div>
    );
}

export default Header;