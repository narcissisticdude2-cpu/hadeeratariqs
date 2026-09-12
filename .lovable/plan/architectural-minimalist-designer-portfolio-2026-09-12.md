# Architectural Minimalist Designer Portfolio

## Overview
Build a single-page, dark editorial portfolio for a multidisciplinary interior and graphic designer. The experience will feel like a precise high-end studio presentation: restrained typography, generous space, image-led storytelling, and quiet motion.

## Visual direction
- Establish Deep Graphite, Mist White, and Ice Blue as semantic design tokens.
- Pair an editorial display serif with a geometric sans-serif, loaded through the document head.
- Use a strict responsive grid, minimal borders, sharp spacing rhythm, and subtle translucent navigation.
- Create a cohesive original image set for interiors, graphic systems, and the studio portrait so the portfolio feels authored rather than templated.

## Page structure
1. **Sticky studio navigation** — monogram/name, Work, Studio, Contact; transparent initially and frosted after scrolling.
2. **Full-height introduction** — oversized “Form, Space, and Visual Precision.” statement with restrained supporting copy and scroll cue.
3. **Dual entry** — two large side-by-side image gateways for Spatial Design and Visual Systems, stacked on mobile.
4. **Selected work** — filter tabs for all, spatial/interiors, and visual/graphic; a staggered image-led grid with wide interior projects and portrait/square graphic projects.
5. **Studio profile** — moody image and concise methodology-led biography in a split layout.
6. **Contact close** — screen-filling “Let’s Collaborate” statement, large email link, and social links.

## Interaction and responsive behavior
- Smooth internal scrolling and filter transitions.
- Slow image zoom and dark metadata reveal on cards; accessible metadata remains visible on touch layouts.
- A discreet back-to-top control appears after the opening section.
- A custom dot cursor expands over links and project cards on precise-pointer devices only.
- Respect reduced-motion preferences and preserve standard cursor/touch behavior elsewhere.
- Collapse the gallery and split layouts cleanly to one column on small screens.

## Technical details
- Implement as the home page with React and Tailwind CSS v4.
- Add page-specific title, description, Open Graph, and Twitter metadata.
- Keep palette, typography, shadows, and reusable motion in the central design system.
- Use lucide icons for navigation cues and controls.
- Verify the completed page at desktop and mobile sizes, including filtering, scrolling, card states, and overflow.
