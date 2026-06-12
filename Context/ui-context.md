# UI Context - HARMENS

## Theme & Vibe
**Dark Luxury Minimal** - تصميم داكن فاخر مينيمال بيعكس هوية شركة تصميم داخلي وهندسة معمارية عالمية. الإحساس لازم يكون Premium، راقي، مش قالب جاهز. الأنيميشن والـ 3D لازم يكونوا خفيفين وراقيين مش مبالغ فيهم.

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

## Typography
| Role      | Font              | Variable        | ملاحظات                     |
| --------- | ----------------- | --------------- | --------------------------- |
| Headings  | Inter / Geist     | `--font-heading` | Bold, Elegant, Clean        |
| Body text | Inter / Geist     | `--font-body`    | Regular weight              |

> **ملاحظة:** الخطوط المستخدمة في المشروع هي Geist Sans و Geist Mono (موجودة بالفعل في Next.js). لو العميل طلب خطوط تانية هنغيرها.

## Component Library
Use shadcn/ui on top of Tailwind. Keep it clean and luxury-focused.

## Layout Patterns
- **Hero:** Full screen (100vh), عنوان كبير HARMENS في النص، 3D objects floating في الخلفية، CTA button
- **Portfolio:** Grid layout مع صور كبيرة، hover effects احترافية، scroll animations
- **Contact:** Split layout (معلومات التواصل يمين + نموذج شمال) أو مركزي، 3D particles في الخلفية
- **General:** Smooth scrolling بين الأقسام، كل section بيبدأ بـ fade-in animation

## 3D Effects Guidelines
- **أشكال 3D:** مجردة ومعمارية (مكعبات، أشكال هندسية، خطوط)
- **حركة:** بطيئة وراقية (مش سريعة ولا مبالغ فيها)
- **ألوان الـ 3D:** نغمات من الـ Dark Navy والـ Light Blue مع شفافية
- **التوزيع:** 3D objects في الـ background مش بتغطي على المحتوى
- **Consistency:** نفس الـ vibe بتاع الـ 3D في الثلاث أقسام - continuous feel

## Icons & Graphics
- Lucide React للأيقونات
- صور placeholders من Unsplash (عمارة / تصميم داخلي) لحد ما العميل يبعث الصور الحقيقية
- اللوجو: logo.png / tran-04.png

## Animation Guidelines
- **Scroll Animations:** Elements تظهر تدريجياً عند التمرير (fade-in, slide-up, scale)
- **3D Animations:** أشكال تدور ببطء وتتحرك (floating effect)
- **Smooth Scrolling:** CSS scroll-behavior: smooth
- **Hover Effects:** Scale خفيف + glow على الصور والكروت
- **Duration:** Animations بين 0.5-1.5 ثانية (مش أبطأ ولا أسرع)
