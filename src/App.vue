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
import type { MapAdapter } from "@/multimaplib/adapters.ts";
import { shallowRef } from "vue";
import { createMapWrapper, type MapWrapper } from "@/multimaplib/common.ts";
import { Button } from "@/components/ui/button";

const olMap = shallowRef<MapWrapper>();
const mlMap = shallowRef<MapWrapper>();
const leafletMap = shallowRef<MapWrapper>();
const globeGLMap = shallowRef<MapWrapper>();

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
  olMap.value?.goToPosition(coord, zoom);
  mlMap.value?.goToPosition(coord, zoom);
  leafletMap.value?.goToPosition(coord, zoom);
  globeGLMap.value?.goToPosition(coord, zoom);
}
</script>

<template>
  <div class="h-full w-full bg-background">
    <ResizablePanelGroup direction="horizontal" class="h-full w-full">
      <ResizablePanel :default-size="20" class="">
        <div class="flex items-center justify-center">
          <span class="font-semibold">Multi map render</span>
        </div>
        <div v-if="olMap && mlMap && leafletMap && globeGLMap" class="p-4">
          <Button @click="goToPosition([10, 10], 4)">Fly to 10,10</Button>
          <Button @click="goToPosition([-10, 10], 12)">Fly to -10,10</Button>
          <Button @click="goToPosition([25, 71], 6)">Fly to 25,71</Button>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="50">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel :default-size="50">
            <ResizablePanelGroup direction="horizontal">
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
            <ResizablePanelGroup direction="horizontal">
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
