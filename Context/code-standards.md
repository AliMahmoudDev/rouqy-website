# Code Standards - HARMENS

## General
- Keep components small and single-purpose.
- Prioritize loading speed and SEO.
- Mobile-first responsive design.
- **لا تضيف أي أقسام مش موجودة في project-overview.md** - 3 أقسام فقط!

## Tech Stack
- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Three.js + React Three Fiber** (للـ 3D Effects)
- **@react-three/drei** (Float, MeshDistortMaterial, MeshWobbleMaterial)
- **Framer Motion** (للـ Scroll Animations + Text Reveals)

## Next.js Rules
- Default to Server Components.
- Use `'use client'` ONLY for:
  - 3D Scene components (Scene3D.tsx)
  - Animation wrapper components
  - Contact form
  - Any component with useState/useEffect
- Optimize images using Next.js `<Image />` component.
- **لا تضيف routes تانية** - الصفحة الرئيسية `/` بس.
- API route للنموذج تواصل: `/api/contact/route.ts`

## Styling Rules
- **STRICTLY USE CSS custom properties** المعرفة في ui-context.md.
- استخدم Tailwind classes مع CSS variables.
- الألوان الأساسية:
  - Background: `#161E2D` (Dark Navy)
  - Accent: `#25A2DC` (Light Blue)
  - Text: `#FFFFFF` / `#A0AEC0`
- **لا hardcoded hex values** في الـ components - استخدم CSS variables أو Tailwind classes

## 3D Code Standards (مستوحى من steven.com + aircenter)
- الـ 3D Canvas لازم يكون `position: absolute` في الخلفية مش بيغطي على المحتوى.
- استخدم `Float` من Drei للأشكال العائمة.
- استخدم `MeshDistortMaterial` أو `MeshWobbleMaterial` للأشكال المتشوهة الراقية.
- الأشكال لازم تكون بطيئة وراقية (speed values منخفضة 0.2-0.6).
- **Performance:** limit عدد الـ meshes (10-15 max)، استخدم instancing لو لازم.
- ألوان الـ 3D: نسخ من ألوان الموقع + emissive glow
- **3D scene واحدة** بس تغطي الصفحة كلها (مش canvas لكل قسم)

## Animation Standards (مستوحى من المراجع)
- استخدم Framer Motion للـ scroll animations.
- `whileInView` للعناصر اللي بتظهر عند التمرير.
- `viewport={{ once: true }}` عشان الأنيميشن يتم مرة واحدة بس.
- **Per-character text reveal** في الهيرو:
  - Split text into chars
  - Stagger animation: 0.03s delay per char
  - Fade-up + opacity
- Duration: 0.5 - 1.5 ثانية.
- Easing: ease-out أو [0.65, 0.05, 0, 1] (زي steven.com).

## Forms
- نموذج التواصل: اسم + ايميل + رسالة
- Validate inputs على client و server.
- Show clear success/error states.
- زر الإرسال باللون الأزرق #25A2DC.
- Minimal floating labels أو clean inputs

## File Structure
```
src/
  app/
    page.tsx              -- الصفحة الرئيسية (server component)
    layout.tsx            -- الـ layout
    globals.css           -- CSS variables + global styles
    api/
      contact/route.ts    -- API للنموذج تواصل
  components/
    Scene3D.tsx           -- 3D scene component (client)
    HeroSection.tsx       -- Hero section (client - has animations)
    PortfolioSection.tsx  -- Portfolio section (client - has animations)
    ContactSection.tsx    -- Contact section (client - has form)
    AnimatedText.tsx      -- Per-character text reveal (client)
    ui/                   -- shadcn/ui components
  Context/                -- ملفات المشروع والتخطيط
```

## Performance Targets
- **Lighthouse Performance:** > 90
- **First Contentful Paint:** < 2s
- **3D Scene:** Lazy loaded (لا تحميل في SSR)
- **Images:** Next.js Image optimization + lazy loading
- **Fonts:** Preloaded via next/font

## Key Reference Techniques to Implement
| التقنية | المصدر | Implementation |
|---------|--------|---------------|
| 3D WebGL Hero | steven + aircenter | Three.js canvas in hero bg |
| Floating Objects | aircenter + pacome | Float from Drei + slow rotation |
| Per-char Reveal | steven.com | Framer Motion stagger |
| Smooth Scroll | steven (Lenis) | CSS smooth or lenis |
| Scroll Reveal | All refs | Framer Motion whileInView |
| Parallax | aircenter | CSS or Framer useScroll |
| Large Image Grid | septiembre + ulysses | Asymmetric grid + big images |
| Scroll Indicator | aircenter | Arrow/circle animation |
