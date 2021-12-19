import type { Results, Location } from '../../types'

import styles from './Suggestions.module.scss'

type SuggestionsProps = {
  results: Results
  selectedPlaceKey: string
  isLoading: boolean
  onClick: (location: Location) => void
}

interface IPlaceType {
  [key: string]: string
}
const PlaceType: IPlaceType = {
  A: 'Airport',
  C: 'City',
}

export function Suggestions({
  results,
  selectedPlaceKey,
  isLoading,
  onClick,
}: SuggestionsProps): JSX.Element {
  return (
    <ul className={styles.container} role="listbox">
      {!isLoading && !results?.numFound && (
        <p className={styles.noResults}>No results found.</p>
      )}
      {results?.numFound > 0 &&
        results.docs.map((l: Location) => (
          <li
            key={l.placeKey}
            aria-selected={l.placeKey === selectedPlaceKey}
            role="option"
            onClick={() => onClick(l)}
            data-testid="suggestion-item"
          >
            <div className={styles.suggestion} tabIndex={0}>
              <span
                className={`${styles.badge} ${
                  l.placeType === 'A' && styles.badgeAirport
                }`}
              >
                {PlaceType[l.placeType]}
              </span>

              <div className={styles.content}>
                <p>
                  {l.name} {l.iata && `(${l.iata})`}
                </p>
                <p>
                  {l.city && `${l.city},`} {l.region && `${l.region},`}{' '}
                  {l.country}
                </p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}
