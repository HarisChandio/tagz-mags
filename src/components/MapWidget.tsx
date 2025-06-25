'use client';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

const section1 = [
  [37.6, -106.3],
  [37.65, -106.25],
  [37.7, -106.3],
  [37.68, -106.35],
  [37.63, -106.37],
];



function ClickHandler() {
  useMapEvents({
    click(e) {
      console.log('Map clicked at', e.latlng);
    },
  });
  return null;
}

export default function MapWidget() {
  // center between coords
  const center: L.LatLngExpression = [37.62, -106.3];

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-slate-200">
      <MapContainer center={center} zoom={12} className="w-full h-full">
        <TileLayer
          attribution='&copy; OSM contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw custom fence polygons */}
        <Polygon
          pathOptions={{ color: 'red', fillColor: 'rgba(255,0,0,0.3)' }}
          positions={section1}
        />

        <ClickHandler />
      </MapContainer>
    </div>
  );
}
