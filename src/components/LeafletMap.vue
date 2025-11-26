<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createLeafletAdapter } from "@/multimaplib/adapters";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef("mapContainerElement");
let leafletMap: L.Map;

onMounted(async () => {
  leafletMap = L.map(mapContainerElement.value as HTMLElement, {
    center: [0, 0],
    zoom: 3,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(leafletMap);

  leafletMap.whenReady(() => {
    emit("ready", createLeafletAdapter(leafletMap));
  });
});

onUnmounted(() => {
  leafletMap?.remove();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
