export interface POI {
  id: string;
  label: string;
  lat: number;
  lng: number;
  icon?: string;
}

export interface CoolPath {
  id: string;
  label: string;
  fromPOI: string; // POI id
  toPOI: string;   // POI id
  travelMode: google.maps.TravelMode;
  path?: google.maps.LatLngLiteral[];
  color?: string;
}

export interface MapStyle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  prompt: string;
  colors: string[]; // gradient colors for preview card
  previewBg: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface TransformRequest {
  satelliteImage: string; // base64
  style: MapStyle;
  pois: POI[];
  paths: CoolPath[];
  bounds: MapBounds;
  zoom: number;
  customPrompt?: string;
}

export interface TransformResult {
  imageUrl: string; // base64 data URL
  bounds: MapBounds;
}

export interface AppState {
  selectedStyle: MapStyle | null;
  pois: POI[];
  paths: CoolPath[];
  isAddingPOI: boolean;
  isAddingPath: boolean;
  pathFromPOI: string | null;
  transformResult: TransformResult | null;
  isTransforming: boolean;
  showOverlay: boolean;
  overlayOpacity: number;
  customPrompt: string;
}
