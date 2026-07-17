# SwiftMart

A modern, full-stack e-commerce platform built with Next.js 16, featuring a sleek storefront, role-based dashboards, and a powerful admin panel with real-time analytics.

---
Live Link : https://swiftmart-lyart.vercel.app/

<img width="1024" height="1536" alt="sum" src="https://github.com/user-attachments/assets/41444b4d-89f9-431c-887a-16c0b74ecaf9" />




## Features

### Storefront
- Hero slider with animated transitions
- Featured products grid with product cards
- Shop by category (Men, Women, Shoes, Bags, Accessories, Watches)
- Full explore page with search, category filter, sort, and pagination
- Product detail pages
- Testimonials, brand logos, statistics counters, and FAQ section
- Scroll-triggered animations with Framer Motion

### Authentication & Authorization
- Email/password registration and login
- Google OAuth social login
- JWT-based session management with 7-day cookie cache
- Role-based access control (User / Admin)
- User status management (Active / Blocked)

### User Dashboard
- Dashboard overview
- Cart and order management
- Profile settings

### Admin Dashboard
- Platform metrics overview (total users, products, orders, earnings)
- Add new products
- Manage product catalog with pagination
- Manage user accounts (block, unblock, delete)
- Platform analytics with interactive charts (bar, pie, area)
- Profile settings

---



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

### 1. Clone the repository

```bash
git clone https://github.com/your-username/swiftmart.git
cd swiftmart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/database
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
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
│   ├── (main)/            # Public storefront (home, explore, categories, about)
│   ├── (dashbaord)/       # Dashboard layout (user & admin panels)
│   └── api/auth/          # Better Auth API routes
├── components/
│   ├── home/              # Homepage sections (Featured, Categories, FAQ, etc.)
│   ├── shared/            # Reusable components (Navbar, Footer, ProductCard, etc.)
│   ├── dashboard/         # Dashboard-specific components (sidebar, charts)
│   ├── slides/            # Hero slider slide layouts
│   └── ui/                # Shadcn UI primitives
├── lib/
│   ├── actions/           # Server actions (add/delete/update)
│   ├── api/               # API fetch helpers
│   ├── core/              # Session, JWT, server fetch utilities
│   └── auth.ts            # Better Auth server config
└── types/                 # TypeScript interfaces
```

---

## License

This project is private and not open source.
