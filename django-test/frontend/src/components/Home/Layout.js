import React from 'react';
import { useState, useEffect } from 'react'
import { Button } from '../Button';
import './MainDisplay.css'
import './Ships.css'
import './Map.css'
import WhoTalking from './WhoTalking';
import Map from './Map';

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
        {/*<button>Who's Speaking</button>*/}
    </div>
);


// The display for the information
const items = [
    { id: 1, title: 'Name', name: 'BOB THE BOAT' },
    { id: 2, title: 'IMO', name: '2718281' },
    { id: 3, title: 'MMSI', name: '314159265' },
    { id: 4, title: 'Call sign', name: 'ABCD' },
];

const MainDisplay = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/paragraph/1/');
            const result = await response.json();
            setData(result);
        };

        const intervalId = setInterval(() => {
            fetchData();
        }, 300); // fetch data every x miliseconds

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // making a popup
    const [showWhoTalking, setShowWhoTalking] = useState(false)

    const openWhoTalking = ()=> {
        setShowWhoTalking(prev => !prev)
    }

    return (
        <div className="container">
            <div className="home_content">
                <h1>Speaking now</h1>
                <div className="signal">
                    <img height="50px" width="200px" src="../Assets/viz.gif" alt="freq"></img>
                </div>
                <div className="transcript">{data ? data.paragraph : 'Loading...'}</div>
                {/* <button>Who's talking</button> */}
                <button onClick={openWhoTalking}>Who's talking</button>
                <WhoTalking showWhoTalking={showWhoTalking} setShowWhoTalking={setShowWhoTalking}/>
            </div>
            
        </div>
    );
};

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
    <div className='shipWrapper'>
        <div className="ship_img">
            <img src={`../Assets/ships/icon.png`} alt={name} />
            {/*<img src={`../Assets/ships/${name}.png`} alt={name} />
            <h2>{name}</h2>
            <p>Captain: {captain}</p> */}
        </div>
    </div>
);

export default Layout;