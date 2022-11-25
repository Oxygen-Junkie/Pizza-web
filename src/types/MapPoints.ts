export default class MapPoints {
  coordinates!: [number, number]
  text!: string
  color!: string

  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates
  }

  convert(c: [number, number]) {
    const zerox = 45.85
    const coefficientx = 0.00262061233
    const zeroy = 51.42
    const coefficienty = 0.00230178582
    c[0] = (c[0] - zerox) / coefficientx
    c[1] = (c[1] - zeroy) / coefficienty

    return c
  }
}

