<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MaplibreMap from "@/components/MaplibreMap.vue";
import OpenLayersMap from "@/components/OpenLayersMap.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import GlobeGLMap from "@/components/GlobeGLMap.vue";
import type { MapAdapter } from "@/multimaplib/adapters";
import { shallowRef } from "vue";
import { createMapWrapper, type MapWrapper } from "@/multimaplib/common.ts";
import { Button } from "@/components/ui/button";

const olMap = shallowRef<MapWrapper>();
const mlMap = shallowRef<MapWrapper>();
const leafletMap = shallowRef<MapWrapper>();
const globeGLMap = shallowRef<MapWrapper>();

const cities: Array<{ name: string; coord: [number, number] }> = [
  { name: "Tromsø", coord: [18.9553, 69.6496] },
  { name: "Stockholm", coord: [18.0686, 59.3293] },
  { name: "Cape Town", coord: [18.4241, -33.9249] },
  { name: "Vancouver", coord: [-123.1216, 49.2827] },
  { name: "Tokyo", coord: [139.6917, 35.6895] },
  { name: "Sydney", coord: [151.2093, -33.8688] },
  { name: "Rio de Janeiro", coord: [-43.1729, -22.9068] },
];

function onOpenLayersMapReady(adapter: MapAdapter) {
  olMap.value = createMapWrapper(adapter);
}

function onMaplibreMapReady(adapter: MapAdapter) {
  mlMap.value = createMapWrapper(adapter);
}

function onLeafletMapReady(adapter: MapAdapter) {
  leafletMap.value = createMapWrapper(adapter);
}

function onGlobeGLMapReady(adapter: MapAdapter) {
  globeGLMap.value = createMapWrapper(adapter);
}

function goToPosition(coord: [number, number], zoom: number) {
  const wrappers = [olMap, mlMap, leafletMap, globeGLMap];
  for (const wrapper of wrappers) {
    wrapper.value?.goToPosition(coord, zoom);
  }
}
</script>

<template>
  <div class="h-full w-full bg-background">
    <ResizablePanelGroup
      direction="horizontal"
      class="h-full w-full"
      autoSaveId="map-grid-layout1"
    >
      <ResizablePanel :default-size="20" class="@container">
        <div class="flex items-center justify-center">
          <span class="font-semibold">Multi map render</span>
        </div>
        <div
          v-if="olMap && mlMap && leafletMap && globeGLMap"
          class="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-2 p-2"
        >
          <Button
            v-for="city in cities"
            :key="city.name"
            class=""
            @click="goToPosition(city.coord, 5)"
            >{{ city.name }}</Button
          >
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="50">
        <ResizablePanelGroup direction="vertical" autoSaveId="map-grid-layout2">
          <ResizablePanel :default-size="50">
            <ResizablePanelGroup
              direction="horizontal"
              autoSaveId="map-grid-layout3"
            >
              <ResizablePanel :default-size="50">
                <MaplibreMap @ready="onMaplibreMapReady" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel :default-size="50">
                <LeafletMap @ready="onLeafletMapReady" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :default-size="50">
            <ResizablePanelGroup
              direction="horizontal"
              autoSaveId="map-grid-layout4"
            >
              <ResizablePanel :default-size="50">
                <OpenLayersMap @ready="onOpenLayersMapReady" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel :default-size="50">
                <GlobeGLMap @ready="onGlobeGLMapReady" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
