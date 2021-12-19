import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { Search } from './Search'

describe('<Search />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    expect(getByTestId('search-headline')).toBeInTheDocument()
  })
})
