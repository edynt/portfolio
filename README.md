# Portfolio Website

Modern, glassmorphism-styled portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features

- Glassmorphism design with backdrop blur effects
- Smooth scroll animations
- Responsive design (mobile-first)
- SEO optimized with metadata API
- Dark theme with gradient backgrounds

## Sections

- **Hero:** Introduction with CTAs and social links
- **About:** Bio, location, contact info, CV download
- **Projects:** Featured work showcase with cards
- **Skills:** Frontend/Backend/Tools with progress bars
- **Contact:** Contact form and social links

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles + glassmorphism utilities
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page
├── components/
│   ├── navbar.tsx       # Navigation bar
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── projects-section.tsx
│   ├── skills-section.tsx
│   ├── contact-section.tsx
│   └── footer.tsx
└── data/
    └── portfolio-data.ts # Personal info, projects, skills
```

## Customization

Edit `src/data/portfolio-data.ts` to update:
- Personal information (name, bio, email, social links)
- Projects list
- Skills and proficiency levels

## Deploy

Optimized for Vercel deployment:

```bash
npm run build
```

Or connect your repository to Vercel for automatic deployments.
