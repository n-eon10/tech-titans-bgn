import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import { Map } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import { getDistance } from 'geolib'; // For calculating distances

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Maps = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.5074,  // Default to London initially
    longitude: -0.1276,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const [pins, setPins] = useState([]); // Store the pins data
  const [selectedLocation, setSelectedLocation] = useState(null); // Store info about the clicked pin
  const [userLocation, setUserLocation] = useState(null); // Store the user's current location
  const [nearestLocations, setNearestLocations] = useState([]); // Store nearest locations

  // Fetch user's location and update the map to center on their location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prevState) => ({
            ...prevState,
            latitude,   // Set the map to the user's latitude
            longitude,  // Set the map to the user's longitude
          }));
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Only run once when the component mounts

  // Fetch businesses and events, and convert them into pin data
  useEffect(() => {
    const generatePins = async () => {
      try {
        const bbResponse = await fetch('http://localhost:4000/api/blackbusinesses/getallblackbusiness');
        const bbData = await bbResponse.json();
        const businesses = bbData.data || [];

        const eventsResponse = await fetch('http://localhost:4000/api/events/getallevents');
        const eventsData = await eventsResponse.json();
        const events = eventsData.events || [];

        const locations = [];

        // Process businesses
        businesses.forEach((item) => {
          const [lat, lon] = item.location.split(',').map(Number);
          if (!isNaN(lat) && !isNaN(lon)) {
            locations.push({
              position: [lon, lat],
              title: item.name,
              description: item.description, // Use actual description
              link: item.link, // Use actual link
              category: 'business',
            });
          }
        });

        // Process events
        events.forEach((item) => {
          const [lat, lon] = item.location.split(',').map(Number);
          if (!isNaN(lat) && !isNaN(lon)) {
            locations.push({
              position: [lon, lat],
              title: item.name,
              description: item.description, // Use actual description
              link: item.link, // Use actual link
              category: 'event',
            });
          }
        });

        setPins(locations); // Update state with pins
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    generatePins();
  }, []);

  // Find nearest locations to the user
  useEffect(() => {
    if (userLocation && pins.length > 0) {
      const nearest = findNearestLocations(userLocation, pins);
      setNearestLocations(nearest);
    }
  }, [userLocation, pins]);

  const findNearestLocations = (userLocation, locations) => {
    return locations
      .map((location) => ({
        ...location,
        distance: getDistance(
          { latitude: userLocation[1], longitude: userLocation[0] },
          { latitude: location.position[1], longitude: location.position[0] }
        ),
      }))
      .sort((a, b) => a.distance - b.distance) // Sort by distance
      .slice(0, 5); // Show top 5 nearest locations
  };

  // Scatterplot layer for rendering pins with dynamic size based on zoom level
  const layers = [
    new ScatterplotLayer({
      id: 'pins',
      data: pins,
      getPosition: (d) => d.position,
      getFillColor: (d) => (d.category === 'business' ? [0, 128, 255] : [255, 0, 0]), // Blue for business, red for events
      getRadius: () => Math.min(2000 / viewport.zoom, 100), // Dynamic pin size: bigger when zoomed out
      pickable: true, // Enable click events
      onClick: ({ object, x, y }) => {
        if (object) {
          setSelectedLocation({
            title: object.title,
            description: object.description, // Show the correct description
            link: object.link, // Show the correct link
            x: x + 10, // Add a small horizontal offset for better positioning
            y: y - 10, // Add a small vertical offset to move it above the click point
          }); // Update selectedLocation on click
        }
      },
    }),
  ];

  const handleMapClick = () => {
    setSelectedLocation(null); // Clear the selected location when clicking off the box
  };

  return (
    <div className="relative h-screen w-screen flex space-x-4">
      {/* Nearest Locations Section */}
      <div className="w-1/4 bg-transparent p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Near You</h2>
        {nearestLocations.length > 0 ? (
          nearestLocations.map((location, index) => (
            <div key={index} className="mb-4 p-4 border rounded shadow-md bg-white text-black">
              <div className="font-semibold">{location.title}</div>
              <div className="text-sm text-gray-600">{location.description}</div>
              <div className="text-sm text-gray-500">
                {(location.distance / 1000).toFixed(2)} km away
              </div>
              <a
                href={location.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Learn more
              </a>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Loading nearest locations...</div>
        )}
      </div>

      {/* Map Section */}
      <div className="flex-1 relative" onClick={handleMapClick}>
        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers}
          onViewStateChange={({ viewState }) => setViewport(viewState)} // Update viewport on map move
        >
          <Map
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            style={{ width: '100%', height: '100%' }} // Fullscreen map
            mapStyle="mapbox://styles/mapbox/dark-v11"
          />
        </DeckGL>

        {/* Transparent overlay to detect clicks outside the box */}
        {selectedLocation && (
          <div
            className="absolute z-10 bg-white p-4 rounded shadow-md pointer-events-auto text-sm text-black"
            style={{ left: selectedLocation.x, top: selectedLocation.y }}
            onClick={(e) => e.stopPropagation()} // Stop the click event from propagating to the map
          >
            <h3 className="font-bold text-lg">{selectedLocation.title}</h3>
            <p>{selectedLocation.description}</p>
            <a
              href={selectedLocation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Learn more
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
