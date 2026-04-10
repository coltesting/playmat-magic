'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Search, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  onPlaceSelected: (lat: number, lng: number, name: string) => void;
  isLoaded: boolean;
}

export default function Header({ onPlaceSelected, isLoaded }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback((input: HTMLInputElement | null) => {
    if (!input || !isLoaded || autocompleteRef.current) return;
    inputRef.current = input;

    try {
      const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['geometry', 'name', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const name = place.name || place.formatted_address || 'Selected Place';
          onPlaceSelected(lat, lng, name);
          setSearchQuery(name);
        }
      });

      autocompleteRef.current = autocomplete;
    } catch (e) {
      console.warn('Autocomplete init failed:', e);
    }
  }, [isLoaded, onPlaceSelected]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !isLoaded) return;
    setIsSearching(true);

    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: searchQuery });

      if (result.results[0]?.geometry?.location) {
        const loc = result.results[0].geometry.location;
        const name = result.results[0].formatted_address || searchQuery;
        onPlaceSelected(loc.lat(), loc.lng(), name);
      }
    } catch (e) {
      console.error('Geocode failed:', e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="relative z-20 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1 left-4 text-2xl animate-float opacity-80">☁️</div>
        <div className="absolute top-0 left-[15%] text-lg animate-float-slow opacity-60">☁️</div>
        <div className="absolute top-2 right-[20%] text-xl animate-float-slower opacity-70">☁️</div>
        <div className="absolute top-1 right-8 text-lg animate-wiggle">⭐</div>
        <div className="absolute bottom-1 left-[40%] text-sm animate-sparkle">✨</div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-md transform -rotate-3 hover:rotate-3 transition-transform">
            <span className="text-2xl">🧸</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-xl font-bold text-white drop-shadow-md leading-tight">
              PlayMat Magic
            </h1>
            <p className="text-[10px] text-white/80 font-body -mt-0.5">
              Turn any place into a play mat!
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm group-focus-within:bg-white/30 transition-all" />
            <div className="relative flex items-center bg-white/95 rounded-2xl shadow-md border-2 border-white/50 overflow-hidden">
              <MapPin className="w-4 h-4 text-candy-pink ml-3 shrink-0" />
              <input
                ref={initAutocomplete}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for any place in the world..."
                className="flex-1 px-3 py-2.5 text-sm font-body text-playmat-text bg-transparent outline-none placeholder:text-playmat-muted"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-4 py-2.5 bg-gradient-to-r from-candy-pink to-candy-purple text-white font-body text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Find</span>
              </button>
            </div>
          </div>
        </div>

        {/* Magic Badge */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-2 text-white/90">
          <Sparkles className="w-4 h-4 animate-sparkle" />
          <span className="text-xs font-body font-semibold">AI-Powered</span>
        </div>
      </div>
    </header>
  );
}
