import { Suspense } from 'react'
import SearchResults from '../../../components/Searchresult'

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}