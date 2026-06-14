(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/RotatingShowcase3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RotatingShowcase3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
/**
 * 🎲 Premium 3D Showcase — "Floating Gallery"
 *
 * Professional 3D carousel where ALL cards are visible as they rotate.
 * Cards coming from behind are visible (dimmed) — creating a smooth,
 * immersive 3D feel where you see images "emerging" as they rotate.
 *
 * Technique: Replace backfaceVisibility:hidden (abrupt disappear) with
 * JS-controlled opacity per card based on facing direction.
 * This also eliminates the Chrome Mobile bug where cards randomly vanish.
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
    const prismRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const faceCount = showcaseImages.length;
    const angleStep = 360 / faceCount;
    const cardWidth = 260;
    const cardHeight = 180;
    const translateZ = Math.round(cardWidth / (2 * Math.tan(Math.PI / faceCount)));
    // JS animation: controls rotation + per-card opacity
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RotatingShowcase3D.useEffect": ()=>{
            const prism = prismRef.current;
            if (!prism) return;
            let animId;
            let startTime = null;
            const duration = 30000; // 30s per full rotation
            const animate = {
                "RotatingShowcase3D.useEffect.animate": (timestamp)=>{
                    if (!startTime) startTime = timestamp;
                    const elapsed = timestamp - startTime;
                    const progress = elapsed % duration / duration;
                    // Rotation angle
                    const rotateY = progress * 360;
                    // Gentle float
                    const floatY = Math.sin(progress * Math.PI * 2) * 8;
                    // Subtle tilt
                    const rotateX = 5 + Math.sin(progress * Math.PI * 2) * 0.5;
                    // Apply transform to prism
                    prism.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatY}px)`;
                    // Per-card opacity based on facing direction
                    cardsRef.current.forEach({
                        "RotatingShowcase3D.useEffect.animate": (card, i)=>{
                            if (!card) return;
                            const cardAngle = angleStep * i;
                            // Effective angle: card's own rotation + prism rotation
                            const effective = ((cardAngle + rotateY) % 360 + 360) % 360;
                            // Calculate how "front-facing" the card is
                            // 0° = directly facing viewer → opacity 1
                            // 180° = fully behind → opacity 0.2 (still visible!)
                            const frontness = Math.cos(effective * Math.PI / 180);
                            // frontness: 1 (front) to -1 (back)
                            // Map to opacity: front=1.0, side=0.55, back=0.18
                            const opacity = 0.18 + (frontness + 1) * 0.41;
                            card.style.opacity = String(Math.round(opacity * 100) / 100);
                        }
                    }["RotatingShowcase3D.useEffect.animate"]);
                    animId = requestAnimationFrame(animate);
                }
            }["RotatingShowcase3D.useEffect.animate"];
            animId = requestAnimationFrame(animate);
            return ({
                "RotatingShowcase3D.useEffect": ()=>cancelAnimationFrame(animId)
            })["RotatingShowcase3D.useEffect"];
        }
    }["RotatingShowcase3D.useEffect"], [
        angleStep
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative select-none",
        style: {
            perspective: '1400px',
            perspectiveOrigin: '50% 50%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute pointer-events-none",
                style: {
                    bottom: -60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 400,
                    height: 120,
                    background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, rgba(29,55,45,0.06) 40%, transparent 70%)',
                    filter: 'blur(40px)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: prismRef,
                className: "showcase-prism",
                style: {
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: 'preserve-3d',
                    // NO CSS animation — JS handles rotation + opacity
                    transform: 'rotateX(5deg) rotateY(0deg) translateY(0px)'
                },
                children: showcaseImages.map((face, i)=>{
                    const angle = angleStep * i;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: (el)=>{
                            cardsRef.current[i] = el;
                        },
                        className: "absolute showcase-card",
                        style: {
                            width: cardWidth,
                            height: cardHeight,
                            // NO backfaceVisibility:hidden — JS controls opacity instead
                            // This makes back cards visible (dimmed) = more professional 3D feel
                            transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                            borderRadius: 10,
                            overflow: 'hidden',
                            opacity: 1
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: face.src,
                                    alt: face.label,
                                    loading: "eager",
                                    style: {
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        backgroundColor: '#13140f'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 149,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    style: {
                                        background: `
                      linear-gradient(180deg,
                        rgba(19,20,15,0.15) 0%,
                        rgba(19,20,15,0.0) 30%,
                        rgba(19,20,15,0.0) 50%,
                        rgba(19,20,15,0.6) 100%
                      )
                    `
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 right-0 pointer-events-none",
                                    style: {
                                        height: 2,
                                        background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.6) 50%, transparent 90%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 179,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0 pointer-events-none",
                                    style: {
                                        height: 1,
                                        background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.3) 50%, transparent 90%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 188,
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
                                            lineNumber: 198,
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
                                            lineNumber: 202,
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
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 201,
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
                                                background: '#1d372d'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 206,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 12,
                                                background: '#1d372d'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 205,
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
                                                background: '#1d372d',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 1,
                                                height: 12,
                                                background: '#1d372d',
                                                marginLeft: 'auto'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0 p-3 pointer-events-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[7px] tracking-[0.5em] uppercase block",
                                            style: {
                                                color: 'rgba(29,55,45,0.6)'
                                            },
                                            children: face.category
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                            lineNumber: 216,
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
                                            lineNumber: 222,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 215,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 pointer-events-none",
                                    style: {
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                            lineNumber: 135,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                        lineNumber: 119,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 105,
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
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RotatingShowcase3D.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RotatingShowcase3D.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(RotatingShowcase3D, "VVgAhAAQfOq++8fqavN8L0icchY=");
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