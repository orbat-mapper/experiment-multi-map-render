import type { Position } from "geojson";
import type { LngLatLike, Map as MlMap } from "maplibre-gl";
import type { MapAdapter } from "../types";

export function createMaplibreAdapter(mlMap: MlMap): MapAdapter {
  return {
    name: "maplibre",
    goToPosition(location: Position, zoom: number) {
      mlMap.flyTo({
        center: location as LngLatLike,
        zoom: zoom,
      });
    },
  };
}
