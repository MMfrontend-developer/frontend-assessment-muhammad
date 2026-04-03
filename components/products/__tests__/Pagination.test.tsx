
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { Pagination } from '../Pagination'
import { useRouter, useSearchParams } from 'next/navigation'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

describe('Pagination', () => {
  const mockPush = vi.fn()
  const mockGet = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as Mock).mockReturnValue({ push: mockPush })
    ;(useSearchParams as Mock).mockReturnValue({ get: mockGet, toString: () => '' })
  })

  it('returns null if totalPages <= 1', () => {
    const { container } = render(<Pagination totalItems={10} limit={20} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders correctly with multiple pages', () => {
    mockGet.mockReturnValue('1')
    render(<Pagination totalItems={45} limit={20} />) // 3 pages
    
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
    
    // Left button should be disabled on page 1
    const buttons = screen.getAllByRole('button')
    expect((buttons[0] as HTMLButtonElement).disabled).toBe(true)
    expect((buttons[1] as HTMLButtonElement).disabled).toBe(false)
  })

  it('disables right button on the last page', () => {
    mockGet.mockReturnValue('3')
    render(<Pagination totalItems={45} limit={20} />) // 3 pages
    
    const buttons = screen.getAllByRole('button')
    expect((buttons[0] as HTMLButtonElement).disabled).toBe(false)
    expect((buttons[1] as HTMLButtonElement).disabled).toBe(true)
  })

  it('navigates to the next page when right button is clicked', () => {
    mockGet.mockReturnValue('1')
    ;(useSearchParams as Mock).mockReturnValue({ get: mockGet, toString: () => 'category=test' })
    render(<Pagination totalItems={45} limit={20} />)
    
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1]!)
    
    expect(mockPush).toHaveBeenCalledWith('/?category=test&page=2')
  })

  it('navigates to the previous page when left button is clicked', () => {
    mockGet.mockReturnValue('2')
    ;(useSearchParams as Mock).mockReturnValue({ get: mockGet, toString: () => 'category=test&page=2' })
    render(<Pagination totalItems={45} limit={20} />)
    
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]!)
    
    expect(mockPush).toHaveBeenCalledWith('/?category=test&page=1')
  })
})
