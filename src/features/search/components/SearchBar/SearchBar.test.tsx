import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import { SearchBar } from './SearchBar'

describe('<SearchBar />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    expect(getByTestId('search-input')).toBeInTheDocument()
  })

  it('should update input on change', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = getByTestId('search-input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test' } })

    expect(input.value).toBe('test')
  })
})
