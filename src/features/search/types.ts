export type Location = {
  alternative: Array<string>
  bookingId: string
  city: string
  country: string
  countryIso: string
  iata: string
  index: number
  isPopular: boolean
  lang: string
  lat: number
  lng: number
  locationId: string
  name: string
  placeKey: string
  placeType: string
  region: string
  searchType: string
  ufi: number
}

export type Results = {
  docs: Array<Location>
  isGooglePowered: boolean
  numFound: number
}

export type Suggestions = {
  results: Results
}
