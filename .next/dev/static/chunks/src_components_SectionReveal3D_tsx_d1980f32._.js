(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/SectionReveal3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectionReveal3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function SectionReveal3D({ children, className = '', rotateX = 8, rotateY = 0, translateZ = -60, duration = 1200, delay = 0, threshold = 0.1 }) {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SectionReveal3D.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "SectionReveal3D.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setRevealed(true);
                        observer.disconnect(); // Only trigger once
                    }
                }
            }["SectionReveal3D.useEffect"], {
                threshold,
                rootMargin: '0px 0px -80px 0px'
            });
            if (sectionRef.current) observer.observe(sectionRef.current);
            return ({
                "SectionReveal3D.useEffect": ()=>observer.disconnect()
            })["SectionReveal3D.useEffect"];
        }
    }["SectionReveal3D.useEffect"], [
        threshold
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sectionRef,
        className: `section-reveal-3d ${className}`,
        style: {
            perspective: '1200px',
            perspectiveOrigin: '50% 0%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "section-reveal-3d-inner",
            style: {
                transform: revealed ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)' : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(0.98)`,
                opacity: revealed ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration * 0.6}ms ease ${delay}ms`,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transformOrigin: '50% 0%'
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/SectionReveal3D.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SectionReveal3D.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(SectionReveal3D, "pN114ZHetzMuzLKzFY2prPtFS6I=");
_c = SectionReveal3D;
var _c;
__turbopack_context__.k.register(_c, "SectionReveal3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SectionReveal3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/SectionReveal3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_SectionReveal3D_tsx_d1980f32._.js.map