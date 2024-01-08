import React, { useState, useEffect } from 'react';
import './Clock.scss';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock-container">
            <div className="clock-dial">
                <div className="clock-hour" style={{ transform: `rotate(${(currentTime.getHours() % 12) * 30 + (currentTime.getMinutes() / 60) * 30}deg)` }}></div>
                <div className="clock-minute" style={{ transform: `rotate(${currentTime.getMinutes() * 6 + (currentTime.getSeconds() / 60) * 6}deg)` }}></div>
                <div className="clock-second" style={{ transform: `rotate(${currentTime.getSeconds() * 6}deg)` }}></div>
            </div>
        </div>
    );
};

export default Clock;



