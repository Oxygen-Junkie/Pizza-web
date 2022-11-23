<script lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type MapPoints from '~/types/MapPoints'

export default {
  setup() {
    const props = defineProps<{ coordinates: MapPoints[] }>()

    const coordinates: Ref<MapPoints[]> = ref(props.coordinates)

    const center = ref([46.02085637636517, 51.53998063510776])
    const projection = ref('EPSG:4326')
    const zoom = ref(14.815764566923766)
    const rotation = ref(0)

    const radius = ref(2)
    const strokeWidth = ref(10)
    const strokeColor = ref('yellow')
    const fillColor = ref('red')

    return {
      radius,
      strokeWidth,
      fillColor,
      strokeColor,
      center,
      projection,
      zoom,
      rotation,
      coordinates,
    }
  },
  data() {
    return {
      currentCenter: this.center,
      currentZoom: this.zoom,
      currentResolution: this.resolution,
      currentRotation: this.rotation,
    }
  },
  methods: {
    zoomChanged(currentZoom: Function) {
      this.currentZoom = currentZoom
    },
    resolutionChanged(resolution: Function) {
      this.currentResolution = resolution
    },
    centerChanged(center: Function) {
      this.currentCenter = center
    },
    rotationChanged(rotation: Function) {
      this.currentRotation = rotation
    },
  },
}
</script>

<template>
  <ol-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height:800px; width:800px">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
      :min-zoom="9"
      @zoom-changed="zoomChanged"
      @center-changed="centerChanged"
      @resolution-changed="resolutionChanged"
      @rotation-changed="rotationChanged"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-for="coordinate in coordinates" :key="coordinate.text">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="coordinate.getCoordinates" />
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fillColor" />
              <ol-style-stroke :color="strokeColor" :width="strokeWidth" />
              <ol-style-text :text="coordinate.text" />
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
