import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    }

    componentDidMount() {
        //YOUR_API_KEY = 'AIzaSyA5sX2X6ZskoeZopQS0jS7bhK4_gG05la0 &callback=initMap'
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5sX2X6ZskoeZopQS0jS7bhK4_gG05la0 &callback=initMap`;
        window.document.body.appendChild(googleMapsScript);

        googleMapsScript.addEventListener('load', () => {
            this.map = new window.google.maps.Map(this.mapRef.current, {
                center: { lat: 60.4518, lng: 22.2666 }, //lat: 40.712776, lng: -74.005974
                zoom: 12
            });
        });
    }

    render() {
        const style = {
            width: '100%',
            height: '250px'
        };

        return <div style={style} ref={this.mapRef} />;
    }
}

export default Map;
