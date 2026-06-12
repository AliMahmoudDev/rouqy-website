# AI Workflow Rules - HARMENS

## Approach
ابني الصفحة تدريجياً. ملفات الكونتكست بتحدد السكوب. **لا تضيف أي أقسام أو سلوكيات مش موجودة في `project-overview.md`.**

## Scoping Rules
- ابنِ قسم واحد في المرة (Hero -> Portfolio -> Contact)
- اتأكد من الـ responsiveness (موبايل + ديسكتوب) لكل قسم قبل ما تنتقل للتالي
- بعد كل قسم، حدّث `progress-tracker.md`

## Build Order (محدد ومتفق عليه)
1. **Setup:** globals.css بالألوان والـ CSS variables + install packages
2. **Hero Section:** 3D scene + العنوان + CTA + scroll indicator
3. **Portfolio Section:** Grid + scroll animations + large images + 3D bg
4. **Contact Section:** نموذج تواصل + 3D continuity + footer
5. **Integration:** Smooth scrolling + تربيط الثلاث أقسام
6. **Polish:** Performance optimization + responsive testing

## Handling Missing Requirements
- لو نص مفقود: استخدم placeholder واضح (مثلاً "Insert Headline Here")
- لو صور مفقودة: استخدم صور من Unsplash (عمارة / تصميم داخلي)
- لو ألوان مفقودة: استخدم الـ CSS variables المعرفة في ui-context.md

## Client Preferences (من الشات - التزم بيهم!)
- العميل أكد أكتر من مرة: **تصميم Premium مش قالب جاهز**
- العميل أكد: **الـ Hero هو الأهم** - لازم يشد العميل
- العميل أكد: **الصور كبيرة**
- العميل أكد: **3 أقسام فقط - لا تزد**
- العميل أكد: **3D في الثلاث أقسام مش الهيرو بس**
- العميل أكد: **الـ 3D لازم يكون مستمر ومتساعد في التمرير**
- العميل أكد: **التصميم يعطي انطباع شركة عالمية**

## Premium Quality Checklist (مستوحى من المراجع)
قبل ما تقول إن القسم خلص، اتأكد من:
- [ ] الـ Typography ضخم ومؤلف بعناية (مش مجرد نص عادي)
- [ ] الألوان محدودة (2-3 بس)
- [ ] الـ Smooth Scrolling شغال
- [ ] الـ 3D Effects راقية ومش مبالغ فيها
- [ ] المساحات الفارغة كبيرة وكافية
- [ ] الـ Scroll Animations سلسة
- [ ] الـ Hover Effects احترافية
- [ ] الـ Responsive شغال على الموبايل
- [ ] الموقع مش بيحس كـ template جاهز

## Before Finishing
1. الثلاث أقسام شغالة ومتسعة
2. 3D Effects شغالة في الثلاث أقسام (consistent)
3. Smooth Scrolling شغال
4. Responsive على الموبايل والديسكتوب
5. نموذج التواصل شغال
6. Performance مقبول (Lighthouse > 90)
7. `progress-tracker.md` محدّث
8. Premium feel - مش template

## Price & Terms Reference
- السعر: $100 كامل
- المدة: 5-7 أيام
- الدفع: خمسات (escrowed)
- التقنية: Next.js
