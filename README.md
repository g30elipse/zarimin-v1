# 🎵 ZARIMIN

<div align="center">
  <img src="public/logo-black.jpg" alt="ZARIMIN Logo" width="300"/>
  
  **A Music Magazine Dedicated to Preserving and Promoting Bodo Music Culture**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 📖 About

**ZARIMIN** (meaning "history" in Bodo) is a dynamic music and entertainment magazine founded in 2024 by Dakhwr. The platform connects Bodo music with the global music community while preserving its rich cultural heritage.

### Mission
- 🌍 Bring Bodo music and entertainment to the global stage
- 📚 Document and preserve Bodo music history
- 🎤 Support both established and emerging Bodo artists
- 🎵 Connect Bodo music culture with worldwide audiences

---

## ✨ Features

### 🎤 Artist Spotlight
- Featured artist profiles with comprehensive information
- Social media integration (Facebook, Instagram, Spotify, YouTube)
- Dynamic artist grid with search functionality
- Individual artist pages with detailed bios

### 📰 News & Articles
- Rich text content powered by Contentful CMS
- Category-based filtering and tagging
- Advanced search with author, title, and content search
- Related news suggestions
- SEO-optimized article pages

### 📊 Music Charts
- Hot 100 tracking
- Global 200 charts
- Homepage featured charts
- Chart history and trends

### 🎪 Events
- Curated list of music events and concerts
- Event calendar with upcoming shows
- Detailed event pages with venue information
- Filter by event type, city, and date
- Featured events on homepage
- Ticket information and links
- Artist lineup details
- Add to calendar functionality
- Search events by name, venue, or location

### 🎬 Shorts
- Short-form video content
- Latest releases showcase
- Sort and filter capabilities

### 👥 Team
- Meet the ZARIMIN team
- Team member profiles and roles

### 🎨 UI/UX Features
- Responsive design (mobile-first approach)
- Dark mode support via theme provider
- Smooth animations and transitions
- Custom typography (Crimson Text, Italianno)
- Bottom navigation for mobile devices
- Search functionality with debouncing
- Pagination for content browsing

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.1.2** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Class Variance Authority** - Component variants management
- **clsx** & **tailwind-merge** - Conditional styling utilities
- Custom aspect ratios (4:5 for artists, 3:4 for shorts, 16:9 for news)

### UI Components
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-progress` - Progress indicators
- **Lucide React** - Icon library
- Custom components with shadcn/ui patterns

### Content Management
- **Contentful** - Headless CMS
- **@contentful/rich-text-react-renderer** - Rich text rendering
- GraphQL API integration

### Fonts
- **Google Fonts**:
  - Crimson Text (400, 600)
  - Italianno (400)

---

## 📁 Project Structure

```
zarimin/
├── public/                    # Static assets
│   ├── banner.jpg            # Hero banner images
│   ├── hero.jpg              # Homepage hero image
│   ├── logo-black.jpg        # Brand logo
│   └── social-logo/          # Social media icons
│       ├── facebook-f-brands-solid.svg
│       ├── instagram-brands-solid.svg
│       ├── spotify-brands-solid.svg
│       ├── youtube-brands-solid.svg
│       └── x-twitter-brands-solid.svg
│
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── artists/         # Artist listing & detail pages
│   │   │   ├── [artistId]/  # Dynamic artist page
│   │   │   ├── _search.tsx  # Search component
│   │   │   └── page.tsx     # Artist listing
│   │   ├── charts/          # Music charts page
│   │   ├── events/          # Events listing & detail pages
│   │   │   ├── [eventSlug]/ # Dynamic event page
│   │   │   ├── _search.tsx  # Search & filter component
│   │   │   └── page.tsx     # Events listing
│   │   ├── news/            # News listing & detail pages
│   │   │   ├── [newsId]/    # Dynamic news article page
│   │   │   ├── _search.tsx  # Search component
│   │   │   └── page.tsx     # News listing
│   │   ├── shorts/          # Short videos page
│   │   ├── submissions/     # Artist submissions
│   │   │   └── profile/     # Profile submission
│   │   ├── team/            # Team page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   │
│   ├── components/          # React components
│   │   ├── artists/         # Artist-related components
│   │   │   ├── ArtistCard.tsx
│   │   │   └── ArtistGrid.tsx
│   │   ├── charts/          # Chart components
│   │   │   ├── ChartItem.tsx
│   │   │   └── ChartList.tsx
│   │   ├── common/          # Shared components
│   │   │   ├── FabSearch.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── events/          # Event components
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventGrid.tsx
│   │   │   └── EventFilter.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── BottomNav.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── NavLink.tsx
│   │   │   └── SectionWrapper.tsx
│   │   ├── news/            # News components
│   │   │   ├── NewsCard.tsx
│   │   │   ├── NewsFilter.tsx
│   │   │   └── NewsGrid.tsx
│   │   ├── sections/        # Homepage sections
│   │   │   ├── ArtistSpotlight.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   ├── LatestShorts.tsx
│   │   │   ├── TrendingCharts.tsx
│   │   │   └── UpcomingEvents.tsx
│   │   ├── shorts/          # Shorts components
│   │   │   ├── ShortCard.tsx
│   │   │   └── ShortGrid.tsx
│   │   ├── spotlight/       # Spotlight components
│   │   │   ├── ArtistSpotlight.tsx
│   │   │   └── SpotlightCard.tsx
│   │   ├── team/            # Team components
│   │   │   └── TeamMember.tsx
│   │   └── ui/              # UI primitives
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── HoverCard.tsx
│   │       ├── progress.tsx
│   │       └── ThemeProvider.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useDebounce.ts   # Debounce hook for search
│   │
│   ├── lib/                 # Utility libraries
│   │   ├── api/             # API layer
│   │   │   ├── base.ts      # Base API functions & Contentful integration
│   │   │   ├── artists.ts   # Artist API
│   │   │   ├── charts.ts    # Charts API
│   │   │   ├── events.ts    # Events API
│   │   │   ├── news.ts      # News API
│   │   │   ├── shorts.ts    # Shorts API
│   │   │   ├── spotlight.ts # Spotlight API
│   │   │   ├── team.ts      # Team API
│   │   │   └── index.ts     # API exports
│   │   ├── parsers/         # Data parsers
│   │   │   ├── artists.ts   # Parse artist data from Contentful
│   │   │   ├── charts.ts    # Parse chart data
│   │   │   ├── events.ts    # Parse events data
│   │   │   ├── news.ts      # Parse news data
│   │   │   ├── shorts.ts    # Parse shorts data
│   │   │   ├── spotlight.ts # Parse spotlight data
│   │   │   └── team.ts      # Parse team data
│   │   ├── utils/           # Utility functions
│   │   │   ├── index.ts     # General utilities
│   │   │   └── news.ts      # News-specific utilities
│   │   ├── constants.ts     # App constants
│   │   └── dummy-data/      # Mock data for development
│   │
│   └── types/               # TypeScript type definitions
│       ├── artists.ts
│       ├── charts.ts
│       ├── events.ts
│       ├── news.ts
│       ├── shorts.ts
│       ├── spotlight.ts
│       ├── team.ts
│       └── index.ts         # Shared types
│
├── .eslintrc.json           # ESLint configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+ (LTS recommended)
- **npm** / **yarn** / **pnpm** / **bun**
- **Contentful Account** (for CMS integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zarimin.git
   cd zarimin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Contentful CMS
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, latest shorts, upcoming events, news, charts, and artist spotlights |
| `/about` | About ZARIMIN and mission statement |
| `/artists` | Browse all artists with search and filtering |
| `/artists/[artistId]` | Individual artist profile page |
| `/events` | Browse upcoming and past events with filters (type, city, status) |
| `/events/[eventSlug]` | Individual event page with details, lineup, and ticket info |
| `/news` | Browse news articles with search and category filters |
| `/news/[newsId]` | Individual news article with rich content |
| `/charts` | Music charts (Hot 100, Global 200) |
| `/shorts` | Browse short-form video content |
| `/team` | Meet the ZARIMIN team |
| `/submissions/profile` | Artist profile submission form |

---

## 🎨 Design System

### Color Scheme
- Uses CSS custom properties for theming
- Dark mode support via `ThemeProvider`
- Semantic color tokens (primary, secondary, accent, etc.)

### Typography
- **Primary Font**: Crimson Text (400, 600)
- **Display Font**: Italianno (400) - Used for hero headings

### Aspect Ratios
- **Artists**: 4:5
- **Shorts**: 3:4  
- **News**: 16:9
- **Profile**: 1:1

### Responsive Breakpoints
- Mobile: Default
- Tablet: `md` (768px)
- Desktop: `lg` (1024px)
- Large: `xl` (1280px)
- Extra Large: `2xl` (1400px - max container width)

---

## 🔌 API Integration

### Contentful CMS

The application uses **Contentful** as a headless CMS with GraphQL API.

#### Content Types:
- **News**: Articles with rich text, images, author, and tags
- **Artists**: Artist profiles with bio, images, and social links
- **Events**: Music events with date, venue, lineup, and ticket information
- **Spotlight**: Featured artist highlights
- **Charts**: Music chart data
- **Shorts**: Short video content
- **Team**: Team member information

#### GraphQL Queries
All API calls are centralized in `/src/lib/api/` with corresponding parsers in `/src/lib/parsers/`.

Example query structure:
```typescript
// Fetch news with filters
newsApi.getAllNews({
  page: 1,
  perPage: 4,
  search: '',
  sort: NewsSort.CREATED_DESC,
})

// Fetch upcoming events
eventsApi.getUpcomingEvents(4)

// Fetch events with filters
eventsApi.getAllEvents({
  page: 1,
  perPage: 12,
  eventType: ['Concert', 'Festival'],
  city: 'Guwahati',
  status: EventStatus.UPCOMING,
})
```

#### Data Fetching
- Server-side rendering (SSR) for SEO
- Incremental Static Regeneration (ISR) with `revalidate: 1`
- Client-side search with debouncing

---

## 🔍 Key Features Implementation

### Search Functionality
- Debounced search input (400ms delay)
- Search across multiple fields (title, content, author, venue, city)
- Real-time results with pagination

### Events System
- Automatic event status calculation (upcoming, ongoing, past)
- Filter by event type (Concert, Festival, Workshop, etc.)
- Filter by location and date range
- Featured events on homepage
- Rich event details with lineup and ticket integration
- Add to calendar functionality

### Pagination
- Custom `Pagination` component
- URL-based pagination with searchParams
- Preserves search and filter state

### Social Media Integration
- Dynamic icon mapping for social platforms
- Support for Facebook, Instagram, Spotify, YouTube, Twitter/X
- Fallback for generic links

### Rich Text Rendering
- Contentful Rich Text rendered with `@contentful/rich-text-react-renderer`
- Custom rendering options for embedded assets

---

## 🌍 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy!

3. **Environment Variables**
   Add these in Vercel dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN`

### Other Platforms
- **Netlify**: Compatible with Next.js
- **AWS Amplify**: Full Next.js support
- **Cloudflare Pages**: With Next.js runtime
- **Self-hosted**: Use `npm run build` and `npm start`

---

## 📝 Configuration Files

### `next.config.ts`
```typescript
typescript: {
  ignoreBuildErrors: true, // Currently ignoring TS errors in build
}
```

### `tailwind.config.ts`
- Custom color system with CSS variables
- Custom aspect ratios for media content
- Extended font families
- Dark mode class strategy

### `tsconfig.json`
- Path aliases (`@/` points to `src/`)
- Strict type checking enabled
- React 19 JSX transform

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful commit messages
- Test your changes before submitting

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👥 Team

Founded by **Dakhwr** - Passionate Bodo music enthusiast and entrepreneur

Visit the [Team page](/team) to meet the full ZARIMIN team.

---

## 📧 Contact

For inquiries, collaborations, or support:
- **Website**: [zarimin.com](https://zarimin.com) (if available)
- **Email**: contact@zarimin.com (update with actual email)

---

## 🙏 Acknowledgments

- **Bodo Music Community** - For the rich cultural heritage
- **Contentful** - For the powerful CMS platform
- **Vercel** - For Next.js and deployment platform
- **Open Source Community** - For the amazing tools and libraries

---

<div align="center">
  <strong>🎵 Preserving Culture, One Song at a Time 🎵</strong>
  
  Made with ❤️ by the ZARIMIN team
</div>
