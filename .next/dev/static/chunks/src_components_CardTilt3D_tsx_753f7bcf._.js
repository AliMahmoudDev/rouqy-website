(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CardTilt3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CardTilt3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function CardTilt3D({ children, className = '', maxTilt = 15, glareOpacity = 0.3, scale = 1.05, perspective = 800 }) {
    _s();
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [transform, setTransform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [glareStyle, setGlareStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        opacity: 0,
        background: ''
    });
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CardTilt3D.useCallback[handleMouseMove]": (e)=>{
            if (!cardRef.current) return;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame({
                "CardTilt3D.useCallback[handleMouseMove]": ()=>{
                    const card = cardRef.current;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    // Calculate rotation based on mouse position
                    const rotateX = (y - centerY) / centerY * -maxTilt;
                    const rotateY = (x - centerX) / centerX * maxTilt;
                    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
                    // Glare follows mouse
                    const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
                    setGlareStyle({
                        opacity: glareOpacity,
                        background: `linear-gradient(${glareAngle + 180}deg, rgba(255,255,255,0.25) 0%, rgba(212,175,55,0.1) 30%, rgba(37,162,220,0.05) 50%, transparent 70%)`
                    });
                }
            }["CardTilt3D.useCallback[handleMouseMove]"]);
        }
    }["CardTilt3D.useCallback[handleMouseMove]"], [
        maxTilt,
        glareOpacity,
        scale,
        perspective
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CardTilt3D.useCallback[handleMouseLeave]": ()=>{
            cancelAnimationFrame(rafRef.current);
            setTransform('');
            setGlareStyle({
                opacity: 0,
                background: ''
            });
        }
    }["CardTilt3D.useCallback[handleMouseLeave]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: `card-tilt-3d ${className}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
            transition: transform ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-tilt-glare",
                "aria-hidden": "true",
                style: {
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 5,
                    borderRadius: 'inherit',
                    opacity: glareStyle.opacity,
                    background: glareStyle.background || 'transparent',
                    transition: glareStyle.opacity === 0 ? 'opacity 0.4s ease' : 'none',
                    mixBlendMode: 'overlay'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/CardTilt3D.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-tilt-edge",
                "aria-hidden": "true",
                style: {
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 4,
                    borderRadius: 'inherit',
                    boxShadow: transform ? 'inset 0 0 40px rgba(37,162,220,0.15), inset 0 0 80px rgba(212,175,55,0.08), 0 0 30px rgba(37,162,220,0.1)' : 'none',
                    opacity: transform ? 1 : 0,
                    transition: transform ? 'none' : 'opacity 0.4s ease'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/CardTilt3D.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CardTilt3D.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(CardTilt3D, "HCuWGbbRVGQmiYOorUdvDKU5nz0=");
_c = CardTilt3D;
var _c;
__turbopack_context__.k.register(_c, "CardTilt3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CardTilt3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/CardTilt3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_CardTilt3D_tsx_753f7bcf._.js.map