# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guardians of Hope Foundation Website - *Where courage meets the care*

A static Next.js website for a non-profit organization founded by JNV alumni to support needy children. This is NOT an official JNV school website.

**Founders:** Deepak Chauhan, Rajni Dhani, Mayank Tyagi, Ashish Tyagi

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# Run linting
npm run lint
```

## Architecture

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Export**: Static HTML export for GitHub Pages
- **Deployment**: GitHub Actions (`.github/workflows/deploy.yml`)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── about/              # About the foundation
│   ├── founders/           # Founders page
│   ├── members/            # Members with expandable cards
│   ├── events/             # Events and activities
│   ├── join/               # Join the cause page
│   └── contact/            # Contact page
└── components/             # Reusable components
    ├── Header.tsx          # Navigation header
    ├── Footer.tsx          # Site footer
    ├── Hero.tsx            # Hero section
    └── Card.tsx            # Card component
```

## Key Configuration

- `next.config.ts`: Static export with `basePath: '/gohf'` for GitHub Pages
- `postcss.config.mjs`: Tailwind CSS v4 PostCSS plugin
- `tsconfig.json`: TypeScript configuration with `@/*` path alias
