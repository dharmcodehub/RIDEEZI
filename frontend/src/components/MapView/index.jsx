import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import customMarkerIcon from "../../assets/custom-marker-icon.png"; // Add your custom marker icon here

// Configure Leaflet's default icon paths
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

// Create a custom icon for the marker
const userLocationIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [40, 40], // Adjust size as needed
  iconAnchor: [20, 40], // Anchor point for the icon
  popupAnchor: [0, -40], // Position of the popup relative to the icon
});

// Create a custom icon for the user's current location (blue dot)
const currentLocationIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Blue marker icon
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point for the icon
  popupAnchor: [0, -41], // Position of the popup relative to the icon
  className: "blue-dot", // Optional class for styling
});

// Component to recenter the map when userLocation changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// Component to adjust map bounds based on locations
function AdjustMapBounds({ startLocation, endLocation, userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (startLocation && endLocation) {
      const bounds = L.latLngBounds([startLocation, endLocation]);
      map.fitBounds(bounds, { padding: [50, 50] }); // Adjust padding as needed
    } else if (userLocation) {
      map.setView(userLocation, 13); // Default zoom level for user location
    }
  }, [startLocation, endLocation, userLocation, map]);

  return null;
}

// Component to add routing to the map
function Routing({ startLocation, endLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !startLocation || !endLocation) return;

    let routingControl;

    try {
      routingControl = L.Routing.control({
        waypoints: [L.latLng(startLocation), L.latLng(endLocation)],
        routeWhileDragging: false,
        show: false, // Hides the instructions panel
        addWaypoints: false, // Disables adding waypoints
        draggableWaypoints: false, // Disables dragging waypoints
        createMarker: () => null, // Prevents markers from being added
      }).addTo(map);
    } catch (error) {
      console.error("Error initializing routing control:", error);
    }

    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, startLocation, endLocation]);

  return null;
}

function MapView({ pickupLoc, destinationLoc }) {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location
  const [startLocation, setStartLocation] = useState(userLocation);
  const [endLocation, setEndLocation] = useState(null);
  const [routeDetails, setRouteDetails] = useState(""); // State to store route details
  const [routeInstructions, setRouteInstructions] = useState([]); // State to store route instructions

  console.log("pickupLoc:", pickupLoc);
  console.log("destinationLoc:", destinationLoc);

  useEffect(() => {
    let intervalId;

    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error fetching location:", error);
          },
          { enableHighAccuracy: true }
        );
      };

      // Fetch location immediately and then every 10 seconds
      updateLocation();
      intervalId = setInterval(updateLocation, 10000);
    }

    // Cleanup the interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Update start and end locations when props change
  useEffect(() => {
    console.log("Pickup Location:", pickupLoc);
    console.log("Destination Location:", destinationLoc);

    const validPickup =
      pickupLoc && typeof pickupLoc.ltd === "number" && typeof pickupLoc.lng === "number";
    const validDestination =
      destinationLoc && typeof destinationLoc.ltd === "number" && typeof destinationLoc.lng === "number";

    if (validPickup) {
      setStartLocation([pickupLoc.ltd, pickupLoc.lng]);
    } else if (!validPickup && !validDestination) {
      setStartLocation(userLocation);
    }

    if (validDestination) {
      setEndLocation([destinationLoc.ltd, destinationLoc.lng]);
    } else if (!validPickup && !validDestination) {
      setEndLocation(null);
    }

    console.log("Start Location:", startLocation);
    console.log("End Location:", endLocation);
  }, [pickupLoc, destinationLoc, userLocation]);

  useEffect(() => {
    if (!pickupLoc && !destinationLoc) {
      setStartLocation(userLocation); // Show only user location if ride is completed
      setEndLocation(null); // Remove destination location
    }
  }, [pickupLoc, destinationLoc, userLocation]);

  // Update route details dynamically
  useEffect(() => {
    if (startLocation && endLocation) {
      const distance = L.latLng(startLocation).distanceTo(L.latLng(endLocation)) / 1000; // Distance in km
      const eta = (distance / 40) * 60; // Assuming average speed of 40 km/h
      setRouteDetails(`Distance: ${distance.toFixed(2)} km, ETA: ${eta.toFixed(0)} mins`);
    } else {
      setRouteDetails("");
    }
  }, [startLocation, endLocation]);

  // Ensure valid latlng values before rendering markers
  const isValidLatLng = (latlng) => Array.isArray(latlng) && latlng.length === 2 && latlng.every((coord) => typeof coord === "number");

  return (
    <section className="flex relative flex-col items-end mx-auto w-full text-sm font-medium text-green-600 bg-neutral-200 h-full max-md:px-5 max-md:pb-24 max-md:max-w-full h-full">
      <MapContainer center={startLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
        <RecenterMap center={startLocation} />
        <AdjustMapBounds
          startLocation={isValidLatLng(startLocation) ? startLocation : null}
          endLocation={isValidLatLng(endLocation) ? endLocation : null}
          userLocation={isValidLatLng(userLocation) ? userLocation : null}
        />
        {/* Ensure Routing component uses startLocation and endLocation */}
        {isValidLatLng(startLocation) && isValidLatLng(endLocation) && (
          <Routing
            startLocation={startLocation}
            endLocation={endLocation}
          />
        )}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for user's current location */}
        {isValidLatLng(userLocation) && (
          <Marker position={userLocation} icon={currentLocationIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {/* Marker for pickup location */}
        {isValidLatLng(startLocation) && pickupLoc && (
          <Marker position={startLocation} icon={userLocationIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}
        {/* Marker for destination location */}
        {isValidLatLng(endLocation) && destinationLoc && (
          <Marker position={endLocation} icon={userLocationIcon}>
            <Popup>Destination Location</Popup>
          </Marker>
        )}
      </MapContainer>
      {/* Move route instructions below the map */}
      {routeDetails && (
        <div className="w-full bg-white p-4 shadow-md text-center mt-4">
          <h3 className="font-bold text-lg">Route Details</h3>
          <p>{routeDetails}</p>
        </div>
      )}
      {routeInstructions.length > 0 && (
        <div className="w-full bg-white p-4 shadow-md text-left max-h-40 overflow-y-auto mt-4">
          <h3 className="font-bold text-lg">Route Instructions</h3>
          <ul className="list-disc pl-5">
            {routeInstructions.map((instruction, index) => (
              <li key={index}>
                {instruction.text} - {instruction.distance} meters
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default MapView;