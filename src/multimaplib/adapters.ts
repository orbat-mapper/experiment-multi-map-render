import type { Position } from "geojson";
import type { Map as OLMap } from "ol";
import { fromLonLat } from "ol/proj";
import type { LngLatLike, Map as MlMap } from "maplibre-gl";

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
