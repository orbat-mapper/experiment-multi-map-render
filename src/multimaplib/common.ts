import type { FeatureCollection, Position } from "geojson";
import type { MapAdapter } from "@/multimaplib/adapters";
export type MapWrapper = {
  goToPosition(location: Position, zoom: number): void;
  addGeoJSON?(geojson: FeatureCollection): void;
};

export function createMapWrapper(adapter?: MapAdapter): MapWrapper {
  function goToPosition(location: Position, zoom: number) {
    adapter?.goToPosition(location, zoom);
  }

  function addGeoJSON(geojson: FeatureCollection) {
    if (adapter?.addGeoJSON) {
      adapter.addGeoJSON(geojson);
    } else {
      console.warn(
        `addGeoJSON is not implemented for ${adapter?.name} adapter`,
      );
    }
  }

  return {
    goToPosition,
    addGeoJSON,
  };
}
