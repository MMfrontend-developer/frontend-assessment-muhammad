import { expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import React from 'react'

// bringing in the jest-dom matchers so fancy assertions like 'toBeInTheDocument can be used'
expect.extend(matchers)

// faking out the navigation hook so Vitest doesn't stumble on Next.js-specific stuff
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// A basic mock for Next.js images since they can be a bit heavy to render in pure tests
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    /* eslint-disable @next/next/no-img-element */
    const { fill, ...rest } = props;
    return React.createElement('img', { ...rest, 'data-fill': fill ? "true" : undefined });
  },
}))

// A little safety net for React 19 until all React testing libraries are fully caught up
if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}
