<script setup lang="ts">
import { ref } from 'vue'
import type MapPoints from '~/types/MapPoints'

const props = defineProps<{ coordinates: MapPoints[] }>()

const koordinates = ref()
const center = ref([46.02085637636517, 51.53998063510776])
const projection = ref('EPSG:4326')
const zoom = ref(14.815764566923766)
const rotation = ref(0)

const radius = ref(2)
const strokeWidth = ref(10)
const fillColor = ref('red')

// alert('Координаты получены! ' + props.coordinates[0].coordinates[0])
watchEffect(() => {
  koordinates.value = props.coordinates
})
</script>

<template>
  <ol-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height:500px; width:500px">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
      :min-zoom="9"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-for="coordinate in koordinates" :key="coordinate.text">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="coordinate.coordinates" />
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fillColor" />
              <ol-style-stroke :color="coordinate.color" :width="strokeWidth" />
              <ol-style-text :text="coordinate.text" />
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
