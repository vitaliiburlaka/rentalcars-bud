import { SearchBar } from './components/SearchBar/SearchBar'

import styles from './Search.module.scss'

export function Search(): JSX.Element {
  return (
    <div className={styles.container}>
      <h3 className={styles.headline} data-testid="search-headline">
        Let’s find your ideal car
      </h3>
      <SearchBar />
    </div>
  )
}
