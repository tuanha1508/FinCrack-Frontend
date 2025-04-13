# FinCrack Frontend

A modern financial web application built with Nuxt 3, Vue 3, TypeScript, and Tailwind CSS.

## Features

- Portfolio tracking and visualization
- Multi-account support
- Real-time data updates
- Interactive charts and graphs
- Responsive design for all devices

## Tech Stack

### Core
- Vue 3 with Composition API
- Nuxt 3 for SSR/SSG capabilities
- TypeScript for type safety
- Tailwind CSS with Shadcn/NuxtUI components

### Financial UI Components
- PrimeVue - Comprehensive solution for financial interfaces with advanced data tables and filters

### Data Visualization
- ApexCharts - Financial charts
- D3.js - Custom, complex financial visualizations

### State Management
- Pinia - Lightweight, intuitive store with TypeScript integration

### Form Handling
- VeeValidate with Zod - Type-safe validation for financial form inputs
- Vue Currency Input - Specialized input for financial amounts

### Animation & Interaction
- GSAP - Smooth, professional animations
- VueDraggable - Interactive portfolio management interfaces

### Performance Optimization
- Nuxt Image - Optimized image loading
- VueUse - Composition utilities for common UI patterns

### Development Tools
- Vitest - Unit testing with Vue integration

## Project Structure

```
frontend/
├── .nuxt/               # Nuxt build directory
├── .output/             # Nuxt output directory
├── assets/              # Static assets
│   ├── css/             # CSS global styles
│   ├── images/          # Images
│   └── fonts/           # Font files
├── components/          # Vue components
│   ├── ui/              # UI components (Button, Card, Modal...)
│   ├── layout/          # Layout components
│   └── shared/          # Shared components across pages
├── composables/         # Composable functions
├── content/             # Nuxt Content module files
├── layouts/             # Layout templates
├── middleware/          # Route middleware
├── modules/             # Custom Nuxt modules
├── pages/               # Application pages
├── plugins/             # Nuxt plugins
├── public/              # Public static files
├── server/              # Server-side code
│   ├── api/             # API endpoints
│   ├── middleware/      # Server middleware
│   └── utils/           # Server utilities
├── stores/              # Pinia stores
├── utils/               # Utility functions
├── app.config.ts        # App configuration
├── app.vue              # Main app component
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

5. Preview production build
```bash
npm run preview
# or
yarn preview
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 