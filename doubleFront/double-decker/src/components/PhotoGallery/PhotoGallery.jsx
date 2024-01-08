import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://6559fdf76981238d054d035a.mockapi.io/items');
                const photosData = response.data;
                setPhotos(photosData.map((item) => item.countryImageUrl));
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const settings = {
        arrows: false,
        vertical: true,

        speed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="gallery">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Slider {...settings}>
                    {photos.map((imageUrl, index) => (
                        <div key={index} className="slide">
                            <img src={imageUrl} alt={`Country Image ${index}`} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default PhotoGallery;