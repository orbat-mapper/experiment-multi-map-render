import type { Position } from "geojson";
import type { MapAdapter } from "@/multimaplib/adapters";
export type MapWrapper = {
  goToPosition(location: Position, zoom: number): void;
};

export function createMapWrapper(adapter?: MapAdapter): MapWrapper {
  function goToPosition(location: Position, zoom: number) {
    console.log("Going to position:", location);
    adapter?.goToPosition(location, zoom);
  }

  return {
    goToPosition,
  };
}
