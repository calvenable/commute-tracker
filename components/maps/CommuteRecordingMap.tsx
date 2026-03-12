'use client';

import { Circle, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

export default function CommuteRecordingMap() {
    // TODO: Get list of user's zone polygons & home/work locations
    // Render all shapes on the map
    // Render user location dot
    // Center map on user location

    let [position, setPosition] = useState<number[]|null>(null);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
        setError("Your browser does not support geolocation.");
        return;
        }

        const watchId = navigator.geolocation.watchPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            const newPos = [latitude, longitude];
            setPosition(newPos);
        },
        (err) => {
            setError(err.message);
        },
        { enableHighAccuracy: true }
        );

        return () => {
        navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    if (error) {
        return (
        <p>An error occurred: {error}</p>
        )
    }

    if (!position) {
        return (
        <p>Getting your GPS location...</p>
        );
    }


    return (
    <MapContainer
        center={position as L.LatLngExpression}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "400px" }}
        className="rounded-lg"
      >
        {/* <Circle
            center={position as L.LatLngExpression}
            radius={6}
            pathOptions={{
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 1
            }}
        />
        <Circle
            center={position as L.LatLngExpression}
            radius={12}
            pathOptions={{
                color: 'blue'
            }}
        /> */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    )
}