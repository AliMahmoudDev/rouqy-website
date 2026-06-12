# Code Standards

## General
- Keep components small and single-purpose.
- Prioritize loading speed and SEO.
- Mobile-first responsive design.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (for subtle scroll animations ONLY if requested)

## Next.js Rules
- Default to Server Components.
- Use 'use client' ONLY for interactive parts (Mobile menu, Forms, Animations).
- Optimize images using Next.js `<Image />` component.

## Styling
- STRICTLY USE CSS custom properties defined in ui-context.md. NO hardcoded hex values in components.
- Use Tailwind logical properties for spacing where possible.

## Forms
- Validate inputs on the client and server.
- Show clear success/error states after submission.
