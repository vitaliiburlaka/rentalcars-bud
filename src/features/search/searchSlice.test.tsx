import searchSliceReducer, {
  initialState,
  fetchSearchAsync,
} from './searchSlice'

describe('searchSliceReducer', () => {
  const dataMock = {
    results: {
      docs: [
        {
          placeType: 'A',
          placeKey: '1472178',
          locationId: '37766',
          name: 'Heathrow Airport',
          iata: 'LHR',
          city: 'London',
          region: 'Greater London',
          country: 'United Kingdom',
          countryIso: 'gb',
          ufi: 900038535,
          bookingId: 'airport-37766',
          lat: 51.47079849243164,
          lng: -0.45304301381111145,
          alternative: ['GB,UK,England,Heathrow'],
          searchType: 'L',
          lang: 'en',
          index: 1,
          isPopular: true,
        },
      ],
    },
    isGooglePowered: false,
    numFound: 3746,
  }

  it('should handle initial state', () => {
    expect(searchSliceReducer(undefined, { type: 'unknown' })).toEqual({
      data: {},
      status: 'idle',
      error: null,
    })
  })

  describe('fetchSearchAsync', () => {
    it('should handle fetchSearchAsync.pending', () => {
      const action = { type: fetchSearchAsync.pending }
      const actual = searchSliceReducer(initialState, action)
      expect(actual).toEqual({
        data: {},
        status: 'loading',
        error: null,
      })
    })

    it('should handle fetchSearchAsync.fulfilled', () => {
      const action = {
        type: fetchSearchAsync.fulfilled,
        payload: dataMock,
      }
      const actual = searchSliceReducer(initialState, action)
      expect(actual).toEqual({
        data: dataMock,
        status: 'idle',
        error: null,
      })
    })

    it('should handle fetchSearchAsync.rejected', () => {
      const action = { type: fetchSearchAsync.rejected }
      const actual = searchSliceReducer(initialState, action)
      expect(actual).toEqual({
        data: {},
        status: 'failed',
        error: 'Oops, something went wrong, please try again later.',
      })
    })
  })
})
