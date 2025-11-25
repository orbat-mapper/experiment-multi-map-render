<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { createCesiumAdapter } from "@/multimaplib/adapters.ts";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef("mapContainerElement");
let cesiumViewer: Cesium.Viewer;

onMounted(async () => {
  // Set the default access token (use empty string for open data)
  Cesium.Ion.defaultAccessToken = "";

  cesiumViewer = new Cesium.Viewer(mapContainerElement.value as HTMLElement, {
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    animation: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    baseLayer: false,
  });

  // Add OSM imagery layer
  const osmImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    credit: new Cesium.Credit(
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ),
    maximumLevel: 19,
  });
  cesiumViewer.imageryLayers.addImageryProvider(osmImageryProvider);

  // Set initial camera position
  cesiumViewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(0, 0, 20000000),
  });

  emit("ready", createCesiumAdapter(cesiumViewer));
});

onUnmounted(() => {
  cesiumViewer?.destroy();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
