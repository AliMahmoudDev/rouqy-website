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
- **Framer Motion** (للـ Scroll Animations)
- **Drei** (Three.js helpers - Float, MeshDistortMaterial, etc.)

## Next.js Rules
- Default to Server Components.
- Use `'use client'` ONLY for:
  - 3D Scene components
  - Animation components
  - Contact form
  - Mobile menu (لو فيه)
- Optimize images using Next.js `<Image />` component.
- **لا تضيف routes تانية** - الصفحة الرئيسية `/` بس.

## Styling Rules
- **STRICTLY USE CSS custom properties** المعرفة في ui-context.md. NO hardcoded hex values in components.
- استخدم Tailwind classes مع CSS variables.
- الألوان الأساسية:
  - Background: `#161E2D` (Dark Navy)
  - Accent: `#25A2DC` (Light Blue)
  - Text: `#FFFFFF` / `#A0AEC0`

## 3D Code Standards
- الـ 3D Canvas لازم يكون `position: absolute` في الخلفية مش بيغطي على المحتوى.
- استخدم `Float` من Drei للأشكال العائمة.
- استخدم `MeshDistortMaterial` أو `MeshWobbleMaterial` للأشكال المتشوهة الراقية.
- الأشكال لازم تكون بطيئة وراقية (speed values منخفضة).
- **Performance:** limit عدد الـ meshes، استخدم instancing لو لازم.

## Animation Standards
- استخدم Framer Motion للـ scroll animations.
- `whileInView` للعناصر اللي بتظهر عند التمرير.
- `viewport={{ once: true }}` عشان الأنيميشن يتم مرة واحدة بس.
- Duration: 0.5 - 1.5 ثانية.
- Easing: ease-out أو spring.

## Forms
- نموذج التواصل: اسم + ايميل + رسالة
- Validate inputs على client و server.
- Show clear success/error states.
- زر الإرسال باللون الأزرق #25A2DC.

## File Structure
```
src/
  app/
    page.tsx          -- الصفحة الرئيسية
    layout.tsx        -- الـ layout
    globals.css       -- CSS variables + global styles
    api/
      contact/route.ts -- API للنموذج تواصل
  components/
    Scene3D.tsx       -- 3D scene component
    HeroSection.tsx   -- Hero section
    PortfolioSection.tsx -- Portfolio section
    ContactSection.tsx  -- Contact section
    ui/               -- shadcn/ui components
  Context/            -- ملفات المشروع والتخطيط
```
