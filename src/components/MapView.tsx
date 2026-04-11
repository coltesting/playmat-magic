'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { POI, CoolPath, TransformResult } from '@/lib/types';

const defaultCenter = { lat: 40.7128, lng: -74.006 };

const POI_COLORS = [
  '#f472b6', '#a78bfa', '#38bdf8', '#34d399',
  '#fb923c', '#f87171', '#facc15', '#a3e635',
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const overlayRef = useRef<google.maps.GroundOverlay | null>(null);
  const mapInitializedRef = useRef(false);

  // Initialize the map
  useEffect(() => {
    if (!containerRef.current || mapInitializedRef.current) return;
    if (!window.google || !window.google.maps) return;

    const map = new google.maps.Map(containerRef.current, {
      center: center || defaultCenter,
      zoom: zoom || 17,
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
    });

    mapRef.current = map;
    mapInitializedRef.current = true;
    onMapReady(map);

    map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    });

    map.addListener('bounds_changed', () => {
      onBoundsChanged();
    });

    return () => {
      google.maps.event.clearInstanceListeners(map);
    };
  }, []);

  // Update cursor based on mode
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setOptions({
      draggableCursor: isAddingPOI ? 'crosshair' : isAddingPath ? 'pointer' : 'grab',
    });
  }, [isAddingPOI, isAddingPath, mapRef]);

  // Update click handler reference
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old click listener and add new one
    google.maps.event.clearListeners(mapRef.current, 'click');
    mapRef.current.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    });
  }, [onMapClick]);

  // Update POI markers
  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (!mapRef.current) return;

    pois.forEach((poi, index) => {
      const marker = new google.maps.Marker({
        position: { lat: poi.lat, lng: poi.lng },
        map: mapRef.current!,
        label: {
          text: poi.label,
          color: '#ffffff',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 'bold',
          fontSize: '11px',
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: POI_COLORS[index % POI_COLORS.length],
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        animation:
          isAddingPath && pathFromPOI === poi.id
            ? google.maps.Animation.BOUNCE
            : undefined,
      });

      marker.addListener('click', () => {
        onPOIClick(poi.id);
      });

      markersRef.current.push(marker);
    });
  }, [pois, isAddingPath, pathFromPOI, onPOIClick, mapRef]);

  // Update path polylines
  useEffect(() => {
    // Clear existing polylines
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    if (!mapRef.current) return;

    paths.forEach((path) => {
      if (path.path && path.path.length > 0) {
        const polyline = new google.maps.Polyline({
          path: path.path,
          map: mapRef.current!,
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
        });
        polylinesRef.current.push(polyline);
      }
    });
  }, [paths, mapRef]);

  // Update ground overlay
  useEffect(() => {
    // Remove existing overlay
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }

    if (!mapRef.current || !transformResult || !showOverlay) return;

    const bounds = new google.maps.LatLngBounds(
      { lat: transformResult.bounds.south, lng: transformResult.bounds.west },
      { lat: transformResult.bounds.north, lng: transformResult.bounds.east }
    );

    const overlay = new google.maps.GroundOverlay(
      transformResult.imageUrl,
      bounds,
      { opacity: overlayOpacity }
    );

    overlay.setMap(mapRef.current);
    overlayRef.current = overlay;
  }, [transformResult, showOverlay, overlayOpacity, mapRef]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
