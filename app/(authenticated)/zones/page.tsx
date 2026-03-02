'use client';

import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';

const ZonesMap = dynamic(() => import("@/components/maps/ZoneDisplayMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
  // TODO: Replace loading with skeleton component
});

export default function Zones() {

  return (
    <>
      <ZonesMap />
    </>
  );
}
