import type { Position } from "geojson";
import type { Map as OLMap } from "ol";
import { fromLonLat } from "ol/proj";
import type { LngLatLike, Map as MlMap } from "maplibre-gl";
import type { Map as LMap } from "leaflet";
import { Cartesian3, type Viewer as CesiumViewer } from "cesium";

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

export function createCesiumAdapter(cesiumViewer: CesiumViewer): MapAdapter {
  return {
    goToPosition(location: Position, zoom: number) {
      // Convert zoom level to Cesium camera height (approximate conversion)
      // Higher zoom = lower altitude; zoom 0 ≈ 40,000km, zoom 20 ≈ ~38m
      // Base altitude at zoom 0 in meters
      const BASE_ALTITUDE_METERS = 40_000_000;
      const height = BASE_ALTITUDE_METERS / Math.pow(2, zoom);
      const lng = location[0] ?? 0;
      const lat = location[1] ?? 0;
      cesiumViewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(lng, lat, height),
        duration: 0.9,
      });
    },
  };
}
