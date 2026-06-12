# HARMENS Landing Page - Project Overview

## Overview
**HARMENS** هي شركة تصميم داخلي وهندسة معمارية. المطلوب Landing Page احترافية واحدة فقط تعكس هوية بريميوم عالمية وتعطي انطباع شركة كبيرة وليس قالب جاهز.

## Client Info
- **اسم العميل:** Alaa M
- **اسم الشركة:** HARMENS
- **النشاط:** Interior Design & Architecture
- **الدومين:** harmensdesign.com
- **السوشيال ميديا:** Instagram فقط (بدون فيسبوك حالياً)
- **اللوجو:** متوفر (logo.png + tran-04.png) - موجود في `/upload/`

## The Core Problem & Solution
- **Problem:** الموقع الحالي قديم ومش بيعكس هوية البراند البريميوم. العميل عايز ريبراندينغ كامل يعطي انطباع شركة عالمية.
- **Solution:** Landing Page احترافية بـ 3D Effects + Animations + Smooth Scrolling بتصميم Dark Luxury Minimal يعكس جودة التصميم الداخلي المعماري.

## Conversion Goal
الهدف الأساسي: إبهار الزائر بـ Hero Section قوي، ثم عرض الأعمال بطريقة مبهرة، ثم التواصل عبر نموذج الاتصال.

## Landing Page Sections (3 أقسام فقط - لا تزد!)

### 1. Hero Section (الأهم - لازم يكون مبهر 🔥)
- اسم الشركة **HARMENS** بخط ضخم أنيق (مؤلف بعناية زى المراجع)
- **3D floating objects** في الخلفية (أشكال معمارية مجردة - مكعبات، كرات، طورس)
- **Video أو صورة خلفية** مع overlay داكن (زي aircenter / ulysses)
- Subtitle: "Interior Design & Architecture" بخط أنحف
- CTA Button: "View Our Work" بالأزرق #25A2DC
- **Scroll indicator** في الأسفل (سهم أو دائرة)
- **Per-character text reveal** عند التحميل (زي steven.com)
- **ده القسم اللي هيخلي العميل يكمل أو يطلع - لازم يكون Premium جداً**

### 2. Portfolio / Projects Gallery
- عرض المشاريع بـ **صور كبيرة** (العميل أكد على النقطة دي)
- **Grid غير متماثل** (مش 3 أعمدة متساوية - زي septiembre)
- **Hover effect**: صورة بتعمل scale خفيف + overlay شفاف + اسم المشروع
- **Scroll-triggered reveal**: كل صورة بتظهر بـ fade-in + slide-up
- **3D background مستمرة** من الهيرو (particles أو أشكال خفيفة)
- **Parallax خفيف** على الصور عند التمرير

### 3. Contact / CTA Section
- نموذج تواصل (اسم - ايميل - رسالة)
- زر إرسال باللون الأزرق (#25A2DC)
- بيانات التواصل + لينك Instagram
- **3D particles/effects** في الخلفية (continuous من الهيرو)
- **Scroll animation** على النموذج والعناصر

## Reference Websites Analysis

### المراجع اللي العميل بعتها:
1. **الفيديو المرجعي:** https://youtu.be/HrvHMiQ0M2s - Landing Page مع Animations و 3D Effects
2. https://aircenter.space/
3. https://steven.com/creator-tech
4. https://pacomepertant.com/
5. https://www.septiembrearquitectura.com/
6. https://ulyssesdesanti.com/

### 🔑 الأنماط المشتركة بين المواقع (اللي لازم نطبقها):

#### 1. تيبوجرافي ضخم ومؤلف بعناية 🎯
- كل المواقع بتستخدم خطوط كبيرة جداً (80-150px)
- النص مكونلبوز بعناية مع line breaks يدوية
- **التطبيق:** HARMENS بخط ضخم في الهيرو + subtitle أنحف

#### 2. ألوان محدودة جداً (2-3 ألوان) 🎨
- aircenter: B&W فقط | steven: Dark+Yellow | pacome: Dark+Green | septiembre: Ivory+Burgundy | ulysses: B&W
- **التطبيق:** Dark Navy + Light Blue + White بس

#### 3. Smooth Scrolling 🌊
- aircenter: Locomotive Scroll | steven: Lenis | الباقي: CSS/custom
- **التطبيق:** Lenis smooth scroll أو CSS scroll-behavior

#### 4. أول انطباع سينمائي 🎬
- فيديو خلفية (aircenter, septiembre, ulysses) أو 3D WebGL (steven, pacome)
- **التطبيق:** 3D WebGL canvas في خلفية الهيرو + transition سلس

#### 5. Scroll-Triggered Animations ✨
- كل المواقع: عناصر بتظهر بـ fade/slide/clip عند التمرير
- **التطبيق:** Framer Motion whileInView + stagger

#### 6. مساحات فارغة كبيرة 📐
- كل المواقع: padding و spacing كبير جداً بين الأقسام
- **التطبيق:** min-section-height: 100vh, generous padding

#### 7. هوية فريدة مش تيمبليت 🏆
- كل موقع ليه شخصية مميزة ومختلفة عن أي template
- **التطبيق:** تصميم custom + 3D objects + typography composition

### 🛠️ تقنيات محددة هنستخدمها من المراجع:

| التقنية | المصدر | كيف هنتطبقها |
|---------|--------|-------------|
| 3D WebGL Hero | steven.com + aircenter | Three.js + React Three Fiber في خلفية الهيرو |
| Floating 3D Objects | aircenter + pacome | أشكال معمارية floating + Float من Drei |
| Per-char Text Reveal | steven.com | Framer Motion per-character stagger animation |
| Smooth Scroll | steven.com (Lenis) | CSS smooth أو lenis |
| Scroll Reveal | كل المواقع | Framer Motion whileInView |
| Parallax Depth | aircenter + septiembre | CSS parallax أو Framer Motion useScroll |
| Large Image Grid | septiembre + ulysses | Grid غير متماثل + صور كبيرة |
| Dark Minimal | aircenter + steven + pacome | Dark Navy bg + ألوان محدودة |
| Scroll Indicator | aircenter | سهم أو دائرة بتحرك مع السكرول |

## Scope
### In Scope
- صفحة واحدة فقط (Landing Page)
- 3 أقسام فقط (Hero - Portfolio - Contact)
- 3D Effects في الثلاث أقسام (consistent)
- Scroll Animations في الثلاث أقسام
- Smooth Scrolling
- Responsive (موبايل + تابلت + ديسكتوب)
- نموذج تواصل شغال
- تصميم + برمجة
- Next.js

### Out of Scope
- أي أقسام زيادة (لا Services منفصلة - لا About منفصل - لا Testimonials - لا Pricing)
- WordPress
- صفحات متعددة
- لوحة تحكم / CMS
- استضافة (هتتفق بعدين)

## Agreement Details
- **السعر الإجمالي:** $100 ($90 للموقع + $10 لنموذج التواصل)
- **المدة:** 5-7 أيام
- **طريقة الدفع:** خمسات (Khamsat) - المبلغ متعلق لحد ما العميل يستلم
- **التقنية:** Next.js

## Client Assets Needed
- [x] اللوجو (logo.png + tran-04.png)
- [ ] صور المشاريع (~10 صور) - العميل هيبعتهالها بعدين - هنستخدم placeholders حالياً
- [x] بيانات التواصل (Instagram فقط حالياً)

## Client Quotes (مهمة)
> "مش عاوز حاجات كتيرة يعني ممكن ال hero يكون هو الشيئ المبهر واللي يشد العميل وبعد كدا عرض الاعمال بطريق جميلة ومبهرة وبس"

> "خلي ال 3d بالثلاث اقسام - يعني لما بعمل سكرول كلو يمشي زي بعضه"

> "الصور تكون كبيرة"

> "أهم شيء بالنسبة لي أن يكون التصميم Premium ويعطي انطباع شركة عالمية وليس قالباً جاهزاً"
