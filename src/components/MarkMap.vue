<script lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { DrawEvent } from 'node_modules/ol/interaction/Draw'
import type Vector from 'ol/source/Vector'
import MapPoints from '~/types/MapPoints'

export default {
  setup() {
    const emit = defineEmits<{
      (event: 'marked', coordinate: MapPoints): void
    }>()

    const coordinate: Ref<MapPoints | undefined> = ref()

    const center = ref([46.02085637636517, 51.53998063510776])
    const projection = ref('EPSG:4326')
    const zoom = ref(14.815764566923766)
    const rotation = ref(0)
    const extent = ref([45.85, 51.42, 46.1, 51.65])

    const radius = ref(2)
    const strokeWidth = ref(10)
    const strokeColor = ref('yellow')
    const fillColor = ref('red')

    const vectors: Ref<Vector | null> = ref(null)
    const drawedMarker = ref()

    const drawstart = (event: DrawEvent) => {
      if (vectors.value && drawedMarker.value) {
        vectors.value.removeFeature(drawedMarker.value)
        drawedMarker.value = event.feature
        emit('marked', (new MapPoints(drawedMarker.value.getGeometry()?.getCoordinates())))
      }
    }

    return {
      radius,
      strokeWidth,
      fillColor,
      strokeColor,
      center,
      projection,
      zoom,
      rotation,
      extent,
      coordinate,
      drawstart,
      vectors,
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
      :extent="extent"
      @zoom-changed="zoomChanged"
      @center-changed="centerChanged"
      @resolution-changed="resolutionChanged"
      @rotation-changed="rotationChanged"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector :ref="vectors">
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
