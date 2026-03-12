'use client';

import dynamic from "next/dynamic";

const RecordingMap = dynamic(() => import("@/components/maps/CommuteRecordingMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
  // TODO: Replace loading with skeleton component
});

export default function Record() {
  return (
    <>
      <RecordingMap />
    </>
  );
}
