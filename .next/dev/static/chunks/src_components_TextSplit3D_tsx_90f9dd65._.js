(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/TextSplit3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextSplit3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function TextSplit3D({ text, mode = 'entrance', className = '', letterClassName = '', staggerDelay = 60, entranceDuration = 800, scrollIntensity = 0.3 }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const tickingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const letters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TextSplit3D.useMemo[letters]": ()=>text.split('')
    }["TextSplit3D.useMemo[letters]"], [
        text
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextSplit3D.useEffect": ()=>{
            // Trigger entrance animation after mount
            const timer = setTimeout({
                "TextSplit3D.useEffect.timer": ()=>setMounted(true)
            }["TextSplit3D.useEffect.timer"], 50);
            return ({
                "TextSplit3D.useEffect": ()=>clearTimeout(timer)
            })["TextSplit3D.useEffect"];
        }
    }["TextSplit3D.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextSplit3D.useEffect": ()=>{
            if (mode !== 'scroll') return;
            const handleScroll = {
                "TextSplit3D.useEffect.handleScroll": ()=>{
                    if (!tickingRef.current) {
                        tickingRef.current = true;
                        rafRef.current = requestAnimationFrame({
                            "TextSplit3D.useEffect.handleScroll": ()=>{
                                setScrollY(window.scrollY);
                                tickingRef.current = false;
                            }
                        }["TextSplit3D.useEffect.handleScroll"]);
                    }
                }
            }["TextSplit3D.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "TextSplit3D.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    cancelAnimationFrame(rafRef.current);
                }
            })["TextSplit3D.useEffect"];
        }
    }["TextSplit3D.useEffect"], [
        mode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: `text-split-3d ${className}`,
        style: {
            perspective: '1000px',
            perspectiveOrigin: '50% 50%',
            display: 'inline-flex',
            flexWrap: 'wrap'
        },
        children: letters.map((letter, i)=>{
            const isSpace = letter === ' ';
            // Entrance animation values — MORE dramatic
            const entranceRotateX = mounted ? 0 : 120 + i % 3 * 30;
            const entranceRotateY = mounted ? 0 : i % 2 === 0 ? -50 : 50;
            const entranceTranslateZ = mounted ? 0 : -400;
            const entranceOpacity = mounted ? 1 : 0;
            // Scroll animation values — MORE visible
            const normalizedScroll = scrollY * scrollIntensity * 0.005;
            const scrollRotateX = mode === 'scroll' ? normalizedScroll * (i % 2 === 0 ? 1 : -1) * 12 : 0;
            const scrollRotateY = mode === 'scroll' ? normalizedScroll * (i % 3 === 0 ? 1 : -0.5) * 6 : 0;
            const scrollTranslateZ = mode === 'scroll' ? Math.sin(normalizedScroll + i * 0.5) * 40 : 0;
            const finalRotateX = entranceRotateX + scrollRotateX;
            const finalRotateY = entranceRotateY + scrollRotateY;
            const finalTranslateZ = entranceTranslateZ + scrollTranslateZ;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-split-letter ${letterClassName}`,
                style: {
                    display: 'inline-block',
                    transform: `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) translateZ(${finalTranslateZ}px)`,
                    opacity: entranceOpacity,
                    transition: mounted ? `transform ${entranceDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms, opacity ${entranceDuration * 0.6}ms ease ${i * staggerDelay}ms` : 'none',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    minWidth: isSpace ? '0.3em' : undefined
                },
                children: isSpace ? '\u00A0' : letter
            }, `${letter}-${i}`, false, {
                fileName: "[project]/src/components/TextSplit3D.tsx",
                lineNumber: 102,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/TextSplit3D.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(TextSplit3D, "f7aT6S9P1R9y2H4C33mS0A5rifo=");
_c = TextSplit3D;
var _c;
__turbopack_context__.k.register(_c, "TextSplit3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TextSplit3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/TextSplit3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_TextSplit3D_tsx_90f9dd65._.js.map