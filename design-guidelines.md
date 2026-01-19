# NOREAS Website Design & Implementation Guidelines

## Design Philosophy & Brand Alignment

Before implementing any feature, ask:
- **Does this serve the user's trust-building journey?** (Environmental firms require high credibility)
- **Is this meaningful in context?** (Every element should answer: "Why does this matter to a federal agency or Fortune 500 client?")
- **Does this reflect professional engineering standards?** (Avoid gimmicky animations; prioritize substance over flash)

---

## Implementation Plan Requirements

### 1. Design Token Strategy

**Centralize ALL spacing values in CSS custom properties:**
```css
/* Current tokens */
--section-padding: 120px (desktop) → 80px (tablet) → 60px (mobile)
--primary-green: #8ec63f
--primary-blue: #0760ad

/* Expand to include */
--trust-indicator-color: var(--primary-green)
--data-metric-color: var(--primary-blue)
--section-gap-standard: 120px
--section-gap-reduced: 60px
--card-lift-distance: 4px
--card-shadow-hover: var(--shadow-lg)
```

**Document token usage with comments:**
```css
/* Total vertical: 120px (40 + 30 + 50) */
/* Ratio: 2:1 (top:bottom) for visual balance */
```

---

### 2. Component Reusability & Patterns

**Match existing patterns:**
- **Card system:** `.service-card`, `.project-card`, `.badge` all share hover states
- **Stat displays:** `.stat-number`, `.impact-value`, `.track-stat-number` should use shared utility classes
- **Section headers:** Consistently use `.section-label`, `.section-title`, `.section-subtitle`

**Identify duplication opportunities:**
Before adding new CSS, check if similar styles exist. Propose refactoring when you see repeated patterns:
> "I notice 3 different stat number styles—should we unify these under a `.stat-display` utility class?"

**Example of good component reuse:**
```css
/* Base card pattern - reused across service, project, and client cards */
.card-base {
    background: var(--white);
    border-radius: 20px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-smooth);
}

.card-base:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
```

---

### 3. Visual Hierarchy & Spacing System

**Test spacing decisions mathematically:**
- Create visual balance: TOP:BOTTOM ratios should be 1:1 or 2:1 maximum
- Use spacing test documents (like `spacing-test.html`) to verify symmetry
- Document cumulative spacing in comments

**Spacing breakdown example:**
```css
.trust-section {
    padding: 60px 0 40px; /* Top: 60px, Bottom: 40px */
}

.section-divider {
    height: 30px; /* Subtle breathing room */
}

.services {
    padding: 50px 0 120px; /* Top: 50px (reduced for balance) */
}

/* Total from Trust badges → "OUR EXPERTISE": 120px (40 + 30 + 50) */
/* Total from "OUR EXPERTISE" → Service Cards: 60px */
/* Ratio: 2:1 - Visually balanced */
```

**Measure optical balance, not just mathematical equality:**
- Account for visual weight of content (large headlines need more breathing room)
- Test with visual measurement tools or create test HTML pages
- Compare spacing from multiple directions (top-down vs bottom-up)

---

### 4. Micro-Interactions Philosophy

**Acknowledge, don't perform:**
Interactions should validate user intent, not distract.

✅ **Good:**
```css
.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
```

❌ **Bad:**
```css
.card:hover {
    transform: translateY(-10px) rotate(2deg) scale(1.05);
    /* Too aggressive - distracts from content */
}
```

**Industry-appropriate motion:**
- **Environmental/engineering = stable, confident, precise**
- Avoid bouncy easing: No `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- Use `ease` or `cubic-bezier(0.4, 0, 0.2, 1)` only
- Maximum lift distance: `4px` for cards
- No 3D tilt effects or mousemove tracking
- No rotation on hover (except minimal icon animations)

**Hover state standards:**
```css
/* Trust badges, service cards, project cards */
:hover {
    transform: translateY(-4px); /* Consistent 4px lift */
    box-shadow: var(--shadow-lg); /* Consistent shadow */
}

/* Icons can scale subtly */
.icon:hover {
    transform: scale(1.05); /* 5% scale max */
}
```

---

### 5. Content-First Data Presentation

**Every statistic must tell a story:**
- ❌ Don't: "500+"
- ✅ Do: "500+ Projects Completed"

**Add impact metrics to prove results:**
```html
<div class="service-stat">
    <span class="stat-highlight">147+</span>
    <span class="stat-text">Sites Remediated</span>
</div>

<div class="project-impact">
    <div class="impact-metric">
        <span class="impact-value">40%</span>
        <span class="impact-label">Cost Reduction</span>
    </div>
</div>
```

**Progressive disclosure:**
1. **Hero stats** → Initial credibility (18+ years, 500+ projects, 30+ professionals)
2. **Service stats** → Specific capability proof (147+ sites, 500+ wetlands, $15M bonding)
3. **Track Record** → Historical journey + aggregate impact
4. **Project impact** → Detailed results per project

Each layer builds credibility without repetition.

---

### 6. Accessibility & Standards

**WCAG 2.1 AA minimum:**
- Color contrast ratios: 4.5:1 for body text, 3:1 for large text
- All interactive elements keyboard navigable
- Semantic HTML (proper heading hierarchy: h1 → h2 → h3)
- ARIA labels on icon buttons: `<button aria-label="Toggle menu">`

**Performance budgets:**
- Keep page weight under 3MB total
- Lazy load images (when added)
- Minimize JavaScript animations (prefer CSS)
- Remove `contain: layout` if it clips shadows or visual effects

**Current accessibility wins:**
```html
<!-- Semantic structure -->
<section class="services" id="services">
    <div class="section-header">
        <span class="section-label">Our Expertise</span>
        <h2 class="section-title">Comprehensive Environmental Solutions</h2>
        <p class="section-subtitle">Four core service areas...</p>
    </div>
</section>

<!-- Proper button labels -->
<button class="mobile-menu-toggle" aria-label="Toggle menu">
```

---

### 7. Responsive Design Strategy

**Breakpoints match user needs:**
```css
@media (max-width: 900px) {
    /* Hamburger menu (tablets/small laptops) */
}

@media (max-width: 768px) {
    /* Single-column layouts, reduced spacing */
}

@media (max-width: 480px) {
    /* Mobile-first typography, stacked elements */
}
```

**Test at these specific widths:**
- 1920px (desktop monitors)
- 1366px (laptop standard)
- 900px (tablet landscape)
- 768px (tablet portrait)
- 375px (mobile)

**Responsive spacing adjustments:**
```css
:root {
    --section-padding: 120px; /* Desktop */
}

@media (max-width: 900px) {
    :root {
        --section-padding: 80px; /* Tablet */
    }
}

@media (max-width: 768px) {
    :root {
        --section-padding: 60px; /* Mobile */
    }
}
```

---

## Decision-Making Framework

**When proposing changes, always explain:**

1. **What** you're changing
2. **Why** it improves the user experience or maintainability
3. **How** it aligns with the existing codebase patterns
4. **Trade-offs** (if any)

**Example:**
> "I'm reducing the service card hover lift from 10px to 4px because:
> - **What:** Changes `translateY(-10px)` to `translateY(-4px)`
> - **Why:** Aggressive movement distracts from content; subtle acknowledgment maintains professionalism
> - **How:** Matches the pattern we established for trust badges (3px) and project cards (4px)
> - **Trade-off:** Less dramatic feedback, but more appropriate for B2B/government audience who value stability over flashiness"

---

## Quality Checklist Before Committing Code

- [ ] **Spacing tested visually:** Created measurement document or verified with browser inspector
- [ ] **Hover states consistent:** All cards lift same distance (4px), same shadow level
- [ ] **Tokens used:** No hard-coded colors or spacing (except one-offs justified in comments)
- [ ] **Pattern matched:** Follows existing naming conventions and component structure
- [ ] **Mobile tested:** Checked at 375px, 768px, 900px breakpoints
- [ ] **Performance verified:** No unnecessary `contain` or `will-change` properties causing issues
- [ ] **Accessibility maintained:** Keyboard navigation works, contrast ratios pass WCAG
- [ ] **Shadows not clipped:** Removed `contain: layout` if shadows are being cut off
- [ ] **No aggressive animations:** No rotation, 3D tilt, or excessive scaling

---

## Industry-Specific Considerations

### Environmental Remediation Context

**Trust is earned gradually:**
Design should support progressive credibility building through the user journey.

**Data transparency matters:**
Show real metrics, not vague claims. Every number should be verifiable and meaningful.

**Regulatory compliance aesthetic:**
Professional, stable, not trendy. Federal agencies and Fortune 500 companies are risk-averse.

**Target Audience:**
- Federal agencies (U.S. Navy, Army Corps of Engineers)
- State/local governments (CalTrans, California High Speed Rail)
- Fortune 500 utilities (Southern California Edison, SoCal Gas)
- Conservative, detail-oriented decision-makers

### Visual Language

**Color palette:**
- **Primary Green (#8ec63f):** Growth, restoration, environmental success
- **Primary Blue (#0760ad):** Trust, water, professionalism
- **Earth tones (sparingly):** Browns for soil, grays for infrastructure

**Industry motifs (subtle):**
- Topographic patterns in dividers
- Molecular structures as background textures (future enhancement)
- Gradient transitions between sections (current: 30px subtle dividers)

**Photography guidelines (when added):**
- ✅ Site photos, equipment, team at work
- ❌ Generic stock imagery
- ✅ Before/after remediation shots
- ❌ Overly polished marketing photos

---

## Common Patterns Reference

### Section Structure
```html
<section class="[section-name]" id="[anchor]">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-label">Label Text</span>
            <h2 class="section-title">Main Title</h2>
            <p class="section-subtitle">Supporting description</p>
        </div>
        <!-- Section content -->
    </div>
</section>
```

### Card Pattern
```html
<div class="[card-type]" data-aos="fade-up">
    <div class="[card-type]-inner">
        <div class="[card-type]-icon">
            <!-- SVG icon -->
        </div>
        <h3 class="[card-type]-title">Title</h3>
        <div class="service-stat">
            <span class="stat-highlight">147+</span>
            <span class="stat-text">Sites Remediated</span>
        </div>
        <p class="[card-type]-description">Description</p>
    </div>
</div>
```

### Stat Display Pattern
```html
<div class="stat">
    <span class="stat-number">500+</span>
    <span class="stat-label">Projects Completed</span>
</div>
```

---

## Naming Conventions

**Follow BEM-like structure:**
- Block: `.service-card`
- Element: `.service-card-inner`
- Modifier: `.service-card--featured`

**Semantic class names:**
- ✅ `.trust-section` (describes purpose)
- ❌ `.green-section` (describes appearance)

**Consistent prefixes:**
- Sections: `.services`, `.company`, `.projects`, `.clients`, `.contact`
- Headers: `.section-header`, `.section-label`, `.section-title`, `.section-subtitle`
- Stats: `.stat-number`, `.stat-label`, `.stat-highlight`
- Cards: `.service-card`, `.project-card`, `.badge`

---

## Lessons Learned

### Spacing Symmetry
**Problem:** White space above section headers looked unbalanced.
**Solution:** Created `spacing-test.html` to measure cumulative spacing. Adjusted to 2:1 ratio (top:bottom).

### Micro-Interactions
**Problem:** Cards were rotating, tilting, and scaling aggressively.
**Solution:** Removed 3D tilt JavaScript, reduced hover lift to 4px, eliminated rotation.

### Shadow Clipping
**Problem:** Card shadows were being cut off at bottom of containers.
**Solution:** Removed `contain: layout` from `.trust-badges` and added `padding-bottom: 20px`.

### Services Dropdown
**Problem:** White bar appearing under navigation (dropdown menu showing).
**Solution:** Removed dropdown entirely—Services is now a direct anchor link like other nav items.

### Hero Gap
**Problem:** White gap between navbar and hero video.
**Solution:** Removed `padding-top: 80px` from `.hero` since navbar is fixed and floats over content.

---

## File Organization

```
/
├── index.html              # Main site
├── styles.css              # All styles
├── script.js               # Interactions
├── careers.html            # Careers page
├── careers.css             # Careers styles
├── careers.js              # Careers interactions
├── design-guidelines.md    # This file
├── NETLIFY-CMS-SETUP.md    # CMS instructions
├── README.md               # Project overview
├── noreas-logo.svg         # Brand logo
├── outher-1080p.mp4        # Hero video (desktop)
├── outher-720p.mp4         # Hero video (mobile)
├── admin/                  # Netlify CMS
│   ├── config.yml
│   └── index.html
├── content/                # CMS content (markdown)
│   ├── projects/
│   ├── services/
│   └── clients/
├── docs/                   # Documentation
│   ├── planning/           # Original planning docs
│   └── reviews/            # Performance & technical reviews
└── Images/                 # Project images
```

**Future considerations:**
- Split CSS into modules: `base.css`, `components.css`, `sections.css`
- Create `/assets` folder structure for organized media
- Add component library documentation

---

## Version History

**v1.0 - Initial Guidelines (2026-01-18)**
- Established design philosophy and brand alignment
- Defined spacing system and visual balance testing
- Documented micro-interaction standards
- Created industry-specific considerations
- Added quality checklist and decision framework

---

## How to Use This Document

1. **Before starting any feature:** Read the relevant section
2. **During development:** Reference the quality checklist
3. **Before committing:** Run through the decision-making framework
4. **After completion:** Document any new patterns or lessons learned

**This is a living document.** Update it when you discover new patterns, make architectural decisions, or learn lessons that should inform future work.

---

*Last updated: January 18, 2026*
*Project: NOREAS Inc. Environmental Services Website*
*Maintained by: Development Team*
