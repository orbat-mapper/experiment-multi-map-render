<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  useTemplateRef,
  shallowRef,
  nextTick,
} from "vue";
import Globe, { type GlobeInstance } from "globe.gl";
import { createGlobeGLAdapter } from "@/multimaplib/adapters";

const emit = defineEmits(["ready"]);

const mapContainerElement = useTemplateRef("mapContainerElement");
const globeInstance = shallowRef<GlobeInstance>();
let resizeObserver: ResizeObserver | null = null;

function updateGlobeSize() {
  const container = mapContainerElement.value as unknown as HTMLElement;
  const globe = globeInstance.value;
  if (container && globe) {
    globe.width(container.clientWidth);
    globe.height(container.clientHeight);
  }
}

onMounted(async () => {
  const container = mapContainerElement.value as unknown as HTMLElement;

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

  emit("ready", createGlobeGLAdapter(globe));
});

onUnmounted(() => {
  window.removeEventListener("resize", updateGlobeSize);
  resizeObserver?.disconnect();
  // _destructor is the cleanup method exposed by globe.gl (kapsule-based component)
  globeInstance.value?._destructor();
});
</script>
<template>
  <div ref="mapContainerElement" class="relative h-full w-full" />
</template>
