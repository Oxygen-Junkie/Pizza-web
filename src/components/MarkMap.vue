<script setup lang="ts">
import { ref } from 'vue'
import type { DrawEvent } from 'node_modules/ol/interaction/Draw'

import MapPoints from '~/types/MapPoints'

const emit = defineEmits<{
  (event: 'marked', coordinate: MapPoints): void
}>()

const center = ref([46.02085637636517, 51.53998063510776])
const projection = ref('EPSG:4326')
const zoom = ref(14.815764566923766)
const rotation = ref(0)
const extent = ref([45.85, 51.42, 46.1, 51.65])

const radius = ref(2)
const strokeWidth = ref(10)
const strokeColor = ref('yellow')
const fillColor = ref('red')

const vectors = ref()
const drawedMarker = ref()

function drawstart(event: DrawEvent) {
  vectors.value.source.removeFeature(drawedMarker.value)
  drawedMarker.value = event.feature
  emit('marked', (new MapPoints(drawedMarker.value.getGeometry()?.getCoordinates())))
}
</script>

<template>
  <ol-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height:300px; width:300px">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
      :min-zoom="9"
      :extent="extent"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector :ref="(e: any) => { vectors = e }">
        <ol-interaction-draw type="Point" @drawstart="drawstart" />
      </ol-source-vector>
      <ol-style>
        <ol-style-circle :radius="radius">
          <ol-style-fill :color="fillColor" />
          <ol-style-stroke :color="strokeColor" :width="strokeWidth" />
          <ol-style-text text="Доставить сюда" />
        </ol-style-circle>
      </ol-style>
    </ol-vector-layer>
  </ol-map>
</template>
