<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, shallowRef } from "vue";
import Globe, { type GlobeInstance } from "globe.gl";
import { createGlobeGLAdapter } from "@/multimaplib/adapters.ts";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef("mapContainerElement");
const globeInstance = shallowRef<GlobeInstance>();

onMounted(async () => {
  const container = mapContainerElement.value as HTMLElement;

  const globe = new Globe(container, {
    waitForGlobeReady: true,
    animateIn: false,
  });

  globe
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .backgroundColor("rgba(0,0,0,0)");

  // Set initial point of view
  globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

  globeInstance.value = globe;
  emit("ready", createGlobeGLAdapter(globe));
});

onUnmounted(() => {
  globeInstance.value?._destructor();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
