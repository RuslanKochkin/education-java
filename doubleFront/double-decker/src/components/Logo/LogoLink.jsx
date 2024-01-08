import React from 'react';
import { Link } from 'react-router-dom';

const LogoLink = () => {
    return (
        <div className="logo-link">
            <Link to="/">
                <h1>DOUBLE DECKER</h1>
            </Link>
        </div>
    );
};

export default LogoLink;