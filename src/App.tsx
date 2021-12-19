import { Search } from './features/search/Search'

import styles from './App.module.scss'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className={styles.header}>
        <div className={styles.wrap}>
          <a href="/">
            <img
              src="https://cdn.rcstatic.com/images/site_graphics/newsite/mobile/logos/rc-logo-small--white.svg"
              alt="Rentalcars.com Brand Logo"
            />
          </a>
        </div>
      </header>

      <section className={styles.topContent}>
        <h1 className={styles.pageTitle} data-testid="page-title">
          Car Hire – Search, Compare & Save
        </h1>

        <div className={styles.wrap}>
          <Search />
        </div>
      </section>
    </div>
  )
}

export default App
