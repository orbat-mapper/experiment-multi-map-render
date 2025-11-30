<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createLeafletAdapter, type MapAdapter } from "@/multimaplib/adapters";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef<HTMLElement>("mapContainerElement");
let leafletMap: L.Map;
let mapAdapter: MapAdapter;

onMounted(async () => {
  if (!mapContainerElement.value) {
    console.error("Map container element is not available.");
    return;
  }
  leafletMap = L.map(mapContainerElement.value, {
    center: [0, 0],
    zoom: 3,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(leafletMap);

  leafletMap.whenReady(() => {
    mapAdapter = createLeafletAdapter(leafletMap);
    emit("ready", mapAdapter);
  });
});

onUnmounted(() => {
  mapAdapter?.cleanUp();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
