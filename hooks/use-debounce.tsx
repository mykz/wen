import { useLayoutEffect, useMemo, useRef } from 'react'

import debounce from 'lodash.debounce'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(callback: (...args: any) => void, delay: number) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  return useMemo(
    // eslint-disable-next-line react-hooks/refs
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay],
  )
}
