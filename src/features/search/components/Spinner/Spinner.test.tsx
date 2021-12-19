import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('<Spinner />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Spinner />)

    expect(getByTestId('spinner')).toBeInTheDocument()
  })
})
