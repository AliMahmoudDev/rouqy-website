(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/RotatingShowcase3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RotatingShowcase3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
/**
 * 🎲 Premium 3D Rotating Showcase — "Luxury Gallery"
 *
 * A high-end 3D carousel with:
 * - 6 premium floating frames in hexagonal arrangement
 * - Landscape orientation (perfect for interior design)
 * - Gold corner bracket frames with glass overlay
 * - Slow cinematic rotation with subtle tilt oscillation
 * - Hover pauses rotation + slight zoom
 * - Mouse tilt for interactive 3D feel
 * - Reflective surface underneath
 * - Ambient gold/blue glow
 * - CSS-only animation for zero lag
 */ const showcaseImages = [
    {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
        label: 'Dining Room',
        category: 'RESIDENTIAL'
    },
    {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        label: 'Modern Living',
        category: 'LUXURY'
    },
    {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
        label: 'Grand Hall',
        category: 'COMMERCIAL'
    },
    {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        label: 'Royal Suite',
        category: 'HOSPITALITY'
    },
    {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
        label: 'Lounge',
        category: 'RESIDENTIAL'
    },
    {
        src: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
        label: 'Villa Interior',
        category: 'LUXURY'
    }
];
function RotatingShowcase3D() {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const faceCount = showcaseImages.length;
    const angleStep = 360 / faceCount;
    const cardWidth = 260;
    const cardHeight = 180;
    const translateZ = Math.round(cardWidth / (2 * Math.tan(Math.PI / faceCount)));
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RotatingShowcase3D.useCallback[handleMouseMove]": (e)=>{
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setTilt({
                x: y * -12,
                y: x * 12
            });
        }
    }["RotatingShowcase3D.useCallback[handleMouseMove]"], []);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RotatingShowcase3D.useCallback[handleMouseLeave]": ()=>{
            setIsHovered(false);
            setTilt({
                x: 0,
                y: 0
            });
        }
    }["RotatingShowcase3D.useCallback[handleMouseLeave]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative select-none",
        style: {
            perspective: '1400px',
            perspectiveOrigin: '50% 50%'
        },
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute pointer-events-none",
                style: {
                    bottom: -60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 400,
                    height: 120,
                    background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, rgba(37,162,220,0.06) 40%, transparent 70%)',
                    filter: 'blur(40px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute pointer-events-none",
                style: {
                    bottom: -40,
                    left: '50%',
                    transform: 'translateX(-50%) scaleX(1) scaleY(-0.3)',
                    width: cardWidth + 40,
                    height: cardHeight,
                    opacity: 0.08,
                    background: 'linear-gradient(180deg, rgba(212,175,55,0.3), transparent)',
                    filter: 'blur(8px)',
                    borderRadius: 12
                }
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "showcase-prism",
                style: {
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: 'preserve-3d',
                    animation: isHovered ? 'none' : 'showcase-rotate 30s cubic-bezier(0.37, 0, 0.63, 1) infinite',
                    willChange: 'transform',
                    // Apply mouse tilt on hover
                    transform: isHovered ? `rotateX(${tilt.x}deg) rotateY(${tilt.y + 15}deg) scale(1.08)` : undefined,
                    transition: isHovered ? 'transform 0.3s ease-out' : 'none'
                },
                children: showcaseImages.map((face, i)=>{
                    const angle = angleStep * i;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute showcase-card",
                        style: {
                            width: cardWidth,
                            height: cardHeight,
                            backfaceVisibility: 'hidden',
                            transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                            borderRadius: 10,
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                borderRadius: 10,
                                border: '1px solid rgba(212,175,55,0.2)',
                                boxShadow: `
                    inset 0 0 30px rgba(0,0,0,0.4),
                    0 0 40px rgba(0,0,0,0.5),
                    0 0 15px rgba(212,175,55,0.05)
                  `,
                                overflow: 'hidden'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: face.src,
                                    alt: face.label,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "260px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 139,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0",
                                    style: {
                                        background: `
                      linear-gradient(180deg,
                        rgba(11,15,24,0.15) 0%,
                        rgba(11,15,24,0.0) 30%,
                        rgba(11,15,24,0.0) 50%,
                        rgba(11,15,24,0.6) 100%
                      )
                    `
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 right-0",
                                    style: {
                                        height: 2,
                                        background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.6) 50%, transparent 90%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0",
                                    style: {
                                        height: 1,
                                        background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.3) 50%, transparent 90%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-2 left-2 pointer-events-none",
                                    style: {
                                        opacity: 0.7
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 16,
                                                height: 1,
                                                background: '#D4AF37'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 183,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 16,
                                                background: '#D4AF37'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-2 right-2 pointer-events-none",
                                    style: {
                                        opacity: 0.7
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 16,
                                                height: 1,
                                                background: '#D4AF37',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 16,
                                                background: '#D4AF37',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-8 left-2 pointer-events-none",
                                    style: {
                                        opacity: 0.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 12,
                                                height: 1,
                                                background: '#25A2DC'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 12,
                                                background: '#25A2DC'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-8 right-2 pointer-events-none",
                                    style: {
                                        opacity: 0.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 12,
                                                height: 1,
                                                background: '#25A2DC',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 12,
                                                background: '#25A2DC',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[7px] tracking-[0.5em] uppercase block",
                                            style: {
                                                color: 'rgba(37,162,220,0.6)'
                                            },
                                            children: face.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 204,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] tracking-[0.25em] uppercase block mt-0.5",
                                            style: {
                                                color: 'rgba(212,175,55,0.9)',
                                                textShadow: '0 1px 6px rgba(0,0,0,0.8)'
                                            },
                                            children: face.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this),
                                isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                                        transition: 'opacity 0.3s ease'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 231,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                            lineNumber: 125,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute pointer-events-none",
                style: {
                    width: translateZ * 2 + 60,
                    height: translateZ * 2 + 60,
                    left: '50%',
                    top: '50%',
                    marginLeft: -(translateZ + 30),
                    marginTop: -(translateZ + 30),
                    borderRadius: '50%',
                    border: '1px solid rgba(212,175,55,0.04)',
                    animation: 'spin-slow 40s linear infinite'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        top: -3,
                        left: '50%',
                        marginLeft: -3,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#D4AF37',
                        boxShadow: '0 0 10px rgba(212,175,55,0.5)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                    lineNumber: 260,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(RotatingShowcase3D, "WSY2a19R23GHPg4QXni0MSI6jeA=");
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