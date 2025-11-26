import type { Position } from "geojson";

export type MapAdapter = {
  goToPosition(location: Position, zoom: number): void;
};
