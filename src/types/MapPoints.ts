export default class MapPoints {
  coordinates!: [number, number]
  text!: string

  constructor(coordinates: [number, number]) {
    coordinates[0] = this.convertX(coordinates[0])
    coordinates[1] = this.convertY(coordinates[1])
    this.coordinates = coordinates
  }

  convertX(x: number) {
    const zerox = 45.85
    const coefficientx = 0.0025

    return (x - zerox) / coefficientx
  }

  convertY(y: number) {
    const zeroy = 51.42
    const coefficienty = 0.0023

    return (y - zeroy) / coefficienty
  }

  get getCoordinates() {
    const zerox = 45.85
    const coefficientx = 0.0025

    const zeroy = 51.42
    const coefficienty = 0.0023

    return [(this.coordinates[0] * coefficientx + zerox), (this.coordinates[1] * coefficienty + zeroy)]
  }
}

