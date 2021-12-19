import { render, fireEvent } from '@testing-library/react'
import { Suggestions } from './Suggestions'

describe('<Suggestions />', () => {
  const locatiomMock = {
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
  }

  const defaultProps = {
    results: {
      isGooglePowered: false,
      numFound: 1,
      docs: [locatiomMock],
    },
    selectedPlaceKey: '',
    onClick: () => {},
    isLoading: false,
  }

  it('renders without crashing', () => {
    const { getAllByTestId } = render(<Suggestions {...defaultProps} />)

    expect(getAllByTestId('suggestion-item').length).toBeTruthy()
  })

  it('should call onClick on item click', () => {
    const onClickMockFn = jest.fn()
    const props = {
      ...defaultProps,
      onClick: onClickMockFn,
    }
    const { getAllByTestId } = render(<Suggestions {...props} />)

    const item = getAllByTestId('suggestion-item')[0]
    fireEvent.click(item)

    expect(onClickMockFn).toHaveBeenLastCalledWith(locatiomMock)
  })

  it('should display "No Results" message', () => {
    const props = {
      ...defaultProps,
      results: { ...defaultProps.results, numFound: 0, docs: [] },
    }
    const { getByText } = render(<Suggestions {...props} />)

    expect(getByText(/No results found/i)).toBeInTheDocument()
  })
})
