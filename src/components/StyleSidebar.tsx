'use client';

import React, { useState } from 'react';
import { MapStyle } from '@/lib/types';
import { MAP_STYLES, CUSTOM_STYLE } from '@/lib/styles';
import { Wand2, ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';

interface StyleSidebarProps {
  selectedStyle: MapStyle | null;
  onSelectStyle: (style: MapStyle) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  onEnhancePrompt: () => void;
  isEnhancing: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function StyleSidebar({
  selectedStyle,
  onSelectStyle,
  customPrompt,
  onCustomPromptChange,
  onEnhancePrompt,
  isEnhancing,
  collapsed,
  onToggleCollapse,
}: StyleSidebarProps) {
  const allStyles = [...MAP_STYLES, CUSTOM_STYLE];

  return (
    <>
      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 z-30 w-6 h-16 bg-white rounded-r-lg shadow-md flex items-center justify-center hover:bg-sky-50 transition-all ${
          collapsed ? 'left-0' : 'left-[280px]'
        }`}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-playmat-text" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-playmat-text" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 bottom-0 z-20 w-[280px] bg-white/95 backdrop-blur-sm shadow-xl transition-transform duration-300 flex flex-col ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <Wand2 className="w-5 h-5 text-candy-purple" />
            <h2 className="font-display text-lg font-bold text-playmat-text">
              Choose a Style
            </h2>
          </div>
          <p className="text-xs font-body text-playmat-muted">
            Pick a theme for your magical play mat
          </p>
        </div>

        {/* Style Cards */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 scrollbar-thin">
          {allStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`w-full text-left rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                selectedStyle?.id === style.id
                  ? 'ring-3 ring-sky-400 shadow-lg scale-[1.02]'
                  : 'ring-1 ring-gray-200 hover:ring-sky-200'
              }`}
            >
              {/* Preview gradient */}
              <div
                className="h-16 relative"
                style={{ background: style.previewBg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl drop-shadow-lg">{style.emoji}</span>
                </div>
                {selectedStyle?.id === style.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-sky-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="px-3 py-2 bg-white">
                <h3 className="font-display text-sm font-bold text-playmat-text">
                  {style.name}
                </h3>
                <p className="text-[11px] font-body text-playmat-muted leading-tight mt-0.5">
                  {style.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Prompt Section */}
        {selectedStyle?.id === 'custom-magic' && (
          <div className="border-t border-gray-100 px-4 py-3 bg-gradient-to-t from-purple-50/50">
            <label className="block text-xs font-display font-bold text-playmat-text mb-1.5">
              Describe Your Dream Style
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => onCustomPromptChange(e.target.value)}
              placeholder="e.g., A cozy autumn village with orange and golden colors, maple trees, little pumpkins everywhere..."
              className="w-full h-24 px-3 py-2 text-xs font-body text-playmat-text bg-white rounded-lg border border-gray-200 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200 resize-none placeholder:text-playmat-muted"
            />
            <button
              onClick={onEnhancePrompt}
              disabled={isEnhancing || !customPrompt.trim()}
              className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-candy-purple to-candy-pink text-white text-xs font-body font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isEnhancing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {isEnhancing ? 'Enhancing...' : 'AI Enhance Prompt'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
