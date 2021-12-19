import axios, { AxiosPromise } from 'axios'

export function fetchSearch(solrTerm: string): AxiosPromise {
  const url = `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${solrTerm}`

  return axios.get(url)
}
