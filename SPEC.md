# Portfolio Website Specification

## 1. Project overview

Build a personal portfolio website for **Ilhaan Paurobally**, a third-year Computer Science student at York University, seeking Software Engineering and Product Engineering internship opportunities.

The portfolio should communicate that Ilhaan can build and ship practical applications, is curious and eager to learn, and is approachable and interested in useful products. This is a portfolio, not a résumé replacement. Do not invent metrics, users, outcomes, responsibilities, or accomplishments.

## 2. Audience and positioning

**Audience:** recruiters, hiring managers, and engineering teams reviewing internship candidates.

**Positioning:** an ambitious, approachable Computer Science student who enjoys building applications, solving problems, and exploring technology. Use accurate student-level language; do not present Ilhaan as a professional or senior engineer.

## 3. Visual direction

Use the approved reference screenshot as the primary visual reference: warm cream page, top navigation, large "I'm Ilhaan." hero, Claude Code-style terminal showing `/run soccer.py`, project and hackathon lists, labeled skill icons, and full-width soccer photograph.

- Minimal, polished, editorial, with subtle developer personality.
- Warm off-white/cream background, not pure white.
- Dark navy/charcoal primary text; muted blue accent, especially for "Ilhaan."
- Thin, low-contrast divider lines and generous purposeful whitespace.
- Sans-serif headings/body; monospace for code, section indices, and technical metadata.
- Light theme only. No dark-mode toggle.
- Avoid generic SaaS dashboard styling, oversized cards, excessive gradients, loud colours, unnecessary animation, or decorative clutter.

## 4. Page structure and navigation

One continuous vertically scrolling homepage with smooth in-page navigation. Section order:

1. Home
2. Projects
3. Hackathons
4. Skills
5. About

### Top navigation

- Left: circular "IP" initials mark, followed by `cs @ YorkU`.
- Middle: Home, Projects, Hackathons, Skills, About.
- Right: GitHub icon, LinkedIn icon, divider, and `Resume ↗`.
- No Contact navigation item and no dark-mode control.
- Keep navigation at the top without letting it dominate; clearly indicate the active section.
- Navigation items scroll to their corresponding sections.

Links:
- GitHub: https://github.com/ilhaanp
- LinkedIn: https://www.linkedin.com/in/ilhaanp/
- Resume: `public/assets/ilhaan_resume.pdf`

## 5. Home / hero

Desktop hero: two-column composition, introduction on the left and compact terminal illustration in the upper-right.

### Left side

Show the monospace line:
`printf("Hello, World!");`
A subtle blinking cursor is optional.

Main heading:
- `I’m`
- `Ilhaan.`

Use large bold sans-serif typography. "Ilhaan." uses the muted blue accent; "I'm" uses dark text.

Introductory copy:
> Computer Science student at York University.
> I enjoy building applications, solving problems,
> and exploring new technologies.

Do not add "Hey" before the heading; the `printf` line already provides the greeting.

### Right side: terminal illustration

Recreate the terminal in the approved reference:
- Compact floating Claude Code-inspired terminal window.
- Warm translucent/light surface, subtle border, rounded corners, soft shadow.
- Three small red, yellow, and green window-control dots.
- Header label: `>_ claude code`.
- Prompt: `> /run soccer.py`
- Monospace ASCII-style illustration of a stick figure playing soccer, a ball, and a goal.
- Completion line with green check icon and `Done. Great shot!`
- A faint oversized circular background shape and small star/crosshair accent behind it.

## 6. Projects

Section label: `02 / PROJECTS`
Heading: `Selected Projects.`

Use a simple horizontal list, not a card grid. Each row has a landscape screenshot thumbnail on the left; project name, short description, and compact monospace technology line to the right; and a small external-link arrow at the far right. Use subtle dividers.

### AI Car Buying Assistant
Description: "A conversational tool for first-time car buyers."
Technologies: Next.js · TypeScript · OpenAI
Live demo: https://ai-car-buying-assistant.vercel.app/chat

### Pantry Tracker
Description: "A simple way to manage groceries and pantry inventory."
Technologies: Next.js · Firebase · MUI
Live demo: https://pantry-tracker-green-seven.vercel.app/

## 7. Hackathons

Section label: `03 / HACKATHONS`
Heading: `Hackathons.`

Use the same vertical-list language as Projects, while clearly identifying these as team/hackathon projects rather than independent personal projects.

### Anti-Inflation Hackathon
Description: "A team project focused on tackling rising costs through innovative solutions."
Technologies: React · Firebase · Team Project
Live demo: https://anti-inflation-adhq.vercel.app/

### UmmahHacks: DeenCal
Description: "A faith-based calendar for the Muslim community."
Technologies: Next.js · Firebase · Team Project
Live demo: https://cozy-unicorn-223557.netlify.app/

## 8. Skills

Section label: `04 / SKILLS`
Heading: `Tools I work with.`

Compact horizontal row of recognizable technology logos/icons with labels underneath. Subtle vertical dividers between items.
- JavaScript
- TypeScript
- Python
- Java
- React
- Git
- Linux

## 9. About

Section label: `05 / ABOUT`
Heading over image: `A little about me.`

### Image treatment
- Use Ilhaan's actual soccer photograph: `public/assets/2019_08_03_0855.jpg`
- Wide, full-bleed editorial section spanning the page width.
- Overlay section label and heading in readable white text, positioned toward the left.
- Subtle dark overlay/gradient for contrast.

### Text below photograph
Place this copy directly below the image on the cream background:
> When I'm not coding, you'll usually find me playing soccer, following the Champions League, or keeping up with cars.
>
> I'm always looking to learn, build, and be part of something meaningful.

## 10. Responsive behaviour & Technical constraints
- Plain HTML, CSS, JavaScript in `public/`.
- No frameworks or npm dependencies.
- Mobile-first responsive design.
- Accessible focus outlines and semantic markup.
