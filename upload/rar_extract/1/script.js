window.addEventListener("load", () => {

    setTimeout(() => {

        const intro = document.getElementById("intro");

        intro.style.opacity = "0";

        document
            .querySelector(".hero-logo")
            .classList.add("show");

        setTimeout(() => {
            intro.remove();
        }, 800);

    }, 1200);

});


const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


gsap.registerPlugin(ScrollTrigger);

const drawPath = document.querySelector("#draw-logo");
const fillPath = document.querySelector("#fill-logo");
const isDesktop = window.innerWidth > 768;
if (drawPath && isDesktop) {

    const length = drawPath.getTotalLength();

    gsap.set(fillPath, { opacity: 0 });

    gsap.set(drawPath, {
        strokeDasharray: length,
        strokeDashoffset: length
    });

    gsap.set(".about-content", {
        x: -120,
        opacity: 0
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top top",
            end: "+=4000",
            scrub: true,
            pin: true
        }
    });

    tl.to(drawPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "none"
    })
    .to(fillPath, {
        opacity: 1,
        duration: 1
    })
    .to(drawPath, {
        opacity: 0,
        duration: .5
    })
    .to(".about-logo svg", {
        scale: 7,
         x: () => window.innerWidth * 0.28,
        duration: 3,
        transformOrigin: "center center"
    })
    .to(".about-content", {
        opacity: 1,
        x: 0,
        duration: 1.5
    }, "-=1.5");
}

const galleryTrack = document.querySelector(".gallery-track");

if (galleryTrack) {

    gsap.to(galleryTrack, {
        x: () => -(galleryTrack.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".projects-section",
            start: "top top",
            end: () => "+=" + (galleryTrack.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true   // يعيد الحساب عند تغيير حجم الشاشة
        }
    });
}

gsap.set(".contact-inner > *", {
    y: 40,
    opacity: 0
});

gsap.to(".contact-inner > *", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,        // كل عنصر يطلع بعد اللي قبله بشوي
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 70%"   // يبلش لما يوصل 70% من الشاشة
    }
});

gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", (e) => {

        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {

            e.preventDefault();

            const target = document.querySelector(targetId);
            const targetY = target.getBoundingClientRect().top + window.scrollY;
            const distance = Math.abs(targetY - window.scrollY);

            // مدة متناسبة مع المسافة، بحد أقصى 1.6 ثانية
            const duration = Math.min(1.6, 0.5 + distance / 6000);

            gsap.to(window, {
                duration: duration,
                scrollTo: { y: targetId, offsetY: 80 },
                ease: "power2.inOut"
            });

        }

    });

});

gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: targetId, offsetY: 80 },
                ease: "power3.inOut"
            });

            