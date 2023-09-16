import React, { useState, useEffect } from 'react'; // Import React and useEffect
import './App.css';

import { Loader } from "@googlemaps/js-api-loader";

function App() {
  const [newsData, setNewsData] = useState([]);

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
        zoom: 8,
      });
    });
  }, []); // Add an empty dependency array to run this effect only once

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://newsapi.org/v2/everything?' +
          'q=Boston Weather&' +
          'from=2023-09-15&' +
          'sortBy=popularity&' +
          'apiKey=628ee3d227de40e580292092be76b556';

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setNewsData(data.articles); // Store the news data in state

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>FIRENET</h1>
        <h3>Fire Identification, Real-time Evacuation, Navigation, Emergency Technology</h3>

      </div>

      {/* Display your map in a div */}
      <div style={{ display: "flex" }}>
        <div id="map" style={{ width: "45vw", height: "80vh" }}></div>
        {/* <div id="news" style={{ width: "45vw", backgroundColor: "brown" }}>
          <h2>Weather News</h2>

          {newsData.slice(0, 5).map((article, index) => (
            <div key={index}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div> */}

      </div>

    </div>
  );
}

export default App;
