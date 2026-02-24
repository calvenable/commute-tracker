import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  useMap,
  TileLayer,
  FeatureGroup
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
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

function UpdateMapOnMovement(position) {
  const map = useMap();
  const [route, setRoute] = useState([]);

  const userInteractedRef = useRef(false);
  const automaticMoveRef = useRef(false);

  const circleRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    const handleUserMove = () => {
      if (!automaticMoveRef.current) {
        userInteractedRef.current = true;
      }
    }
    map.on("movestart", handleUserMove);
    map.on("zoomstart", handleUserMove);

    if (position !== route.at(-1)) {
      setRoute((prev) => [...prev, position]);
    }

    if (!circleRef.current) {
      circleRef.current = L.circle(position, {
        radius: 6,
        color: "blue",
        fillColor: "blue",
        fillOpacity: 1
      }).addTo(map);
      // TODO: Add a radius 12 circle around the dot.
    }
    else {
      circleRef.current.setLatLng(position);
    }

    if (!polylineRef.current) {
      polylineRef.current = L.polyline([position], {
        color: "blue",
        weight: 5
      }).addTo(map);
    }
    else {
      polylineRef.current.setLatLngs(route);
    }

    if (!userInteractedRef.current) {
      automaticMoveRef.current = true;
      map.setView(position ?? [0,0], 16, {animate: true});
      map.once("moveend", () => {
        automaticMoveRef.current = false;
      });
    }

    return () => {
      map.off("movestart", handleUserMove);
      map.off("zoomstart", handleUserMove);
    };
  }, [position, route, map]);

  return null;
}

export default function RunTrackerMap({tools}) {
  let [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

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

  const handleCreate = (e) => {
  const layer = e.layer;
  console.log("Created Shape Coordinates:", layer.toGeoJSON());
  };
  
  const handleEdit = (e) => {
  console.log("Edited Layers:", e.layers);
  };
  
  const handleDelete = (e) => {
  console.log("Deleted Layers:", e.layers);
  };

  return (
    <MapContainer
      center={position}
      zoom="16"
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <FeatureGroup>
        <EditControl
        position="topright"
        onCreated={handleCreate}
        onEdited={handleEdit}
        onDeleted={handleDelete}
        draw={tools}
        />
      </FeatureGroup>

      {/* <UpdateMapOnMovement position={position} /> */}
    
    </MapContainer>
  );
}