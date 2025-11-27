import type { Position } from "geojson";
import type { Map as OLMap } from "ol";
import { fromLonLat } from "ol/proj";
import type { MapAdapter } from "../types";

export function createOpenLayersAdapter(olMap: OLMap): MapAdapter {
  // version counter to invalidate previous animation callbacks when a new animation starts
  let animationVersion = 0;

  return {
    goToPosition(location: Position, zoom: number) {
      // bump version to mark any previous animations as obsolete
      ++animationVersion;
      const thisVersion = animationVersion;

      // based on https://openlayers.org/en/latest/examples/animation.html
      const view = olMap.getView();

      // cancel any currently running animations on the view
      view.cancelAnimations();

      const projection = view.getProjection();
      const center = fromLonLat(location, projection);

      // current view zoom (fallback to target zoom)
      const currentZoom = view.getZoom() ?? zoom;

      // duration and parts for the combined animations
      const duration = 2000;
      let parts = 2;
      let called = false;

      function callback(complete?: boolean) {
        // ignore callbacks from previous (interrupted) animations
        if (thisVersion !== animationVersion) return;

        --parts;
        if (called) {
          return;
        }
        if (parts === 0 || !complete) {
          called = true;
          // done callback would go here if needed
        }
      }

      // center animation (full duration)
      view.animate({ center, duration }, callback);

      // zoom animation: zoom out a bit, then zoom in to target
      const zoomOut = Math.max(0, currentZoom - 1);
      view.animate(
        { zoom: zoomOut, duration: duration / 2 },
        { zoom, duration: duration / 2 },
        callback,
      );
    },
  };
}
