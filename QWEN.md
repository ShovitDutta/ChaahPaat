# ChaahPaat Tea Shop - Development Context

## Project Overview
- **Name**: ChaahPaat
- **Type**: Premium tea e-commerce shop
- **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with custom palette
- **State Management**: Zustand for cart state, TanStack Query for data fetching
- **Animations**: Framer Motion

## Architecture & Structure

### Directory Structure
```
src/
├── app/ (Next.js App Router)
├── components/
├── ui/ (Reusable UI components)
├── lib/
├── providers/
├── store/
```

### Key Files & Components

#### Authentication Flow
- **Simplified auth**: Removed separate login page
- **Direct auth**: Login buttons directly trigger Google OAuth
- **Conditional rendering**: Add to cart buttons show "Login to Add" for unauthenticated users

#### Components Structure
- **Reusable UI**: Moved `Squircle` to `src/ui/squircle.tsx`
- **Modal Cart**: Created `src/ui/modal-cart.tsx` replacing slide-in cart
- **Header**: Includes cart icon with item count, profile navigation, Google auth button

#### State Management
- **Cart Store**: Uses Zustand with functions like `addToCart`, `removeFromCart`, `updateQuantity`
- **Session Handling**: Uses NextAuth session context

## UI/UX Improvements

### Animations & Effects
- **Gradient Border Animation**: Animated gradient border effect using CSS keyframes
- **Framer Motion**: Used throughout for smooth animations
- **Add to Cart Animation**: Visual effect when adding items to cart
- **Hover Effects**: Smooth transitions and scaling effects

### Icons Implementation
- **React Icons**: Added throughout the app
- **Google Icon**: `FaGoogle` on auth buttons
- **Cart Icon**: `FaShoppingCart` in header
- **User Profile**: `FaUser` and `FaSignOutAlt` in header
- **Navigation**: Emoji icons for menu items
- **Modal Cart**: `FaShoppingBag`, `FaTimes`, `FaTrashAlt`, `FaArrowLeft`
- **Other**: `FaLeaf`, `FaMugHot`, `FaPhone`, `FaArrowRight`

### Responsive Design
- **7:3 Ratio**: Hero section uses `grid-cols-10` with `col-span-7` for content, `col-span-3` for logo
- **Adaptive Text**: "Explore Collection" → "Collection" on small screens, "Brewing Guide" → "Guide" on small screens
- **Consistent Spacing**: Responsive padding and margins throughout

## Key Features Implemented

### Cart System
- **Modal Cart**: Replaced slide-in cart with modal interface
- **Item Management**: Add/remove items, adjust quantities directly in modal
- **Visual Feedback**: Cart icon shows item count, add to cart animation

### Authentication
- **Direct Google Login**: Buttons trigger OAuth directly
- **Conditional UI**: Authenticated users see cart functionality
- **Session Protection**: Middleware protects routes

### UI Customization
- **Custom Gradients**: Animated gradient borders using CSS
- **Button Design**: Matched "চাপাত from Assam" styling with gradient backgrounds
- **Spacing Control**: Different spacing for Hero vs other sections
- **Logo Positioning**: Always to the right of text content

## Code Changes Summary

### Major Updates
1. **Auth Flow Simplification**: Removed separate login page
2. **Cart System Overhaul**: Replaced sticky cart with modal cart
3. **Icon Integration**: Added React Icons throughout
4. **Gradient Animations**: Restored and enhanced gradient animations
5. **Layout Improvements**: 7:3 ratio, spacing adjustments
6. **Content Restructuring**: Moved "Why Chaah Paat" to About Us

### Component Reorganizations
- Moved `Squircle` from `src/components` to `src/ui`
- Created `ModalCart` in `src/ui`
- Updated all import paths accordingly

## Deployment & Build
- **Build System**: Next.js build process with Turbopack
- **Database**: Drizzle ORM with PostgreSQL
- **Migrations**: Using drizzle-kit for schema management
- **Environment**: Uses `.env.local` for secrets

## Navigation Structure
- **Main Routes**: `/`, `/dashboard`, `/login`
- **API Routes**: `/api/auth/[...nextauth]`, `/api/teas`
- **Protected Routes**: Dashboard only accessible when authenticated
- **Public Access**: Home page accessible without auth, with conditional UI

## Color Palette
- **Primary**: `#A8D88A` (accent)
- **Secondary**: `#1D1A05` (dark text)
- **Backgrounds**: `#FFFFFF`, `#E8F5E0`, `#D9F0CC`

## Performance Considerations
- **Optimized Images**: Using Next.js Image component
- **Efficient Animations**: Framer Motion with proper transition settings
- **Conditional Rendering**: Only render authenticated features when appropriate
- **Lazy Loading**: Used for non-critical components