# NOREAS Project Context - Cursor AI Assistant Guide

**Last Updated:** January 14, 2026
**Project:** NOREAS Inc. Website (Engineering & Scientific Services)

---

## 🔑 Critical Project Details

### Git & GitHub Setup
- **Repository:** `https://github.com/aseesy/noreasedemo.git`
- **Branch:** `main`
- **Authentication:** GitHub Personal Access Token stored in `.env` file as `GITHUB_TOKEN`
  - **NEVER ask if GitHub CLI is installed** - we use PAT from `.env`
  - **To push:** `source .env && git push https://${GITHUB_TOKEN}@github.com/aseesy/noreasedemo.git main`
- **Remote:** `origin` points to GitHub repo above

### Deployment
- **Platform:** Netlify
- **Site URL:** `https://noreasedemo.netlify.app` (auto-deploys on push to `main`)
- **Deployment:** Automatic via GitHub integration

---

## 📁 Project Structure

### Key Files
- `index.html` - Main HTML file (single-page application)
- `styles.css` - Main stylesheet
- `script.js` - Main JavaScript file
- `.env` - Contains `GITHUB_TOKEN` for authentication (DO NOT commit)

### Video Files
- `outher.mp4` - Original video file (26MB, fallback)
- `outher-1080p.mp4` - Desktop optimized version (13MB)
- `outher-720p.mp4` - Mobile optimized version (8.4MB)
- **Location:** All video files in root directory alongside `index.html`
- **Video element:** Located in hero section with responsive sources and fallback

### Documentation Files
- `VIDEO-OPTIMIZATION-GUIDE.md` - Guide for video optimization with ffmpeg
- `PERFORMANCE-REVIEW.md` - Performance optimization notes
- `PHASE-2-REPORT.md` - Phase 2 optimization report
- `TECHNICAL-AUDIT.md` - Technical audit findings

---

## 🎨 Technical Stack

### Frontend
- **Framework:** Vanilla HTML/CSS/JavaScript (no frameworks)
- **Fonts:** Inter (400, 600, 700) and Poppins (700) from Google Fonts
- **Loading:** Async font loading with `display=optional`

### Video Configuration
- **Format:** MP4 only (no WebM - user removed WebM sources)
- **Responsive:** Desktop (1080p) and Mobile (720p) versions
- **Fallback:** `outher.mp4` always included as last source
- **Attributes:** `autoplay muted loop playsinline`
- **Poster:** Inline SVG data URI (brand color `#0760ad`)

### CSS Architecture
- **Z-index stacking (hero section):**
  - `.hero-background`: `z-index: 0`
  - `.hero-video`: `z-index: 1`
  - `.hero-overlay`: `z-index: 2`
  - `.animated-shapes`: `z-index: 3`
  - `.hero-content`: `z-index: 10`
- **Critical CSS:** Inline in `<head>` for hero and navbar
- **Main stylesheet:** Loaded synchronously (not async) to prevent FOUC

### JavaScript Features
- Video autoplay handling with error recovery
- Intersection Observer for animations (AOS-like)
- Smooth scrolling navigation
- Mobile menu toggle
- Project filtering
- Contact form handling (mailto fallback)
- Performance optimizations (debouncing, lazy loading)

---

## 🐛 Recent Fixes & Issues Resolved

### Video Visibility Issues (Jan 14, 2026)
- **Problem:** Video not displaying in hero section
- **Root Cause:** Z-index stacking issues - `.hero-background` was `z-index: -1`, video/overlay/shapes all had `z-index: 0`
- **Solution:** Fixed z-index hierarchy (see CSS Architecture above)
- **Additional:** Added fallback video source (`outher.mp4`) and JavaScript autoplay handling

### Video Preload Warning
- **Problem:** `<link rel="preload" as="video">` not supported in all browsers
- **Solution:** Removed video preload links (autoplay videos load automatically)

### Missing Fallback Video Source
- **Problem:** If optimized videos fail, no fallback available
- **Solution:** Added `<source src="outher.mp4?v=2">` as final fallback in video element

---

## ⚠️ Important Notes for AI Assistants

### DO NOT:
1. ❌ Ask if GitHub CLI is installed - we use PAT from `.env`
2. ❌ Suggest WebM video format - project uses MP4 only
3. ❌ Change z-index values without understanding the stacking hierarchy
4. ❌ Remove the fallback video source (`outher.mp4`)
5. ❌ Make CSS stylesheet async - it causes layout shifts
6. ❌ Commit `.env` file to git

### DO:
1. ✅ Use PAT from `.env` for git operations: `source .env && git push https://${GITHUB_TOKEN}@github.com/aseesy/noreasedemo.git main`
2. ✅ Always include fallback video source when modifying video element
3. ✅ Maintain z-index hierarchy when adding new hero elements
4. ✅ Test video visibility after CSS changes
5. ✅ Use cache-busting query strings (`?v=2`) when updating video sources
6. ✅ Check browser console for video errors when debugging

---

## 🔧 Common Commands

### Git Operations
```bash
# Push to GitHub (uses PAT from .env)
source .env && git push https://${GITHUB_TOKEN}@github.com/aseesy/noreasedemo.git main

# Standard git workflow
git add <files>
git commit -m "message"
git push origin main  # (will use PAT if configured)
```

### Local Development
- Open `index.html` in browser (no build process needed)
- All files are in root directory
- No package manager (no npm/yarn)
- No build step (vanilla JS)

---

## 📊 Performance Considerations

- **Critical CSS:** Inline in `<head>` for above-fold content
- **Fonts:** Async loaded with `display=optional` to prevent FOUT
- **Videos:** Responsive sources (1080p desktop, 720p mobile)
- **Images:** SVG logo with explicit dimensions
- **JavaScript:** Intersection Observer for animations (lazy trigger)

---

## 🎯 Project Goals

- Professional engineering firm website
- Fast loading (performance optimized)
- Responsive design (mobile-first approach)
- Accessibility considerations
- SEO optimized (meta tags, semantic HTML)

---

## 📝 Current State

- **Status:** Production-ready, deployed on Netlify
- **Last Major Update:** Video visibility fixes (Jan 14, 2026)
- **Video:** Working with z-index fixes, autoplay handling, and fallback source
- **Deployment:** Auto-deploys on push to `main` branch

---

*This file should be referenced by AI assistants to understand project context and avoid asking unnecessary questions.*
