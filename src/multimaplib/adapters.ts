import type { Position } from "geojson";
import type { Map as OLMap } from "ol";
import { fromLonLat } from "ol/proj";
import type { LngLatLike, Map as MlMap } from "maplibre-gl";
import type { Map as LMap } from "leaflet";
import type { GlobeInstance } from "globe.gl";

export type MapAdapter = {
  goToPosition(location: Position, zoom: number): void;
};

export function createOpenLayersAdapter(olMap: OLMap): MapAdapter {
  return {
    goToPosition(location: Position, zoom: number) {
      const view = olMap.getView();
      view.animate({
        zoom,
        center: fromLonLat(location, view.getProjection()),
        duration: 900,
      });
    },
  };
}

export function createMaplibreAdapter(mlMap: MlMap): MapAdapter {
  return {
    goToPosition(location: Position, zoom: number) {
      mlMap.flyTo({
        center: location as LngLatLike,
        zoom: zoom,
      });
    },
  };
}

export function createLeafletAdapter(leafletMap: LMap): MapAdapter {
  return {
    goToPosition(location: Position, zoom: number) {
      const lat = location[1] ?? 0;
      const lng = location[0] ?? 0;
      leafletMap.flyTo([lat, lng], zoom, {
        duration: 0.9,
      });
    },
  };
}

export function createGlobeGLAdapter(globe: GlobeInstance): MapAdapter {
  return {
    goToPosition(location: Position, zoom: number) {
      // Convert zoom level to globe.gl altitude (in globe radii units).
      // globe.gl uses altitude where 0 = surface, 1 = one globe radius above surface.
      // Higher zoom = lower altitude. We divide zoom by 3 to get a reasonable
      // visual mapping: zoom 0 → altitude ~4 (far away), zoom 18 → altitude ~0.06 (close up)
      const BASE_ALTITUDE = 4;
      const altitude = BASE_ALTITUDE / Math.pow(2, zoom / 3);
      const lng = location[0] ?? 0;
      const lat = location[1] ?? 0;
      globe.pointOfView({ lat, lng, altitude }, 900);
    },
  };
}
