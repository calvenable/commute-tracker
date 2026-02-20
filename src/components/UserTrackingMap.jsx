import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function UserTrackingMap() {
  const [position, setPosition] = useState([51.505, -0.09]);

  // Simulate position updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => [prev[0] + 0.001, prev[1] + 0.001]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} />
    </MapContainer>
  );
}
