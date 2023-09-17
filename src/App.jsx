import React, { useState, useEffect } from "react"; // Import React and useEffect
import "./App.css";

import { Loader } from "@googlemaps/js-api-loader";
var messageData;
// var data;

function App() {
  const [newsData, setNewsData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Use useEffect for loading Google Maps
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

      // const safeAreaMarker = new google.maps.Marker({
      //   position: { lat: , lng: userLocation.lng },
      //   title: "My Location",
      // });

      // Add a new Marker component to the map and pass in the user's latitude and longitude as props.
      if (userLocation) {
        const marker = new google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          title: "My Location",
        });

        marker.setMap(map);
        map.zoom = 14;
      }

      const ws = new WebSocket("ws://localhost:3000"); // Replace with your backend URL

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      // var fire = false;
      ws.onmessage = (event) => {
        // Handle incoming WebSocket messages (MQTT data)
        const data = JSON.parse(event.data);
        console.log(`Received message on topic ${data.topic}: ${data.message}`);

        messageData = JSON.parse(data.message);

        if (messageData.FlameSensor > 804) {
          const burnedArea = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 0,
          });
          const willBurnArea = new google.maps.Circle({
            strokeColor: "#FFA500",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFA500",
            fillOpacity: 0,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 0,
          });
        }

        if (messageData.FlameSensor <= 804) {
          // fire = true;

          const burnedArea = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 200,
          });
          const willBurnArea = new google.maps.Circle({
            strokeColor: "#FFA500",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFA500",
            fillOpacity: 0.35,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 600,
          });

          // var burningAreas = {
          //   // next step: theoretically get from the JSON but hardcoding it for now
          //   location0: {
          //     center: { lat: 42.365, lng: -71.1026 },
          //     fire: messageData.Fire,
          //   },
          //   location1: {
          //     center: { lat: 42.3657, lng: -71.0824 },
          //     fire: "true",
          //   },
          // };

          // Process the MQTT message as needed

          // move to better place
        }

        console.log(messageData.Fire);

        ws.onclose = () => {
          console.log("WebSocket disconnected");
        };

        return () => {
          // Clean up WebSocket connection if needed
          ws.close();
        };
      };

      // console.log("outside Fire", Fire);

      const burnedArea = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: 42.3647, lng: -71.094 },
        radius: 200,
      });
      const willBurnArea = new google.maps.Circle({
        strokeColor: "#FFA500",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFA500",
        fillOpacity: 0.35,
        map,
        center: { lat: 42.3647, lng: -71.094 },
        radius: 600,
      });
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

  // useEffect(() => {
  //   // WebSocket connection
  // }, []);

  return (
    <div>
      <div className="title">
        <h1 id="firenet">FIRENET</h1>
        <h3 id="description">
          Fire Identification, Real-time Evacuation, Navigation, Emergency
          Technology
        </h3>
      </div>

      <div style={{ display: "flex" }}>
        <div id="map" style={{ width: "90vw", height: "90vh" }}></div>
      </div>

      {/* Overlay Square with Text */}
      <div
        id="overlay"
        className="overlay"
        style={{
          position: "absolute",
          top: "690px", // Adjust the top position as needed
          left: "90px", // Adjust the left position as needed
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "10px",
          border: "2px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ fontSize: "18px", margin: "0", padding: "0" }}>
          Suggested Locations
        </h3>{" "}
        {/* Adjust the font size as needed */}
        <ol style={{ margin: "0", paddingLeft: "20px" }}>
          <li style={{ textAlign: "left" }}>Charles River Esplanade</li>
          <li style={{ textAlign: "left" }}>James P. Kelleher Rose Garden</li>
          <li style={{ textAlign: "left" }}>Boston Common</li>
          <li style={{ textAlign: "left" }}>Riverway I</li>
        </ol>
      </div>
    </div>
  );
}
export default App;