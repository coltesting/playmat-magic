'use client';

import React, { useState } from 'react';
import { POI, CoolPath, MapStyle, TransformResult } from '@/lib/types';
import {
  MapPin, Route, Wand2, Eye, EyeOff, Download, Globe,
  Plus, X, Trash2, Navigation, ArrowRight, Loader2
} from 'lucide-react';
import { generateKML, downloadKML, downloadImage } from '@/lib/kml';

interface ControlPanelProps {
  pois: POI[];
  paths: CoolPath[];
  selectedStyle: MapStyle | null;
  isAddingPOI: boolean;
  isAddingPath: boolean;
  pathFromPOI: string | null;
  onToggleAddPOI: () => void;
  onToggleAddPath: () => void;
  onRemovePOI: (id: string) => void;
  onRemovePath: (id: string) => void;
  onSelectPathFrom: (poiId: string) => void;
  onTransform: () => void;
  isTransforming: boolean;
  transformResult: TransformResult | null;
  showOverlay: boolean;
  overlayOpacity: number;
  onToggleOverlay: () => void;
  onOpacityChange: (opacity: number) => void;
}

export default function ControlPanel({
  pois,
  paths,
  selectedStyle,
  isAddingPOI,
  isAddingPath,
  pathFromPOI,
  onToggleAddPOI,
  onToggleAddPath,
  onRemovePOI,
  onRemovePath,
  onSelectPathFrom,
  onTransform,
  isTransforming,
  transformResult,
  showOverlay,
  overlayOpacity,
  onToggleOverlay,
  onOpacityChange,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'spots' | 'paths' | 'export'>('spots');
  const [newPathLabel, setNewPathLabel] = useState('');
  const [newPathMode, setNewPathMode] = useState<'WALKING' | 'DRIVING' | 'BICYCLING' | 'TRANSIT'>('WALKING');

  const tabs = [
    { id: 'spots' as const, label: 'Spots', icon: MapPin, count: pois.length },
    { id: 'paths' as const, label: 'Paths', icon: Route, count: paths.length },
    { id: 'export' as const, label: 'Export', icon: Download, count: 0 },
  ];

  const handleExportPNG = () => {
    if (transformResult?.imageUrl) {
      downloadImage(transformResult.imageUrl, 'playmat-magic.png');
    }
  };

  const handleExportKML = () => {
    if (transformResult) {
      const kml = generateKML(transformResult.imageUrl, transformResult.bounds, 'PlayMat Magic');
      downloadKML(kml, 'playmat-magic.kml');
      // Also download the image alongside
      downloadImage(transformResult.imageUrl, 'playmat.png');
    }
  };

  return (
    <div className="absolute right-4 top-4 z-20 w-72 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden animate-slide-in-right">
      {/* Transform Button */}
      <div className="px-4 pt-4 pb-3">
        <button
          onClick={onTransform}
          disabled={!selectedStyle || isTransforming}
          className={`w-full py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            !selectedStyle
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isTransforming
              ? 'bg-gradient-to-r from-candy-purple to-candy-pink text-white animate-pulse'
              : 'bg-gradient-to-r from-candy-purple to-candy-pink text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isTransforming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Weaving Magic...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              {selectedStyle ? 'Transform to Play Mat!' : 'Select a Style First'}
            </>
          )}
        </button>

        {/* Overlay Controls (show after transform) */}
        {transformResult && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={onToggleOverlay}
                className="flex items-center gap-1.5 text-xs font-body font-semibold text-playmat-text hover:text-sky-500 transition-colors"
              >
                {showOverlay ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
                {showOverlay ? 'Overlay On' : 'Overlay Off'}
              </button>
              <span className="text-[10px] font-body text-playmat-muted">
                {Math.round(overlayOpacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={overlayOpacity}
              onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-t border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-body font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-sky-500 border-b-2 border-sky-400 bg-sky-50/50'
                : 'text-playmat-muted hover:text-playmat-text'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            {tab.count > 0 && (
              <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 text-[10px] flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-h-64 overflow-y-auto">
        {/* Spots Tab */}
        {activeTab === 'spots' && (
          <div className="p-3 space-y-2">
            <button
              onClick={onToggleAddPOI}
              className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body font-semibold transition-all ${
                isAddingPOI
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-100'
              }`}
            >
              {isAddingPOI ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  Cancel Adding
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add Special Spot
                </>
              )}
            </button>

            {isAddingPOI && (
              <p className="text-[10px] text-center text-candy-pink font-body font-semibold animate-pulse">
                Click anywhere on the map to place a spot!
              </p>
            )}

            {pois.length === 0 ? (
              <p className="text-xs text-playmat-muted text-center py-4 font-body">
                No spots yet. Add one to mark special places!
              </p>
            ) : (
              pois.map((poi) => (
                <div
                  key={poi.id}
                  className="flex items-center gap-2 px-2.5 py-2 bg-gray-50 rounded-lg group"
                >
                  <MapPin className="w-3.5 h-3.5 text-candy-pink shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body font-semibold text-playmat-text truncate">
                      {poi.label}
                    </p>
                    <p className="text-[10px] font-body text-playmat-muted">
                      {poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemovePOI(poi.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Paths Tab */}
        {activeTab === 'paths' && (
          <div className="p-3 space-y-2">
            {pois.length < 2 ? (
              <p className="text-xs text-playmat-muted text-center py-4 font-body">
                Add at least 2 spots first to create a Cool Path between them.
              </p>
            ) : (
              <>
                <button
                  onClick={onToggleAddPath}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body font-semibold transition-all ${
                    isAddingPath
                      ? 'bg-red-50 text-red-500 border border-red-200'
                      : 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
                  }`}
                >
                  {isAddingPath ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Route className="w-3.5 h-3.5" />
                      Draw Cool Path
                    </>
                  )}
                </button>

                {isAddingPath && (
                  <div className="space-y-2 p-2 bg-green-50/50 rounded-lg">
                    <input
                      type="text"
                      value={newPathLabel}
                      onChange={(e) => setNewPathLabel(e.target.value)}
                      placeholder='e.g., "Walk to School"'
                      className="w-full px-2.5 py-1.5 text-xs font-body bg-white rounded-lg border border-gray-200 outline-none focus:border-sky-400"
                    />
                    <div className="flex gap-1">
                      {(['WALKING', 'DRIVING', 'BICYCLING', 'TRANSIT'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setNewPathMode(mode)}
                          className={`flex-1 py-1 text-[10px] font-body font-semibold rounded-md transition-colors ${
                            newPathMode === mode
                              ? 'bg-sky-400 text-white'
                              : 'bg-white text-playmat-muted hover:bg-sky-50'
                          }`}
                        >
                          {mode === 'WALKING' ? '🚶' : mode === 'DRIVING' ? '🚗' : mode === 'BICYCLING' ? '🚲' : '🚌'}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-playmat-muted text-center font-body">
                      {!pathFromPOI ? 'Click a spot on the map as the start' : 'Now click a spot as the destination'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {pois.map((poi) => (
                        <button
                          key={poi.id}
                          onClick={() => onSelectPathFrom(poi.id)}
                          className={`px-2 py-1 text-[10px] font-body rounded-md border transition-colors ${
                            pathFromPOI === poi.id
                              ? 'bg-sky-400 text-white border-sky-400'
                              : 'bg-white text-playmat-text border-gray-200 hover:border-sky-300'
                          }`}
                        >
                          {poi.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {paths.map((path) => (
              <div
                key={path.id}
                className="flex items-center gap-2 px-2.5 py-2 bg-gray-50 rounded-lg group"
              >
                <Route className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body font-semibold text-playmat-text truncate">
                    {path.label}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-playmat-muted">
                    <span>{pois.find(p => p.id === path.fromPOI)?.label}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                    <span>{pois.find(p => p.id === path.toPOI)?.label}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemovePath(path.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="p-3 space-y-2">
            {!transformResult ? (
              <p className="text-xs text-playmat-muted text-center py-4 font-body">
                Transform your map first, then export it here!
              </p>
            ) : (
              <>
                <button
                  onClick={handleExportPNG}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg text-xs font-body font-semibold hover:shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <div className="text-left">
                    <p>Download High-Res PNG</p>
                    <p className="text-[10px] opacity-80 font-normal">Optimized for 6&apos;x8&apos; rug printing</p>
                  </div>
                </button>
                <button
                  onClick={handleExportKML}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg text-xs font-body font-semibold hover:shadow-md transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <div className="text-left">
                    <p>Export Google Earth KML</p>
                    <p className="text-[10px] opacity-80 font-normal">Overlay on real-world coordinates</p>
                  </div>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
