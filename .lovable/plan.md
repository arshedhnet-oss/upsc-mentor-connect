
# UPSC Mentorship Marketplace — Phase 1: Core Pages & UI

## Overview
Build a polished, mobile-first frontend prototype with all key pages, mock data, and placeholder flows for auth, communication, and payments. Third-party integrations (Supabase auth/DB, video calls, payments) will be added in a future phase.

## Design System
- **Theme**: Professional, aspirational, trustworthy — deep navy/indigo primary, warm accent (amber/gold), clean whites
- **Typography**: Clean sans-serif, strong hierarchy
- **Effects**: Subtle gradients, soft shadows, smooth page transitions and hover animations
- **Fully responsive**: Mobile-first layout

## Pages & Features

### 1. Landing Page
- Hero section with headline about UPSC strategic mentorship + CTAs ("Find a Mentor" / "Become a Mentor")
- 3-step "How it works" icons section
- Featured mentors carousel (mock data — 6-8 mentors)
- Testimonials section
- Professional footer with links

### 2. Navbar
- Logo, Home, Find Mentors, How It Works
- Sign In / Sign Up buttons (open role-selection modal)
- Mobile hamburger menu

### 3. Find Mentors Page
- Search bar (name, optional subject)
- Filter sidebar/panel: Mains attempts, Interview appearances, Rating, Price range, Availability, Optional subject
- Mentor cards grid: photo, name, bio snippet, optional subject, mains attempts, interview appearances, starting price, rating, "View Profile" button
- Mock data for ~10 mentors

### 4. Mentor Profile Page
- Hero with photo, name, optional subject, bio
- Stats: Mains attempts, Interview appearances, rating
- Pricing table (audio/video per-minute and per-hour rates)
- Availability calendar (visual, non-functional)
- Posts section (mock strategy/guidance posts)
- Reviews section with star ratings and written feedback
- "Book Session" CTA button

### 5. How It Works Page
- 5-step visual guide: Sign up → Browse → Book → Connect → Review
- Clean illustrations/icons for each step

### 6. Auth Flows (UI Only, Mock)
- **Role selection**: "I'm a Mentor" / "I'm an Aspirant"
- **User Sign Up/Login**: Email + password form
- **Mentor Sign Up**: Multi-step form — name, photo upload, optional subject, mains attempts, interview appearances, bio, verification document upload
- Auth state managed with React context + mock data

### 7. Mentor Dashboard (Mock)
- Sidebar nav: Profile, Pricing, Posts, Availability, Bookings, Earnings, Reviews
- Edit profile form
- Pricing editor (per-minute/hour for audio/video)
- Posts manager (create/edit posts)
- Bookings list, earnings summary, reviews list

### 8. User (Aspirant) Dashboard (Mock)
- Sidebar nav: Sessions, Spending, Favorites, Reviews
- Booked sessions list
- Spending tracker
- Saved/favorite mentors
- Leave review (only shows for completed sessions)

### 9. Session/Booking Flow (UI Only)
- Book session modal: select date/time, choose chat/audio/video
- Session detail page with cost estimate based on mentor rates
- Placeholder buttons for "Start Chat", "Start Audio Call", "Start Video Call"

## Technical Approach
- React Router for all routes
- Mock data files for mentors, reviews, sessions
- React Context for mock auth state and role management
- Reusable components (MentorCard, ReviewCard, PricingTable, etc.)
- Shadcn UI components + custom styling
- Framer-motion-free animations via Tailwind CSS animate utilities
