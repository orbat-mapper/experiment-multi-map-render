import type { Position } from "geojson";
import type { Map as LMap } from "leaflet";
import type { MapAdapter } from "../types";

export function createLeafletAdapter(leafletMap: LMap): MapAdapter {
  return {
    name: "leaflet",
    goToPosition(location: Position, zoom: number) {
      const lat = location[1] ?? 0;
      const lng = location[0] ?? 0;
      leafletMap.flyTo([lat, lng], zoom, {
        duration: 0.9,
      });
    },
  };
}
