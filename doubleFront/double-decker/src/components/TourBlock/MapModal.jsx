
import React, { useState, useEffect } from 'react';
const MapModal = ({ onClose, mapData }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const initializeMap = () => {
            const mapContainer = document.getElementById('map-container');

            if (mapContainer && window.google) {
                const mapInstance = new window.google.maps.Map(mapContainer, {
                    center: { lat: mapData.latitude, lng: mapData.longitude },
                    zoom: 14,
                    
                });

                const markerInstance = new window.google.maps.Marker({
                    position: { lat: mapData.latitude, lng: mapData.longitude },
                    map: mapInstance,
                    title: mapData.image,
                });

                setMap(mapInstance);
                setMarker(markerInstance);
            }
        };

        if (window.google) {
            initializeMap();
        } else {
            console.error('Google Maps API не загружен.');
        }

        return () => {
            // Чистим ресурсы (если это необходимо)
        };
    }, [mapData]);

    return (<div className="map">
            <p>Attention! Close the Card</p>
                <p>if you open a new one!</p>
            <div id="map-container" style={{ width: '18vw', height: '18vw' }}></div>
            </div>
    );
};

export default MapModal;
