import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from '../use-debounce'

describe('useDebounce', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('should debounce value changes', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'hello', delay: 300 },
      }
    )

    // Update value
    rerender({ value: 'world', delay: 300 })
    
    // It should still hold onto 'hello' because the delay hasn't passed yet
    expect(result.current).toBe('hello')

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // And there we go, it's finally updated to 'world'
    expect(result.current).toBe('world')
    
    vi.useRealTimers()
  })
})
