'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Header from '@/components/Header';
import MapView from '@/components/MapView';
import StyleSidebar from '@/components/StyleSidebar';
import ControlPanel from '@/components/ControlPanel';
import LoadingOverlay from '@/components/LoadingOverlay';
import { POI, CoolPath, MapStyle, TransformResult, MapBounds } from '@/lib/types';

const LIBRARIES: ('places')[] = ['places'];

const PATH_COLORS = ['#facc15', '#fb923c', '#34d399', '#f472b6', '#a78bfa', '#38bdf8'];

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES,
  });

  // Map state
  const mapRef = useRef<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [zoom, setZoom] = useState(17);

  // Style state
  const [selectedStyle, setSelectedStyle] = useState<MapStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // POI state
  const [pois, setPois] = useState<POI[]>([]);
  const [isAddingPOI, setIsAddingPOI] = useState(false);
  const [poiLabelInput, setPoiLabelInput] = useState('');
  const [pendingPOICoords, setPendingPOICoords] = useState<{ lat: number; lng: number } | null>(null);

  // Path state
  const [paths, setPaths] = useState<CoolPath[]>([]);
  const [isAddingPath, setIsAddingPath] = useState(false);
  const [pathFromPOI, setPathFromPOI] = useState<string | null>(null);
  const [newPathLabel, setNewPathLabel] = useState('');

  // Transform state
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformResult, setTransformResult] = useState<TransformResult | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.85);

  // Error state
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelected = useCallback((lat: number, lng: number, name: string) => {
    setCenter({ lat, lng });
    setZoom(17);
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(17);
    }
  }, []);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleBoundsChanged = useCallback(() => {
    // Update zoom when user manually zooms
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom !== undefined) {
        setZoom(currentZoom);
      }
    }
  }, []);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (isAddingPOI) {
        setPendingPOICoords({ lat, lng });
        setPoiLabelInput('');
      }
    },
    [isAddingPOI]
  );

  const handlePOIClick = useCallback(
    (poiId: string) => {
      if (isAddingPath) {
        if (!pathFromPOI) {
          setPathFromPOI(poiId);
        } else if (pathFromPOI !== poiId) {
          // Create path between two POIs
          createPath(pathFromPOI, poiId);
        }
      }
    },
    [isAddingPath, pathFromPOI]
  );

  const handleConfirmPOI = useCallback(() => {
    if (!pendingPOICoords || !poiLabelInput.trim()) return;

    const newPOI: POI = {
      id: `poi-${Date.now()}`,
      label: poiLabelInput.trim(),
      lat: pendingPOICoords.lat,
      lng: pendingPOICoords.lng,
    };

    setPois((prev) => [...prev, newPOI]);
    setPendingPOICoords(null);
    setPoiLabelInput('');
    // Keep adding mode on so user can add multiple
  }, [pendingPOICoords, poiLabelInput]);

  const createPath = useCallback(
    async (fromId: string, toId: string) => {
      const fromPOI = pois.find((p) => p.id === fromId);
      const toPOI = pois.find((p) => p.id === toId);
      if (!fromPOI || !toPOI) return;

      try {
        const response = await fetch('/api/directions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origin: { lat: fromPOI.lat, lng: fromPOI.lng },
            destination: { lat: toPOI.lat, lng: toPOI.lng },
            travelMode: 'WALKING',
          }),
        });

        const data = await response.json();

        if (data.path) {
          const newPath: CoolPath = {
            id: `path-${Date.now()}`,
            label: newPathLabel || `${fromPOI.label} to ${toPOI.label}`,
            fromPOI: fromId,
            toPOI: toId,
            travelMode: google.maps.TravelMode.WALKING,
            path: data.path,
            color: PATH_COLORS[paths.length % PATH_COLORS.length],
          };

          setPaths((prev) => [...prev, newPath]);
        }
      } catch (e) {
        console.error('Failed to get directions:', e);
        setError('Failed to calculate path. Please try again.');
        setTimeout(() => setError(null), 3000);
      }

      setPathFromPOI(null);
      setIsAddingPath(false);
      setNewPathLabel('');
    },
    [pois, paths.length, newPathLabel]
  );

  const handleSelectPathFrom = useCallback(
    (poiId: string) => {
      if (!pathFromPOI) {
        setPathFromPOI(poiId);
      } else if (pathFromPOI !== poiId) {
        createPath(pathFromPOI, poiId);
      }
    },
    [pathFromPOI, createPath]
  );

  const getCurrentBounds = useCallback((): MapBounds | null => {
    if (!mapRef.current) return null;
    const bounds = mapRef.current.getBounds();
    if (!bounds) return null;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    return {
      north: ne.lat(),
      south: sw.lat(),
      east: ne.lng(),
      west: sw.lng(),
    };
  }, []);

  const handleTransform = useCallback(async () => {
    if (!selectedStyle || !mapRef.current) return;

    setIsTransforming(true);
    setError(null);

    try {
      // Step 1: Capture the satellite image via our API
      const currentCenter = mapRef.current.getCenter();
      const currentZoom = mapRef.current.getZoom();

      if (!currentCenter || currentZoom === undefined) {
        throw new Error('Map not ready');
      }

      const captureResponse = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          center: { lat: currentCenter.lat(), lng: currentCenter.lng() },
          zoom: currentZoom,
          width: 640,
          height: 640,
        }),
      });

      const captureData = await captureResponse.json();

      if (!captureResponse.ok) {
        throw new Error(captureData.error || 'Failed to capture map');
      }

      // Step 2: Send to AI for transformation
      const transformResponse = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          satelliteImageBase64: captureData.imageBase64,
          style: selectedStyle,
          pois,
          paths,
          zoom: currentZoom,
          customPrompt: selectedStyle.id === 'custom-magic' ? customPrompt : undefined,
        }),
      });

      const transformData = await transformResponse.json();

      if (!transformResponse.ok) {
        throw new Error(transformData.error || 'Transformation failed');
      }

      // Step 3: Display the result
      const bounds = getCurrentBounds();
      if (!bounds) throw new Error('Could not determine map bounds');

      const imageUrl = `data:image/png;base64,${transformData.imageBase64}`;

      setTransformResult({ imageUrl, bounds });
      setShowOverlay(true);
      setOverlayOpacity(0.85);
    } catch (e) {
      console.error('Transform error:', e);
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsTransforming(false);
    }
  }, [selectedStyle, pois, paths, customPrompt, getCurrentBounds]);

  const handleEnhancePrompt = useCallback(async () => {
    if (!customPrompt.trim()) return;
    setIsEnhancing(true);

    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: customPrompt }),
      });

      const data = await response.json();
      if (data.enhanced) {
        setCustomPrompt(data.enhanced);
      }
    } catch (e) {
      console.error('Enhance failed:', e);
    } finally {
      setIsEnhancing(false);
    }
  }, [customPrompt]);

  if (loadError) {
    return (
      <div className="h-screen flex items-center justify-center bg-sky-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-4xl mb-4">😢</p>
          <h2 className="font-display text-xl font-bold text-playmat-text mb-2">
            Oops! Map failed to load
          </h2>
          <p className="font-body text-sm text-playmat-muted">
            Please check your Google Maps API key and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-sky-100">
        <div className="text-center">
          <div className="text-5xl animate-bounce-slow mb-4">🗺️</div>
          <p className="font-display text-lg text-playmat-text animate-pulse">
            Loading PlayMat Magic...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onPlaceSelected={handlePlaceSelected} isLoaded={isLoaded} />

      <div className="flex-1 relative">
        {/* Map */}
        <div
          className={`absolute inset-0 ${
            isAddingPOI ? 'map-adding-mode' : ''
          }`}
        >
          <MapView
            center={center}
            zoom={zoom}
            pois={pois}
            paths={paths}
            isAddingPOI={isAddingPOI}
            isAddingPath={isAddingPath}
            pathFromPOI={pathFromPOI}
            onMapClick={handleMapClick}
            onPOIClick={handlePOIClick}
            onMapReady={handleMapReady}
            onBoundsChanged={handleBoundsChanged}
            transformResult={transformResult}
            showOverlay={showOverlay}
            overlayOpacity={overlayOpacity}
            mapRef={mapRef}
          />
        </div>

        {/* Style Sidebar */}
        <StyleSidebar
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
          customPrompt={customPrompt}
          onCustomPromptChange={setCustomPrompt}
          onEnhancePrompt={handleEnhancePrompt}
          isEnhancing={isEnhancing}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Control Panel */}
        <ControlPanel
          pois={pois}
          paths={paths}
          selectedStyle={selectedStyle}
          isAddingPOI={isAddingPOI}
          isAddingPath={isAddingPath}
          pathFromPOI={pathFromPOI}
          onToggleAddPOI={() => {
            setIsAddingPOI(!isAddingPOI);
            setIsAddingPath(false);
            setPendingPOICoords(null);
          }}
          onToggleAddPath={() => {
            setIsAddingPath(!isAddingPath);
            setIsAddingPOI(false);
            setPathFromPOI(null);
          }}
          onRemovePOI={(id) => {
            setPois((prev) => prev.filter((p) => p.id !== id));
            setPaths((prev) => prev.filter((p) => p.fromPOI !== id && p.toPOI !== id));
          }}
          onRemovePath={(id) => setPaths((prev) => prev.filter((p) => p.id !== id))}
          onSelectPathFrom={handleSelectPathFrom}
          onTransform={handleTransform}
          isTransforming={isTransforming}
          transformResult={transformResult}
          showOverlay={showOverlay}
          overlayOpacity={overlayOpacity}
          onToggleOverlay={() => setShowOverlay(!showOverlay)}
          onOpacityChange={setOverlayOpacity}
        />

        {/* POI Label Input Popup */}
        {pendingPOICoords && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 poi-label-input">
            <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border-2 border-candy-pink/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📍</span>
                <h3 className="font-display text-sm font-bold text-playmat-text">
                  Name This Spot!
                </h3>
              </div>
              <input
                type="text"
                value={poiLabelInput}
                onChange={(e) => setPoiLabelInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmPOI()}
                placeholder='e.g., "Our House", "School"'
                className="w-full px-3 py-2 text-sm font-body rounded-lg border border-gray-200 outline-none focus:border-candy-pink focus:ring-1 focus:ring-candy-pink/30"
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setPendingPOICoords(null)}
                  className="flex-1 py-2 text-xs font-body font-semibold text-playmat-muted bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPOI}
                  disabled={!poiLabelInput.trim()}
                  className="flex-1 py-2 text-xs font-body font-semibold text-white bg-gradient-to-r from-candy-pink to-candy-purple rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Add Spot!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 animate-fade-in">
            <div className="bg-red-500 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 font-body text-sm">
              <span>😕</span>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isTransforming} />
    </div>
  );
}
