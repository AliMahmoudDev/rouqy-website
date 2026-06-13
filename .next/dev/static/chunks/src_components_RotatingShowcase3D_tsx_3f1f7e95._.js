(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/RotatingShowcase3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RotatingShowcase3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
/**
 * 🎲 3D Rotating Product Showcase
 * 
 * A CSS-only 3D rotating prism with real project images on each face.
 * Uses transform-style: preserve-3d for true 3D rendering.
 * No WebGL, no JS animation loop — pure CSS keyframes = zero lag.
 * 
 * The prism slowly rotates to showcase portfolio work in 3D.
 */ const showcaseImages = [
    {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
        label: 'Dining'
    },
    {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        label: 'Modern'
    },
    {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
        label: 'Grand Hall'
    },
    {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        label: 'Suite'
    }
];
function RotatingShowcase3D() {
    const faceCount = showcaseImages.length;
    const angleStep = 360 / faceCount;
    // translateZ for a regular polygon: sideLength / (2 * tan(π/n))
    // For a square prism with ~280px faces: ~280px
    const translateZ = 280;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            perspective: '1200px',
            perspectiveOrigin: '50% 50%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] md:w-[300px] h-[80px] md:h-[120px] pointer-events-none",
                style: {
                    background: 'radial-gradient(ellipse, rgba(37,162,220,0.15) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)',
                    filter: 'blur(30px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "showcase-prism",
                style: {
                    width: 240,
                    height: 320,
                    transformStyle: 'preserve-3d',
                    animation: 'showcase-rotate 25s linear infinite',
                    willChange: 'transform'
                },
                children: [
                    showcaseImages.map((face, i)=>{
                        const angle = angleStep * i;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute overflow-hidden",
                            style: {
                                width: 240,
                                height: 320,
                                backfaceVisibility: 'hidden',
                                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                                border: '1px solid rgba(212,175,55,0.15)',
                                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3), 0 0 20px rgba(37,162,220,0.05)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: face.src,
                                    alt: face.label,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "240px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0",
                                    style: {
                                        background: 'linear-gradient(180deg, rgba(11,15,24,0.3) 0%, rgba(11,15,24,0.1) 40%, rgba(11,15,24,0.7) 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 right-0 h-[2px]",
                                    style: {
                                        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-4 left-4 right-4 z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/80",
                                        style: {
                                            textShadow: '0 1px 4px rgba(0,0,0,0.8)'
                                        },
                                        children: face.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, transparent 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute",
                        style: {
                            width: 240,
                            height: 240,
                            top: -120 + 160,
                            left: 0,
                            transform: `rotateX(90deg) translateZ(160px)`,
                            background: 'rgba(11, 15, 24, 0.6)',
                            border: '1px solid rgba(212,175,55,0.08)',
                            backfaceVisibility: 'hidden'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = RotatingShowcase3D;
var _c;
__turbopack_context__.k.register(_c, "RotatingShowcase3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RotatingShowcase3D.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/RotatingShowcase3D.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_RotatingShowcase3D_tsx_3f1f7e95._.js.map