import React, { useState, useEffect } from "react"; // Import React and useEffect
import "./App.css";

import { Loader } from "@googlemaps/js-api-loader";

import connie from "./assets/connie.jpg"
import elena from "./assets/elena.jpg"
import harsh from "./assets/harsh.jpg"
import eric from "./assets/eric.jpg"


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
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.25,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 200,
          });
          const willBurnArea = new google.maps.Circle({
            strokeColor: "#FFA500",
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: "#FFA500",
            fillOpacity: 0.25,
            map,
            center: { lat: 42.365, lng: -71.1026 },
            radius: 600,
          });

          const safeMarker1 = new google.maps.Marker({
            position: { lat: 42.3556, lng: -71.0789 },
            title: "My Location",
          });
          safeMarker1.setIcon(
            "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          );
          safeMarker1.setMap(map);

          const safeMarker2 = new google.maps.Marker({
            position: { lat: 42.3551, lng: -71.0657 },
            title: "My Location",
          });

          safeMarker2.setIcon(
            "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          );
          safeMarker2.setMap(map);

          const safeMarker3 = new google.maps.Marker({
            position: { lat: 42.342, lng: -71.0949 },
            title: "My Location",
          });

          safeMarker3.setIcon(
            "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          );
          safeMarker3.setMap(map);

          const safeMarker4 = new google.maps.Marker({
            position: { lat: 42.3417, lng: -71.1099 },
            title: "My Location",
          });

          safeMarker4.setIcon(
            "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          );
          safeMarker4.setMap(map);

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
              <li style={{ textAlign: "left" }}>
                James P. Kelleher Rose Garden
              </li>
              <li style={{ textAlign: "left" }}>Boston Common</li>
              <li style={{ textAlign: "left" }}>Riverway I</li>
            </ol>
          </div>;

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

      // const burnedArea = new google.maps.Circle({
      //   strokeColor: "#FF0000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FF0000",
      //   fillOpacity: 0.35,
      //   map,
      //   center: { lat: 42.3647, lng: -71.094 },
      //   radius: 200,
      // });
      // const willBurnArea = new google.maps.Circle({
      //   strokeColor: "#FFA500",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FFA500",
      //   fillOpacity: 0.35,
      //   map,
      //   center: { lat: 42.3647, lng: -71.094 },
      //   radius: 600,
      // });
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
        <h1 id="firenet" style={{ color: '#FFFFFF' }}>FireNET</h1>
        <h1 id="firenet" style={{ color: '#fa6436', marginTop: '-88px' }}>FireNET</h1>
        <h3 id="description">
          Fire Identification, Real-time Evacuation, Navigation, Emergency
          Technology
        </h3>
      </div>

      <div style={{ display: "flex" }}>
        <div id="map" style={{ width: "90vw", height: "90vh", borderRadius: '10px'}}></div>
      </div>
      <div style={{ backgroundColor: '#2f2f2f', padding: '1vw', marginTop: '2vw', borderRadius: '10px' }}>
        <h1 style={{ color: '#fa6436' }}>About the Project</h1>
        <p>
          Every year, more than 35 thousand cases of wildfire occur in the US. Recently, the severe Maui wildfire caused 79 people to lose their lives, with at least 31 people missing.
        </p>
        <p>
          We’re team FireNet. We accurately detect real-time wildfires and evacuate people safely.
        </p>
        <p>
          We will install fire detector sensors and install them 3 miles apart around areas in high-risk of forest fires.
        </p>
        <p>
          Any value detected from the flame sensor above 1023 micro-amps is in the safety green zone. The range between 804-1023 micro-amps will make the light turn from green to yellow because it is in the fire hazard warning zone. When the sensor unit detects fire under 804 micro-amps, it will beep for 15 second intervals over 2 minutes as the light turns from green to red. Our web app displays the estimated area of wildfire, and people within half a mile radius around it will be notified to evacuate.
        </p>
        <p>
          To guide people to a safe destination, we have suggested locations indicated on the web app.
        </p>
        <p>
          With the touch of a button, people get redirected from the web app to Google maps, and are ensured to smoothly relocate to an appropriate location.
        </p>
        <p>
          Witnessing the detrimental effects of the wildfires that have happened in the past, we knew that we have to come up with a solution to mitigate the impact it has on people. From detection to evacuation, FireNet brings more safety and security to everyone’s lives.</p>
      </div>
      <div style={{borderRadius: '10px', backgroundColor: '#2f2f2f'}}>
        <h1 style={{ color: '#fa6436', paddingTop: '3vh'}}>About the Team</h1>

        <div style={{ display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '19vw', backgroundColor: 'grey', padding: '1vw', margin: '1vw', borderRadius: '10px' }}>
            <img src={connie} style={{ width: '19vw' }} alt="Connie" />
            <p>
              Elena is a sophomore student studying entrepreneurship at Babson College. She taught herself Python and Java and she likes creating Youtube and Newsletter content.
            </p>
          </div>

          <div style={{ width: '19vw', backgroundColor: 'grey', padding: '1vw', margin: '1vw', borderRadius: '10px' }}>
            <img src={elena} style={{ width: '19vw' }} alt="Elena" />
            <p>
              Connie is a second year electrical engineering student with a CS minor at San Jose State University. She has experience in Arduino, Python, and a little but of web development.
            </p>
          </div>

          <div style={{ width: '19vw', backgroundColor: 'grey', padding: '1vw', margin: '1vw', borderRadius: '10px' }}>
            <img src={harsh} style={{ width: '19vw' }} alt="Harsh" />
            <p>
              Harsh is a Penn State sophomore who juggles Comp Sci, Economics, and a dash of Engineering Entrepreneurship. When Harsh is not coding or hiking, they are probably debating if the Matrix is an economic model. 🤓🛸
            </p>
          </div>

          <div style={{ width: '19vw', backgroundColor: 'grey', padding: '1vw', margin: '1vw', borderRadius: '10px' }}>
            <img src={eric} style={{ width: '19vw' }} alt="Eric" />
            <p>
              Eric is a second-year at Cal State Fullerton, studying Computer Science and Economics. In his free time, he likes to watch video essays, ice-skate, and drink matcha :D.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
export default App;