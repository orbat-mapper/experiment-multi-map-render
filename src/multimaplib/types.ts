import type { Position, FeatureCollection } from "geojson";

export type MapAdapter = {
  name: string;
  goToPosition(location: Position, zoom: number): void;
  addGeoJSON?(geojson: FeatureCollection): void;
  cleanUp(): void;
};
