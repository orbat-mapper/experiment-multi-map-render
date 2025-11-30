<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  useTemplateRef,
  shallowRef,
  nextTick,
} from "vue";
import Globe, { type GlobeInstance } from "globe.gl";
import { createGlobeGLAdapter, type MapAdapter } from "@/multimaplib/adapters";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef<HTMLElement>("mapContainerElement");
const globeInstance = shallowRef<GlobeInstance>();
let resizeObserver: ResizeObserver | null = null;
let mapAdapter: MapAdapter;

function updateGlobeSize() {
  const container = mapContainerElement.value as unknown as HTMLElement;
  const globe = globeInstance.value;
  if (container && globe) {
    globe.width(container.clientWidth);
    globe.height(container.clientHeight);
  }
}

onMounted(async () => {
  if (!mapContainerElement.value) {
    console.error("Map container element is not available.");
    return;
  }
  const container = mapContainerElement.value;

  // Wait for next tick to ensure container has dimensions
  await nextTick();

  const globe = new Globe(container, {
    waitForGlobeReady: true,
    animateIn: false,
  });

  // Set initial size immediately
  globe.width(container.clientWidth);
  globe.height(container.clientHeight);

  globe
    .globeImageUrl(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    )
    .bumpImageUrl(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    )
    .backgroundImageUrl(
      "//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png",
    );
  //.backgroundColor("rgba(0,0,0,0)");

  // Set initial point of view
  globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

  globeInstance.value = globe;

  // Handle resize events
  window.addEventListener("resize", updateGlobeSize);

  // Use ResizeObserver to handle container size changes (e.g., panel resizing)
  resizeObserver = new ResizeObserver(() => {
    updateGlobeSize();
  });
  resizeObserver.observe(container);
  mapAdapter = createGlobeGLAdapter(globe);
  emit("ready", mapAdapter);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateGlobeSize);
  resizeObserver?.disconnect();
  mapAdapter?.cleanUp();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
