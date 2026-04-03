# Checkit Technical Assessment - Content Explorer 

Hey there! Welcome to my submission for the Frontend Engineer role at Checkit. 

I've built a production-ready "Content Explorer" using Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Rather than just meeting the basic API fetch requirements, I wanted to deliver an experience that feels truly premium and e-commerce ready. The app pulls its data dynamically from the **DummyJSON API**, acting as a high-fidelity mock storefront.

##  Quick Tour of the Features (F1 - F5)

- **F-1: Listing Page**: A fully responsive layout (1 column on mobile, up to 4 on desktop) rendered server-side. I opted to lock results to 20 items per page with clear Pagination rather than infinite scroll, preventing the notorious "jumping footer" layout shift and allowing for better, predictable URL sharing.
- **F-2: Detail Page**: Dynamic routing (`/products/[id]`) rendering deep product data on the server. Next.js `generateMetadata` dynamically populates the SEO `og:image`, title, and description tags perfectly for each product.
- **F-3: Search & Filtering**: A heavily debounced (400ms) search input paired with category filtering. I made sure **every state is URL-driven**—if you refresh or share a filtered link, the UI automatically picks up your `?q=` and `?category=` params flawlessly.
- **F-4: Loading & Error States**: No jarring flashes here! I implemented smooth edge-to-edge Skeleton loaders, suspense boundaries, and a dedicated, user-friendly Empty State UI when search pulls up blank.
- **F-5: Deployment**: Successfully geared for Edge deployment on Cloudflare Pages using `@cloudflare/next-on-pages`!
- **Bonus Detail**: Added a bespoke, minimalist favicon to ensure the store branding feels complete and professional from the tab down.

---

##  Note for the Reviewers: Mock UI Elements
To show you my eye for design aesthetics without bloat, I've incorporated several UI patterns commonly found in production e-commerce apps. **Please note that the following elements are structural mockups and deliberately go nowhere (they do not trigger state/endpoints)**:
- **"Add to Cart" Buttons**: Found heavily on the detail pages and product cards. 
- **User / Cart Icons**: The navbar cart bag icons are purely for layout fidelity.
- **"24 Reviews" Link**: The underline link under the product rating is a mockup constraint to show text hierarchy.
- **"Free Prime Delivery" & "Certified Quality" Blocks**: The beautifully boxed warranty and shipping areas on the detail page are static UI to demonstrate handling layout gaps, borders, and iconography correctly.

---

##  Setup Instructions

Want to run it locally? It takes less than 30 seconds:

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd checkit-technical-assessment
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(I recommend `--legacy-peer-deps` due to the bleeding-edge nature of React 19 / Next 16 peer dependencies against the Cloudflare adapter).*

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit the App**: Pop open [http://localhost:3000](http://localhost:3000).

5. **Run the Test Suite**:
   ```bash
   # Both Pagination and ProductCard components have 100% test coverage using Vitest!
   npm run test
   ```

---

##  Performance Optimizations Executed

I took the Web Vitals requirements very seriously. Here is what's running under the hood to ensure Lightning-fast LCP (< 2.5s) and zero CLS:

1. **Route-Level Code Splitting (`next/dynamic`)**: The heavy `ProductGallery` client component on the detail page is dynamically imported. Next.js halts its JS payload from blocking the server HTML, showing a lightweight pulse-skeleton while the interactive image logic hydrates in the background!
2. **CDN Headers Edge-Caching**: If you check `next.config.ts`, I'm forcibly injecting `Cache-Control: public, max-age=31536000, immutable` headers for all static assets and images, guaranteeing perfect Cloudflare CDN asset distribution.
3. **Optimized Next Fetch Semantics**: All data fetching in `lib/api.ts` carries explicit `revalidate: 3600` tags. It hydrates fresh data only once an hour, keeping your server bill down and TTFB incredibly fast.
4. **Next/Image Priority**: Above-the-fold hero images and the first row of Product Cards are stamped with the `priority` prop.

##  Architecture strictness

### Structure
- `app/` strictly handles routing and server connections.
- `components/` are 100% categorized (e.g. `layout/`, `products/`, `ui/`). 
- `types/` cleanly shares TypeScript definitions universally (no random inline objects here!).
- `lib/api.ts` is the single source of truth for all `fetch` commands. Components **never** call endpoints directly.

### 100% Coverage on Core Units
As requested, there are heavily mocked, detailed unit tests guaranteeing that both the `Pagination` flow and `ProductCard` rendering map flawlessly covering exactly 100% of their logic!

##  Trade-offs & Known Limitations

- **State Management limit**: Because things are predominantly URL-driven (which is excellent for shareability and Server component compatibility), I skipped injecting Redux or Zustand as there was practically no global client state (like a real cart) to actually manage.
- **Search Latency**: Running search triggers a server components re-render. In a real-time instant-search requirement with thousands of items, we'd probably want to decouple that into client-side TanStack Query fetching.

##  Tech Stack Summary
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode enabled - manually scrubbed of `any` casts)
- **Styling**: Tailwind CSS v4 (No component libraries used!)
- **Testing**: Vitest + React Testing Library

I had an absolute blast building this. Thanks for your time reviewing my code.! 
