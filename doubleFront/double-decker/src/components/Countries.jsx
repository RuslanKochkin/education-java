import React from 'react';

function Countries({ value, onChangeCountry, tours }) {

    const countryList = tours.map((tour) => ({
        label: tour.country,
        image: tour.imageFlag,
    }));

    return (
        <div className="countries">
            <ul>
                {countryList.map((country, i) => (
                    <li key={i} onClick={() => onChangeCountry(i)} className={value === i ? 'active' : ''}>
                            <>
                                <img src={country.image} alt={country.image} />
                                <p>{country.label}</p>
                            </>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Countries;






