import React, { useState, useEffect } from 'react'; // Import React and useEffect
import './App.css';

import { Loader } from "@googlemaps/js-api-loader";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  


  useEffect(() => { // Use useEffect for loading Google Maps
    const loader = new Loader({
      apiKey: "AIzaSyBsP92ccVO68avVSH6El_Ff6ogc-MPeem4",
      version: "weekly",
      // ...additionalOptions,
    });

    loader.load().then(async () => {
      const { google } = window;
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 42.3601, lng: -71.0942 },
        zoom: 2,
      });

      // Add a new Marker component to the map and pass in the user's latitude and longitude as props.
      if (userLocation) {
        const marker = new google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          title: 'My Location'
        });

        marker.setMap(map);
        map.zoom = 10;
      }
    });
  }, [userLocation]); // Add the userLocation state variable to the dependency array to ensure the map is re-rendered when the user's location changes.

  useEffect(() => {
    // Get the user's geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div>
      <div className="title">
        <h1 id="firenet">FIRENET</h1>
        <h3 id="description">Fire Identification, Real-time Evacuation, Navigation, Emergency Technology</h3>
      </div>

      <div style={{ display: "flex" }}>
        <div id="map" style={{ width: "90vw", height: "90vh" }}></div>
      </div>
    </div>
  );
}

export default App;