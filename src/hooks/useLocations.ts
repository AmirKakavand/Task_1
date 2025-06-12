import useSWR from 'swr'
import type { Location } from '../types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useLocations() {
  const { data, error } = useSWR<Location[]>('/data.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5 * 60 * 1000 // 5 minutes cache
  })

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error
  }
}
