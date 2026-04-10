'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  Polyline,
  GroundOverlay,
} from '@react-google-maps/api';
import { POI, CoolPath, TransformResult } from '@/lib/types';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 40.7128, lng: -74.006 };

const satelliteMapOptions: google.maps.MapOptions = {
  mapTypeId: 'satellite',
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    { elementType: 'labels', stylers: [{ visibility: 'off' }] },
  ],
  minZoom: 14,
  maxZoom: 20,
};

interface MapViewProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  pois: POI[];
  paths: CoolPath[];
  isAddingPOI: boolean;
  isAddingPath: boolean;
  pathFromPOI: string | null;
  onMapClick: (lat: number, lng: number) => void;
  onPOIClick: (poiId: string) => void;
  onMapReady: (map: google.maps.Map) => void;
  onBoundsChanged: () => void;
  transformResult: TransformResult | null;
  showOverlay: boolean;
  overlayOpacity: number;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}

const POI_COLORS = [
  '#f472b6', '#a78bfa', '#38bdf8', '#34d399',
  '#fb923c', '#f87171', '#facc15', '#a3e635',
];

export default function MapView({
  center,
  zoom,
  pois,
  paths,
  isAddingPOI,
  isAddingPath,
  pathFromPOI,
  onMapClick,
  onPOIClick,
  onMapReady,
  onBoundsChanged,
  transformResult,
  showOverlay,
  overlayOpacity,
  mapRef,
}: MapViewProps) {
  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    },
    [onMapClick]
  );

  const handleLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      onMapReady(map);
    },
    [mapRef, onMapReady]
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={{
        ...satelliteMapOptions,
        draggableCursor: isAddingPOI ? 'crosshair' : isAddingPath ? 'pointer' : 'grab',
      }}
      onClick={handleMapClick}
      onLoad={handleLoad}
      onBoundsChanged={onBoundsChanged}
    >
      {/* POI Markers */}
      {pois.map((poi, index) => (
        <Marker
          key={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          label={{
            text: poi.label,
            color: '#ffffff',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 'bold',
            fontSize: '11px',
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: POI_COLORS[index % POI_COLORS.length],
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          }}
          onClick={() => onPOIClick(poi.id)}
          animation={
            isAddingPath && pathFromPOI === poi.id
              ? google.maps.Animation.BOUNCE
              : undefined
          }
        />
      ))}

      {/* Path Polylines */}
      {paths.map((path, index) => (
        path.path && path.path.length > 0 ? (
          <Polyline
            key={path.id}
            path={path.path}
            options={{
              strokeColor: path.color || '#facc15',
              strokeOpacity: 0.9,
              strokeWeight: 6,
              icons: [
                {
                  icon: {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    strokeColor: '#ffffff',
                    scale: 3,
                  },
                  offset: '0',
                  repeat: '20px',
                },
              ],
            }}
          />
        ) : null
      ))}

      {/* Playmat Overlay */}
      {transformResult && showOverlay && (
        <GroundOverlay
          url={transformResult.imageUrl}
          bounds={{
            north: transformResult.bounds.north,
            south: transformResult.bounds.south,
            east: transformResult.bounds.east,
            west: transformResult.bounds.west,
          }}
          options={{ opacity: overlayOpacity }}
        />
      )}
    </GoogleMap>
  );
}
