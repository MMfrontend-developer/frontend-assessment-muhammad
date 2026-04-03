import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProductCard } from '../ProductCard'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'https://test.com/image.jpg',
  images: ['https://test.com/image.jpg'],
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeDefined()
    expect(screen.getByText('$99.99')).toBeDefined()
    expect(screen.getByText('Test Description')).toBeDefined()
    expect(screen.getByText('Test Category')).toBeDefined()
  })

  it('links to the correct product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/products/1')
  })
})
