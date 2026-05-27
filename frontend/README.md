# ORLEV PRESS-ONS

A luxury e-commerce website for ORLEV Press-Ons premium press-on nails.

## Project Structure

```
orlevepressons/
├── public/                    # Static assets
│   └── images/               # Images organized by type
├── src/
│   ├── components/           # React components
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components
│   │   └── features/        # Feature-specific components
│   ├── pages/               # Page components
│   ├── context/             # React Context for state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── data/                # Mock data
│   ├── styles/              # Global styles
│   ├── assets/              # Fonts, icons
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Technology Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **State Management:** Context API + React Hooks
- **Routing:** React Router v6
- **HTTP Client:** Axios (optional)

## Project Phases

- Phase 0: Foundation & Infrastructure
- Phase 1: Layout Components (Navbar, Footer)
- Phase 2: Homepage
- Phase 3: Shop Page with Filters
- Phase 4: Product Detail Page
- Phase 5: Info Pages (About, FAQ, Size Guide, Contact)
- Phase 6: Cart Page
- Phase 7: Checkout (Future)
- Phase 8: Admin Dashboard (Future)

## Available Pages

Customer:

- `/` - Homepage
- `/shop` - Shop/Product listing
- `/product/:id` - Product detail
- `/about` - About page
- `/contact` - Contact page
- `/size-guide` - Size guide
- `/faq` - FAQ
- `/cart` - Shopping cart

Admin:

- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Theme Support

The project includes dark/light mode support. Theme preference is saved to localStorage and persists across sessions.

Toggle theme using the button in the navbar or via `useTheme()` hook.

## Environment Variables

Create `.env.local` file:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENV=development
VITE_ENABLE_ADMIN=true
```

## Development Guidelines

- Use functional components with hooks
- Follow folder structure for new components
- Keep components focused and reusable
- Use Tailwind CSS utilities for styling
- Test responsive design on mobile/tablet/desktop

## Next Steps

1. Implement Navbar and Footer styles
2. Build Homepage components
3. Create Shop page with filters
4. Build Product Detail page
5. Implement Cart functionality
6. Add Info pages
7. Design and build Admin Dashboard

## Notes

- All mock data is in `src/data/`
- Theme colors defined in `tailwind.config.js`
- Global styles in `src/index.css`
- Custom hooks in `src/hooks/`

## License

© 2024 ORLEV PRESS-ONS. All rights reserved.
