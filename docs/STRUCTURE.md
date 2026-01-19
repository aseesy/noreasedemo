# Repository Structure Documentation

**Last Updated:** January 19, 2026

---

## Overview

This document explains the intentional organization of the NOREAS repository, providing guidelines for maintaining clarity and ensuring new contributors understand where files belong.

---

## Directory Structure

```
/
├── README.md                   # Entry point for all users
├── NETLIFY-CMS-SETUP.md        # WordPress transition guide
├── design-guidelines.md        # Design system & standards
├── .gitignore                  # Git exclusions
├── index.html                  # Main website
├── styles.css                  # All styles
├── script.js                   # Main interactions
├── careers.html                # Careers page
├── careers.css                 # Careers styles
├── careers.js                  # Careers interactions
├── noreas-logo.svg             # Brand logo
├── logo_Noreas.png             # Legacy logo (consider removing)
├── outher-1080p.mp4            # Hero video (desktop)
├── outher-720p.mp4             # Hero video (mobile)
│
├── admin/                      # Netlify CMS
│   ├── config.yml              # CMS configuration
│   └── index.html              # CMS interface
│
├── content/                    # CMS-managed content
│   ├── projects/               # Project markdown files
│   ├── services/               # Service markdown files
│   ├── clients/                # Client markdown files
│   ├── home.md                 # Home page content
│   └── company.md              # Company page content
│
├── docs/                       # Documentation
│   ├── STRUCTURE.md            # This file
│   ├── planning/               # Original planning documents
│   │   ├── 00-site-overview.md
│   │   ├── 01-home.md
│   │   ├── 02-company.md
│   │   ├── 03-services-environmental.md
│   │   ├── 04-services-natural-resources.md
│   │   ├── 05-services-consulting.md
│   │   ├── 06-services-design-build.md
│   │   ├── 07-featured-projects.md
│   │   ├── 08-clients.md
│   │   ├── 09-contact.md
│   │   └── 10-competitors.md
│   └── reviews/                # Technical reviews & audits
│       ├── PERFORMANCE-REVIEW.md
│       ├── PHASE-2-REPORT.md
│       ├── TECHNICAL-AUDIT.md
│       └── VIDEO-OPTIMIZATION-GUIDE.md
│
└── Images/                     # Project images & assets
    ├── project-*.jpg           # Project photos
    └── pic_*.jpg               # Section images
```

---

## Organization Principles

### Root Directory (Visible & Active)

**What belongs here:**
- Active documentation that users reference regularly
- Core website files (HTML, CSS, JS)
- Critical assets (logo, videos)

**What doesn't belong here:**
- Historical planning documents
- Technical reviews/audits
- Test files
- Temporary artifacts

**Current root files explained:**
- **README.md** - First file anyone sees; provides clear entry points
- **NETLIFY-CMS-SETUP.md** - Critical for WordPress users transitioning to CMS
- **design-guidelines.md** - Living document for developers; constantly referenced
- **index.html/styles.css/script.js** - Core website files
- **careers.*** - Standalone careers page (separate from main site)

### `/admin` - Netlify CMS

Contains only Netlify CMS configuration and interface files. Do not add custom admin tools here.

### `/content` - CMS Content

**Purpose:** Git-based storage for Netlify CMS managed content.

**What belongs here:**
- Markdown files created/edited through CMS
- Organized by content type (projects, services, clients)

**What doesn't belong here:**
- Static documentation
- Code files
- Planning documents

**Note:** These files are managed by the CMS. Manual edits should be rare.

### `/docs` - Documentation Archive

**Purpose:** Preserve historical context without cluttering the root.

#### `/docs/planning`
**Contains:** Original planning documents from project inception.

**Why separate:**
- Provides historical context
- Not actively referenced during development
- Useful for understanding original requirements
- Can be archived/removed later if no longer needed

#### `/docs/reviews`
**Contains:** Technical audits, performance reviews, optimization guides.

**Why separate:**
- Point-in-time snapshots (not living documents)
- Reference material, not active guidelines
- Useful for understanding past decisions
- Developers check occasionally, not constantly

**Difference from root docs:**
- Root docs = living, active, frequently referenced
- `/docs/reviews` = historical, archived, occasional reference

### `/Images` - Media Assets

**Contains:** Project photos, section images, visual assets.

**Future consideration:** Rename to `/assets` and organize by type:
```
/assets
├── images/
│   ├── projects/
│   └── sections/
├── videos/
└── icons/
```

---

## File Naming Conventions

### Documentation
- **UPPERCASE.md** - Important, standalone docs (README.md, NETLIFY-CMS-SETUP.md)
- **lowercase-with-dashes.md** - Supporting docs (design-guidelines.md)
- **Numbered planning docs** - Sequential order (00-site-overview.md, 01-home.md)

### Code Files
- **lowercase.html/css/js** - Standard web files
- **Multi-word with dashes** - If needed (currently not used)

### Assets
- **noreas-logo.svg** - Brand assets with product name
- **outher-720p.mp4** - Descriptive with size/variant
- **project-name.jpg** - Content images with category prefix

---

## Adding New Files - Decision Guide

### "Where should this file go?"

**Is it a new page or feature?**
- HTML/CSS/JS → Root directory
- Follow existing patterns (careers.html as reference)

**Is it documentation?**

→ **Will it be referenced frequently by developers or editors?**
  - Yes → Root directory (like design-guidelines.md)
  - No → `/docs` subdirectory

→ **Is it a point-in-time review/audit?**
  - Yes → `/docs/reviews`

→ **Is it planning/requirements?**
  - Yes → `/docs/planning`

→ **Is it explaining structure/organization?**
  - Yes → `/docs` (like this file)

**Is it content managed by CMS?**
- Yes → `/content` (but let CMS create it)

**Is it an image or media file?**
- Yes → `/Images` (for now)
- Future → `/assets/images/category/`

**Is it configuration?**
- Git → `.gitignore` (root)
- CMS → `/admin/config.yml`
- Netlify → Not in repo (Netlify dashboard)

---

## Maintenance Guidelines

### When to Move Files

**From root to `/docs`:**
- Documentation becomes historical/archived
- No longer actively referenced
- Superseded by newer docs

**From `/docs` to root:**
- Archived doc becomes active reference again
- Frequent lookups indicate it should be more visible

**Within `/docs`:**
- Planning doc becomes a review (planning → reviews)
- Review spawns ongoing guidelines (reviews → root)

### When to Delete Files

**Safe to delete:**
- Test artifacts (spacing-test.html)
- Outdated tool-specific configs (CURSOR_CONTEXT.md)
- Superseded documentation with no historical value
- Duplicate files (logo_Noreas.png if noreas-logo.svg exists)

**Archive instead of delete:**
- Planning documents (show original intent)
- Technical audits (explain past decisions)
- Performance reviews (track improvements over time)

### Regular Cleanup Schedule

**Monthly:**
- Check for test files in root
- Verify no temporary artifacts committed
- Review if recent reviews should move to `/docs/reviews`

**Quarterly:**
- Assess if `/docs/planning` is still needed
- Consolidate duplicate documentation
- Update this STRUCTURE.md if patterns change

---

## Special Files

### `.gitignore`
**Purpose:** Prevent committing local/sensitive files.

**Current exclusions:**
- `.netlify` - Local Netlify build folder
- `.env` - Environment variables (never commit!)
- `.DS_Store` - macOS file system metadata

**Add here:**
- Editor configs (`.vscode/`, `.idea/`)
- Build artifacts (if build process added)
- Local test files (`test-*.html`)

### `README.md`
**The most important file in the repository.**

**Serves three audiences:**
1. **Content Editors** - Quick link to CMS and setup guide
2. **Developers** - Tech stack, structure, deployment
3. **New Contributors** - What is this project?

**Keep updated when:**
- Tech stack changes
- Deployment process changes
- Key documentation moves
- Project structure shifts

---

## Audience-Specific Paths

### For Content Editors (Non-Technical)
1. **Start:** README.md
2. **Then:** NETLIFY-CMS-SETUP.md
3. **Then:** Admin panel at /admin

**They never need to see:**
- `/docs` folder
- design-guidelines.md
- Code files

### For Developers (Technical)
1. **Start:** README.md
2. **Reference:** design-guidelines.md (constantly)
3. **Occasionally:** `/docs/reviews` (understanding past decisions)
4. **Rarely:** `/docs/planning` (original requirements)

### For Project Managers
1. **Start:** README.md
2. **Then:** `/docs/planning` (original scope)
3. **Then:** `/docs/reviews` (progress tracking)

---

## Anti-Patterns to Avoid

### ❌ Don't Do This:

**Cluttering root directory:**
```
/
├── README.md
├── TODO.md                      ❌ Use GitHub Issues
├── NOTES.md                     ❌ Move to /docs or delete
├── test.html                    ❌ Delete after use
├── backup-styles.css            ❌ Use Git history instead
├── old-index.html               ❌ Delete, trust Git
└── random-experiment.js         ❌ Delete or move to /docs/experiments
```

**Creating unclear folders:**
```
/misc                            ❌ Too vague
/stuff                           ❌ Not descriptive
/old                             ❌ Use Git history
/backup                          ❌ Use Git history
/archive                         ❌ Use /docs or delete
```

**Duplicating documentation:**
```
README.md (overview)             ✓ Good
GETTING-STARTED.md (same info)   ❌ Merge into README
PROJECT-INFO.md (same info)      ❌ Merge into README
```

### ✅ Do This Instead:

**Keep root clean:**
```
/
├── README.md                    ✓ Clear entry point
├── design-guidelines.md         ✓ Active reference
├── NETLIFY-CMS-SETUP.md        ✓ User guide
└── index.html                   ✓ Core files only
```

**Use descriptive folders:**
```
/docs
├── planning/                    ✓ Clear purpose
└── reviews/                     ✓ Clear purpose
```

**Consolidate docs:**
```
README.md                        ✓ All overview info here
```

---

## Evolution & Changes

### Version History

**v1.0 (January 19, 2026)**
- Initial structure documentation
- Established `/docs/planning` and `/docs/reviews`
- Moved historical docs out of root
- Created clear root directory for active files

### Planned Changes

**Short term:**
- Evaluate removing `logo_Noreas.png` (duplicate of SVG)
- Consider moving videos to `/assets/videos/`

**Long term:**
- Create `/assets` folder for organized media
- Consider splitting CSS into modules if it grows beyond 5000 lines
- Add `/tests` folder if test suite is implemented

### How to Propose Structure Changes

1. **Document the reason** - Why is current structure inadequate?
2. **Show the impact** - How many files affected? Who benefits?
3. **Provide migration path** - How do we move from current to proposed?
4. **Update this doc** - Reflect changes here after implementation

---

## Questions & Decisions

### Why is `design-guidelines.md` in root, not `/docs`?

**Answer:** It's a living document referenced constantly during development. Developers need quick access. It's not historical/archived—it's actively maintained.

### Why keep `/docs/planning` if it's outdated?

**Answer:** Provides context for original requirements. Useful when questioned "Why was it built this way?" Can be deleted once project is fully mature and original context no longer needed.

### Should CMS config be in `/admin` or `/config`?

**Answer:** `/admin` because it's Netlify CMS convention. Keeps CMS-related files together (config.yml + index.html).

### When does a review move from root to `/docs/reviews`?

**Answer:** When its recommendations are fully implemented and it's no longer actively referenced. Example: TECHNICAL-AUDIT.md identified issues → issues fixed → audit moved to `/docs/reviews` as historical record.

---

## Summary

**Root Directory:** Active, visible, frequently referenced
**`/docs`:** Historical, contextual, occasional reference
**`/content`:** CMS-managed, automated
**`/admin`:** CMS interface, rarely touched manually
**`/Images`:** Media assets, growing over time

**Goal:** Anyone opening this repository should immediately understand:
1. What this project is (README.md)
2. How to use it (NETLIFY-CMS-SETUP.md for editors, design-guidelines.md for developers)
3. Where to find what they need (clear structure, minimal clutter)

---

*This document should be updated when structure changes or new patterns emerge.*
*Last updated: January 19, 2026*
