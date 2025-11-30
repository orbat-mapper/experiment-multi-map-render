<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import OLMap from "ol/Map";
import { defaults as defaultControls } from "ol/control";
import View from "ol/View";
import "ol/ol.css";
import { type Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import {
  createOpenLayersAdapter,
  type MapAdapter,
} from "@/multimaplib/adapters";

interface Props {
  center?: Coordinate;
  zoom?: number;
  baseLayerName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  center: () => [30, 60],
  zoom: 5,
  baseLayerName: "osm",
});
const emit = defineEmits(["ready", "moveend"]);
let mapAdapter: MapAdapter;
const mapRoot = ref();
let olMap: OLMap;

onMounted(async () => {
  const view = new View({
    zoom: props.zoom,
    center: fromLonLat(props.center),
    showFullExtent: true,
  });
  olMap = new OLMap({
    target: mapRoot.value,
    maxTilesLoading: 200,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view,
    controls: defaultControls({
      attributionOptions: {
        collapsible: true,
      },
    }),
  });

  mapAdapter = createOpenLayersAdapter(olMap);
  emit("ready", mapAdapter);
});

onUnmounted(() => {
  mapAdapter?.cleanUp();
});
</script>

<template>
  <div ref="mapRoot" class="h-full w-full" />
</template>
