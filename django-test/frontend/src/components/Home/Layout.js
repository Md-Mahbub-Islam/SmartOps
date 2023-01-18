import React from 'react';
import { state, setState, useState, useEffect, handleClick } from 'react'
import { Button } from '../Button';
import './MainDisplay.css'
import './Ships.css'
import './Map.css'

const Layout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <MainContent />
            <Sidebar />
        </div>
    );
};


const Sidebar = () => {
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    return (
        <div className='sidebar-wrapper'>
            <Map isExpanded={isMapExpanded} />
            <button onClick={() => setIsMapExpanded(!isMapExpanded)}>View</button>
            <ConversationLog />

        </div>
    );
};


const Map = ({ isExpanded }) => {
    const mapStyle = {
        height: isExpanded ? '100%' : '30%',
    };

    return (
        <div className='map-container' style={mapStyle}>
            <h2 style={{ fontSize: '18px', textAlign: 'center' }}>Map</h2>
            <img src="/images/map.jpg" alt="Map" style={{ width: '100%' }} />
        </div>
    );
};


const ConversationLog = () => (
    <div className="message-wrapper">
        <h2 style={{ fontSize: '18px', textAlign: 'center' }}>Conversation Log</h2>
        <ul className='message-list' style={{ listStyleType: 'none', padding: 0 }}>
            <li className='log' style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>Message 1</li>
            <li className='log' style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>Message 2</li>
            <li className='log' style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>Message 3</li>
        </ul>
    </div>
);


// The function to component for ships list and main display
const MainContent = () => (
    <div style={{ width: '80%', height: '100%', backgroundColor: '#000' }}>
        <Ships />
        <MainDisplay />
    </div>
);


// The display for the information
const items = [
    { id: 1, title: 'Name', name: 'BOB THE BOAT' },
    { id: 2, title: 'IMO', name: '2718281' },
    { id: 3, title: 'MMSI', name: '314159265' },
    { id: 4, title: 'Call sign', name: 'ABCD' },
];
const MainDisplay = () => (
    <div style={{ height: '50%' }}>
        <div className="home_content">
            <h1>Speaking now</h1>
            <div className="signal">
                <img src="../Assets/Vector.png" alt="freq"></img>
            </div>
            <div className="feature">
                <ul className="items-list">
                    {items.map(item => (
                        <Item key={item.id} title={item.title} name={item.name} />
                    ))}
                </ul>
            </div>
            <button>Who's talking</button>
        </div>
    </div>
);
const Item = ({ title, name }) => (
    <li className="item">
        <h2>{title}</h2>
        <p>{name}</p>
    </li>
);

// The list of ship item that are within the range
const ships = [
    { id: 1, name: 'Enterprise', captain: 'James T. Kirk' },
    { id: 2, name: 'Defiant', captain: 'Benjamin Sisko' },
    { id: 3, name: 'Voyager', captain: 'Kathryn Janeway' },
    { id: 4, name: 'Discovery', captain: 'Gabriel Lorca' },
    { id: 1, name: 'Enterprise', captain: 'James T. Kirk' },
    { id: 2, name: 'Defiant', captain: 'Benjamin Sisko' },
    { id: 3, name: 'Voyager', captain: 'Kathryn Janeway' },
    { id: 4, name: 'Discovery', captain: 'Gabriel Lorca' },
];
const Ships = () => (
    <div className="ships_content">
        {ships.map(ship => (
            <Ship key={ship.id} name={ship.name} captain={ship.captain} />
        ))}
    </div>
);

const Ship = ({ name, captain }) => (
    <div className="ship_img">
        <img src={`/Assets/ships/${name}.jpg`} alt={name} />
        {/* <h2>{name}</h2>
        <p>Captain: {captain}</p> */}
    </div>
);

export default Layout;