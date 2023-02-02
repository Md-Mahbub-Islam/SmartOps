import React, { useEffect, useState } from 'react';

function RealTimeMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const googleMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 13
      });
      setMap(googleMap);
    };
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5sX2X6ZskoeZopQS0jS7bhK4_gG05la0 &callback=initMap';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}

export default RealTimeMap;
