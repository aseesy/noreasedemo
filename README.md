# NOREAS Inc. Website

Professional engineering and environmental services website built with modern web technologies.

**Live Site:** https://noreasedemo.netlify.app

---

## For Content Editors

### Edit Content (WordPress-like CMS)

**Admin Panel:** https://noreasedemo.netlify.app/admin

The Netlify CMS provides a familiar WordPress-like interface for managing:
- Projects
- Services
- Clients
- Careers
- Page content

**[→ View CMS Setup Guide](./NETLIFY-CMS-SETUP.md)**

---

## For Developers

### Quick Start

This is a vanilla HTML/CSS/JavaScript project. No build process required.

```bash
# Clone the repository
git clone https://github.com/aseesy/noreasedemo.git

# Open index.html in your browser
open index.html
```

### Project Structure

```
/
├── index.html              # Main site
├── styles.css              # All styles
├── script.js               # Interactions
├── careers.html            # Careers page
├── careers.css             # Careers styles
├── careers.js              # Careers interactions
├── admin/                  # Netlify CMS
│   ├── config.yml
│   └── index.html
├── content/                # CMS content (markdown)
│   ├── projects/
│   ├── services/
│   └── clients/
├── Images/                 # Project images
├── noreas-logo.svg         # Brand logo
├── outher-1080p.mp4        # Hero video (desktop)
└── outher-720p.mp4         # Hero video (mobile)
```

### Key Documentation

- **[Design Guidelines](./design-guidelines.md)** - Design system, spacing, components
- **[Repository Structure](./docs/STRUCTURE.md)** - File organization and maintenance guide
- **[CMS Setup](./NETLIFY-CMS-SETUP.md)** - Content management instructions
- **[Project Reviews](./docs/reviews/)** - Performance audits and technical reviews
- **[Planning Docs](./docs/planning/)** - Original project planning documents

### Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript
- **CMS:** Netlify CMS (Git-based)
- **Hosting:** Netlify (auto-deploys from `main` branch)
- **Fonts:** Inter & Poppins (Google Fonts)

### Deployment

Commits to `main` branch automatically deploy to Netlify.

```bash
git add .
git commit -m "Your message"
git push origin main
```

Changes are live in ~30 seconds.

---

## Design Philosophy

- **Professional & trustworthy** - B2B/government audience
- **Content-first** - Every element serves a purpose
- **Performance-focused** - Fast load times, minimal dependencies
- **Accessible** - WCAG 2.1 AA compliant

See [design-guidelines.md](./design-guidelines.md) for detailed standards.

---

## Support

- **Content questions:** See [NETLIFY-CMS-SETUP.md](./NETLIFY-CMS-SETUP.md)
- **Technical issues:** Check [docs/reviews/](./docs/reviews/)
- **Design decisions:** Reference [design-guidelines.md](./design-guidelines.md)

---

*Last updated: January 19, 2026*
