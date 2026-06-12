# AI Workflow Rules - HARMENS

## Approach
ابني الصفحة تدريجياً. ملفات الكونتكست بتحدد السكوب. **لا تضيف أي أقسام أو سلوكيات مش موجودة في `project-overview.md`.**

## Scoping Rules
- ابنِ قسم واحد في المرة (Hero -> Portfolio -> Contact)
- اتأكد من الـ responsiveness (موبايل + ديسكتوب) لكل قسم قبل ما تنتقل للتالي
- بعد كل قسم، حدّث `progress-tracker.md`

## Build Order
1. **Setup:** globals.css بالألوان والـ CSS variables
2. **Hero Section:** 3D scene + العنوان + CTA
3. **Portfolio Section:** Grid + scroll animations + large images
4. **Contact Section:** نموذج تواصل + 3D continuity
5. **Integration:** Smooth scrolling + تربيط الثلاث أقسام
6. **Polish:** Performance optimization + responsive testing

## Handling Missing Requirements
- لو نص مفقود: استخدم placeholder واضح (مثلاً "Insert Headline Here")
- لو صور مفقودة: استخدم صور من Unsplash (عمارة / تصميم داخلي)
- لو ألوان مفقودة: استخدم الـ CSS variables المعرفة

## Client Preferences (من الشات)
- العميل أكد أكتر من مرة: **تصميم Premium مش قالب جاهز**
- العميل أكد: **الـ Hero هو الأهم** - لازم يشد العميل
- العميل أكد: **الصور كبيرة**
- العميل أكد: **3 أقسام فقط - لا تزد**
- العميل أكد: **3D في الثلاث أقسام مش الهيرو بس**
- العميل أكد: **الـ 3D لازم يكون مستمر ومتساعد في التمرير**

## Before Finishing
1. الثلاث أقسام شغالة ومتسعة
2. 3D Effects شغالة في الثلاث أقسام
3. Smooth Scrolling شغال
4. Responsive على الموبايل والديسكتوب
5. نموذج التواصل شغال
6. Performance مقبول
7. `progress-tracker.md` محدّث

## Price & Terms Reference
- السعر: $100 كامل
- المدة: 5-7 أيام
- الدفع: خمسات (escrowed)
- التقنية: Next.js
