import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectSearchData, selectSearchStatus } from '../../searchSlice'

import { fetchSearchAsync } from '../../searchSlice'

import { Spinner } from '../Spinner/Spinner'
import { Suggestions } from '../Suggestions/Suggestions'

import type { Location } from '../../types'

import styles from './SearchBar.module.scss'

export function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlaceKey, setSelectedPlaceKey] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const searchData = useAppSelector(selectSearchData)
  const searchStatus = useAppSelector(selectSearchStatus)
  const dispatch = useAppDispatch()

  // Could use a debounce here, from lodash
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSearchTerm(value)
    if (value.length > 1) {
      dispatch(fetchSearchAsync(searchTerm))
    }
  }

  const handleSelect = (location: Location): void => {
    const { name, iata, city, country } = location
    const locationVal = `${name}, ${iata ? `${iata}, ` : ''}${
      city ? `${city}, ` : ''
    }${country}`
    setSearchTerm(locationVal)
    setSelectedPlaceKey(location.placeKey)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('dispatch submit')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Could be extracted to separate component */}
      <div className={styles.formGroup}>
        <span
          className={styles.iconContainer}
          aria-hidden="true"
          role="presentation"
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M21.684 9.443l-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a2.999 2.999 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614zM.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0zm21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0zM19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5zm.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0zm-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5zm-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0zM4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5zm1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0zM4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5zM3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0zM2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9H2.75z"></path>
          </svg>
        </span>
        <input
          className={`${styles.formField} ${styles.withIcon}`}
          id="pickUpLocation"
          data-testid="search-input"
          aria-label={
            searchTerm ? `Search for ${searchTerm}` : 'Pick-up location'
          }
          type="text"
          name="pickUpLocation"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Pick-up location"
          autoComplete="off"
          onFocus={() => setIsExpanded(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsExpanded(false)
            }, 100)
          }
        />

        {searchStatus === 'loading' && (
          <div className={styles.inputEndSlot}>
            <Spinner />
          </div>
        )}

        {searchTerm.length > 1 && isExpanded && (
          <Suggestions
            results={searchData?.results}
            selectedPlaceKey={selectedPlaceKey}
            onClick={handleSelect}
            isLoading={searchStatus === 'loading'}
          />
        )}
      </div>

      <button className={styles.searchBarBtn} type="submit">
        Search
      </button>
    </form>
  )
}
