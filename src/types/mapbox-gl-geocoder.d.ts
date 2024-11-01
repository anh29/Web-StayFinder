
import * as mapboxgl from 'mapbox-gl';

declare module '@mapbox/mapbox-gl-geocoder' {
    interface GeocoderOptions {
        accessToken?: string;
        marker?: boolean;
        zoom?: number;
        placeholder?: string;
        
        mapboxgl?: typeof mapboxgl; 
    }

    export class Geocoder extends mapboxgl.Control {
        constructor(options?: GeocoderOptions);
        
    }
}
