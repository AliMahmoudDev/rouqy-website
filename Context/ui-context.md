# UI Context - HARMENS

## Theme & Vibe
**Dark Luxury Minimal** - تصميم داكن فاخر مينيمال بيعكس هوية شركة تصميم داخلي وهندسة معمارية عالمية.

**الإحساس المطلوب:** لما الزائر يفتح الموقع يحس إنه دخل معرض فن أو showroom فاخر - مش موقع عادي. الإحساس لازم يكون زي مواقع المراجع: سينمائي، راقي، مبهور.

**الكلمات المفتاحية:** Cinematic, Architectural, Premium, Restrained, Confident

## Colors (CSS Custom Properties)
| Role            | CSS Variable       | Value       | ملاحظات                          |
| --------------- | ------------------ | ----------- | -------------------------------- |
| Page background | `--bg-base`        | `#161E2D`   | Dark Navy - اللون الأساسي        |
| Surface         | `--bg-surface`     | `#1C2738`   | أفتح شوية من الباكجراوند         |
| Primary text    | `--text-primary`   | `#FFFFFF`   | أبيض                             |
| Muted text      | `--text-muted`     | `#A0AEC0`   | Light Gray                       |
| Primary accent  | `--accent-primary` | `#25A2DC`   | Light Blue - الأزرق الأساسي      |
| Accent Hover    | `--accent-hover`   | `#1B8BBE`   | أغمق شوية عند الـ hover          |
| Border          | `--border-default` | `#2D3A4D`   | حدود خفيفة                       |
| Card BG         | `--bg-card`        | `#1A2535`   | خلفية الكروت                     |

### قاعدة الألوان (مستوحاة من المراجع):
- **2-3 ألوان بس** - كل المراجع بتستخدم ألوان محدودة جداً
- Dark Navy هو البطل + Light Blue للأكسنت + White للنص
- لا gradients معقدة - بس subtle gradients خفيفة
- الـ 3D objects تستخدم نفس الألوان مع شفافية

## Typography
| Role      | Font              | Variable        | Size (Desktop) | ملاحظات                     |
| --------- | ----------------- | --------------- | -------------- | --------------------------- |
| Hero Title| Geist Sans        | `--font-heading` | 80-120px       | Uppercase, bold, tight tracking |
| Subtitle  | Geist Sans        | `--font-body`    | 18-24px        | Light weight, wide tracking |
| Body text | Geist Sans        | `--font-body`    | 16px           | Regular weight              |

### قواعد التيبوجرافي (مستوحاة من المراجع):
- **Hero Title ضخم** - كل المراجع بتستخدم خطوط 80-150px
- **مكونلبوز بعناية** - النص متظبط مع line breaks يدوية مش عشوائي
- **Per-character animation** - النص بيظهر حرف حرف (زي steven.com)
- **Uppercase** للعناوين الكبيرة
- **Tight letter-spacing** للعناوين الكبيرة (negative tracking)
- **Generous line-height** للمقروئية

## Component Library
Use shadcn/ui on top of Tailwind. Keep it clean and luxury-focused.
- Button component للـ CTA
- Input/Textarea للنموذج تواصل
- لا كروت كتير - التصميم مينيمال

## Layout Patterns

### Hero Section (مستوحى من aircenter + steven + ulysses)
- **Full viewport** (100vh)
- **3D canvas** في الخلفية (position: absolute, z-0)
- **محتوى في النص** (position: relative, z-10)
- عنوان HARMENS ضخم في المنتصف
- Subtitle تحته
- CTA button
- Scroll indicator في الأسفل
- **Gradient overlay** من الأسفل للسموث ترانزيشن

### Portfolio Section (مستوحى من septiembre + ulysses)
- **Grid غير متماثل** (مش 3 أعمدة متساوية)
- صور كبيرة بأحجام مختلفة (span 2 columns لبعضها)
- **Hover overlay** شفاف مع اسم المشروع
- **Scroll reveal** لكل صورة
- **3D particles** خفيفة في الخلفية

### Contact Section
- تصميم مركزي أو split
- نموذج أنيق مع minimal inputs
- **Instagram فقط** كوسيلة تواصل - زر بارز وأنيق يودي على @harmens.design
- **3D background** مستمرة
- Footer بسيط مع Instagram link فقط

## 3D Effects Guidelines (مستوحى من steven + aircenter + pacome)

### نوع الـ 3D:
- **أشكال معمارية مجردة** (مكعبات، كرات، طورس، أوتاهيدرون)
- **Floating effect** - أشكال عائمة بتتحرك ببطء
- **Distort material** - أشكال متشوهة شوية (عضوية مش هندسية بحتة)
- **Wireframe** خفيف على بعض الأشكال

### ألوان الـ 3D:
- نسخ من ألوان الموقع: Dark Navy شفاف + Light Blue متوهج
- **Emissive glow** على الأشكال (خليها تلمع شوية)
- **Transparent** عشان متغطيش على المحتوى

### حركة الـ 3D:
- **بطيئة وراقية** - سرعات منخفضة (0.2-0.6)
- **Float** من Drei - حركة عائمة
- **Rotate** ببطء
- **لا حركات مفاجئة** - كل حاجة سلسة

### التوزيع بين الأقسام:
- **Hero:** أشكال كبيرة واضحة (main 3D scene)
- **Portfolio:** particles خفيفة أو أشكال صغيرة في الخلفية
- **Contact:** continuation من الـ particles + شكل أو اتنين

### Performance:
- Limit الـ meshes (10-15 كحد أقصى)
- استخدم `Float` من Drei
- استخدم `MeshDistortMaterial` للتشوه الراقي
- Particle count: 100-200 كحد أقصى

## Animation Guidelines (مستوحى من كل المراجع)

### Scroll Animations:
- **Fade-in + Slide-up** للعناصر عند التمرير
- **Stagger** بين العناصر المتجاورة
- **whileInView** من Framer Motion
- **once: true** - الأنيميشن يتم مرة واحدة بس

### 3D Animations:
- **Float** - أشكال عائمة
- **Rotate** - دوران بطيء
- **Distort** - تشوه متدرج

### Hover Effects:
- **Scale 1.02-1.05** على الصور
- **Overlay appear** شفاف
- **Glow effect** على الأزرار

### Text Animations:
- **Per-character reveal** في الهيرو (زي steven.com)
- **Fade-up stagger** في باقي الأقسام

### Duration:
- Scroll animations: 0.5-1s
- 3D rotations: continuous بطيء
- Hover: 0.3s
- Text reveal: 0.5s per char + stagger 0.03s

## Icons & Graphics
- Lucide React للأيقونات
- صور placeholders من Unsplash (عمارة / تصميم داخلي)
- اللوجو: logo.png / tran-04.png

## Spacing (مستوحى من المراجع)
- **Section padding:** py-24 to py-32 (96-128px)
- **Between sections:** generous spacing
- **Content max-width:** max-w-6xl to max-w-7xl
- **Hero:** full viewport height
