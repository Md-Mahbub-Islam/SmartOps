import React from 'react'
import './MainDisplay.css'

// The display for the information
const items = [
    { id: 1, title: 'Name', name: 'BOB THE BOAT' },
    { id: 2, title: 'IMO', name: '2718281' },
    { id: 3, title: 'MMSI', name: '314159265' },
    { id: 4, title: 'Call sign', name: 'ABCD' },
];

const Item = ({ title, name }) => (
    <li className="item">
        <h2>{title}</h2>
        <p>{name}</p>
    </li>
);

const WhoTalking = ({showWhoTalking, setShowWhoTalking}) => {
    return (
    <>
        {showWhoTalking ?
            <div className="feature fea-text" >
                <ul className="items-list">
                    {items.map(item => (
                        <Item key={item.id} title={item.title} name={item.name} />
                    ))}
                </ul>
                <button>Who's Speaking</button>
            </div>
        : null}
    </>    
    )
}

export default WhoTalking