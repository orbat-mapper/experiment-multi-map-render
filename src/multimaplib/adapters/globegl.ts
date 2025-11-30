import type { Position } from "geojson";
import type { GlobeInstance } from "globe.gl";
import type { MapAdapter } from "../types";

export function createGlobeGLAdapter(globe: GlobeInstance): MapAdapter {
  return {
    name: "globe.gl",
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
    cleanUp() {
      // https://github.com/vasturiano/globe.gl/issues/15
      globe._destructor();
    },
  };
}
