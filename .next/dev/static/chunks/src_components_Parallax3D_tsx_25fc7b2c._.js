(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Parallax3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Parallax3D,
    "useParallax3D",
    ()=>useParallax3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
function Parallax3D({ layers, perspective = 1200 }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const tickingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Parallax3D.useEffect": ()=>{
            const handleScroll = {
                "Parallax3D.useEffect.handleScroll": ()=>{
                    if (!tickingRef.current) {
                        tickingRef.current = true;
                        rafRef.current = requestAnimationFrame({
                            "Parallax3D.useEffect.handleScroll": ()=>{
                                setScrollY(window.scrollY);
                                tickingRef.current = false;
                            }
                        }["Parallax3D.useEffect.handleScroll"]);
                    }
                }
            }["Parallax3D.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "Parallax3D.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    cancelAnimationFrame(rafRef.current);
                }
            })["Parallax3D.useEffect"];
        }
    }["Parallax3D.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "parallax-3d-container",
        style: {
            perspective: `${perspective}px`,
            perspectiveOrigin: '50% 50%'
        },
        children: layers.map((layer)=>{
            const yOffset = scrollY * layer.speed * 0.3;
            const zTranslate = layer.zDepth * 0.5;
            const scale = 1 + layer.zDepth * 0.005;
            const opacity = 1 - Math.abs(layer.zDepth) * 0.01;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `parallax-3d-layer ${layer.className || ''}`,
                style: {
                    transform: `translate3d(0, ${yOffset}px, ${zTranslate}px) scale(${scale})`,
                    opacity: Math.max(0.3, opacity),
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                },
                children: layer.children
            }, layer.id, false, {
                fileName: "[project]/src/components/Parallax3D.tsx",
                lineNumber: 68,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/Parallax3D.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(Parallax3D, "ufLkmnMdbPTzT18XshiAV0DY9hk=");
_c = Parallax3D;
function useParallax3D(speed = 0.5) {
    _s1();
    const [transform, setTransform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const tickingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useParallax3D.useEffect": ()=>{
            const handleScroll = {
                "useParallax3D.useEffect.handleScroll": ()=>{
                    if (!tickingRef.current) {
                        tickingRef.current = true;
                        rafRef.current = requestAnimationFrame({
                            "useParallax3D.useEffect.handleScroll": ()=>{
                                const y = window.scrollY * speed * 0.3;
                                setTransform(`translate3d(0, ${y}px, 0)`);
                                tickingRef.current = false;
                            }
                        }["useParallax3D.useEffect.handleScroll"]);
                    }
                }
            }["useParallax3D.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "useParallax3D.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    cancelAnimationFrame(rafRef.current);
                }
            })["useParallax3D.useEffect"];
        }
    }["useParallax3D.useEffect"], [
        speed
    ]);
    return transform;
}
_s1(useParallax3D, "agAEivCQVTBr9hQU/tQ+FypAqSY=");
var _c;
__turbopack_context__.k.register(_c, "Parallax3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Parallax3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Parallax3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_Parallax3D_tsx_25fc7b2c._.js.map