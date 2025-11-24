<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MaplibreMap from "@/components/MaplibreMap.vue";
import OpenLayersMap from "@/components/OpenLayersMap.vue";
</script>

<template>
  <div class="h-full w-full bg-background">
    <ResizablePanelGroup direction="horizontal" class="h-full w-full">
      <ResizablePanel :default-size="20" class="">
        <div class="flex items-center justify-center">
          <span class="font-semibold">Multi map render</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="50">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel :default-size="50">
            <MaplibreMap />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :default-size="50">
            <OpenLayersMap />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
