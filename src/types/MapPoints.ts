export default class MapPoints {
  coordinates!: [number, number]
  text!: string

  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates
  }

  convertX(x: number) {
    const zerox = 45.85
    const coefficientx = 0.00262061233

    return (x - zerox) / coefficientx
  }

  convertY(y: number) {
    const zeroy = 51.42
    const coefficienty = 0.00230178582

    return (y - zeroy) / coefficienty
  }

  get getCoordinates() {
    

    return coordinates
  }

  setPoint(coordinates: [number, number], text: string) {
    this.coordinates = coordinates
    this.text = text
  }
}

