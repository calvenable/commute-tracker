import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  useMap,
  TileLayer
} from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (Leaflet quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

function UpdateMapOnMovement() {
  const map = useMap();
  // const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);

  const circleRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];

        if (!circleRef.current) {
          circleRef.current = L.circle(newPos, {
            radius: 6,
            color: "blue",
            fillColor: "blue",
            fillOpacity: 1
          }).addTo(map);
          // TODO: Add a radius 12 circle around the dot.
        }

        if (!polylineRef.current) {
          polylineRef.current = L.polyline([newPos], {
            color: "blue",
            weight: 5
          }).addTo(map);
        }

        // setPosition(newPos);
        setRoute((prev) => {
          const updated = [...prev, newPos];
          if (polylineRef.current) {
            polylineRef.current.setLatLngs(updated);
          }
          return updated;
        });
        map.setView([latitude, longitude], 16);

      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [map, route]);

  return null;

  // if (!position) return <p>Getting your GPS location...</p>;
}

export default function RunTrackerMap() {

  return (
    <MapContainer
      zoom="16"
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <UpdateMapOnMovement />
		
    </MapContainer>
  );
}