# TrandAura

A modern, full-stack e-commerce platform for fresh and organic fruits, built with Next.js 16. Features a sleek storefront, AI-powered fruit assistant, role-based dashboards, and a powerful admin panel with real-time analytics.

---

<img width="1024" height="1536" alt="sum" src="https://github.com/user-attachments/assets/41444b4d-89f9-431c-887a-16c0b74ecaf9" />

## Features

### Storefront
- Hero slider with animated transitions
- Featured products grid with product cards
- Shop by category (Men, Women, Shoes, Bags, Accessories, Watches)
- Full explore page with search, category filter, sort, and pagination
- Product detail pages with images and descriptions
- Testimonials, brand logos, statistics counters, and FAQ section
- Scroll-triggered animations with Framer Motion
- About page

### AI Fruit Assistant
- Floating AI chat widget powered by OpenRouter API
- Answers questions about seasonal fruits, recommendations, and storage tips
- Professional shopping assistance with context-aware responses

### Authentication & Authorization
- Email/password registration and login
- Google OAuth social login
- JWT-based session management with 7-day cookie cache
- Role-based access control (User / Admin)
- User status management (Active / Blocked)

### User Dashboard
- Dashboard overview with personal metrics
- Product browsing and ordering
- Cart and order management
- Profile settings

### Admin Dashboard
- Platform metrics overview (total users, products, orders, earnings)
- Add new products to the catalog
- Manage product catalog with pagination
- Manage user accounts (block, unblock, delete)
- View and manage all orders
- Platform analytics with interactive charts (bar, pie, area)
- Profile settings

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | MongoDB |
| Auth | Better Auth (Email + Google OAuth, JWT) |
| AI Assistant | OpenRouter API (via OpenAI SDK) |
| UI Components | Shadcn UI, Radix primitives |
| Charts | Recharts |
| Animation | Framer Motion |
| Carousel | Swiper |
| Icons | Lucide React, React Icons |
| Notifications | React Hot Toast |
| Marquee | React Fast Marquee |
| Counter | React Countup |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **MongoDB** instance (local or Atlas)
- A **Google OAuth** client ID and secret (for social login)
- An **OpenRouter API** key (for AI assistant)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trandaura.git
cd trandaura
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/trandaura
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENROUTER_API_KEY=your-openrouter-api-key
NEXT_PUBLIC_API_URL=your-backend-api-url
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/            # Login & Register pages
│   ├── (main)/            # Public storefront (home, explore, categories, about, fruit details)
│   ├── (dashbaord)/       # Dashboard layout (user & admin panels)
│   └── api/
│       ├── auth/          # Better Auth API routes
│       └── chat/          # AI Assistant chat endpoint (OpenRouter)
├── components/
│   ├── home/              # Homepage sections (Brands, Categories, FAQ, Featured, Statistics, Testimonials)
│   ├── shared/            # Reusable components (Navbar, Footer, HeroSlider, ProductCard, AiAssistant, etc.)
│   ├── dashboard/         # Dashboard-specific components (sidebar, admin analytics charts)
│   ├── slides/            # Hero slider slide layouts
│   └── ui/                # Shadcn UI primitives
├── hooks/
│   └── use-mobile.ts      # Mobile detection hook
├── lib/
│   ├── actions/           # Server actions (add/delete/update products, cart, users, orders)
│   ├── api/               # API fetch helpers (cart, products, users)
│   ├── core/              # Session, JWT, server fetch utilities
│   ├── auth.ts            # Better Auth server config
│   ├── auth-client.ts     # Client-side auth helpers
│   └── openrouter.ts      # OpenRouter AI client configuration
├── types/                 # TypeScript interfaces (product, user, ProductsResponse)
└── proxy.ts               # Proxy configuration
```

---

## License

This project is private and not open source.
