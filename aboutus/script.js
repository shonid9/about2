document.addEventListener("mousemove", (e) => {
  const spotlightMasks = document.querySelectorAll(".spotlight-mask");
  const x = e.clientX;
  const y = e.clientY;

  spotlightMasks.forEach(mask => {
    gsap.to(mask, {
      background: `radial-gradient(circle 220px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.95) 100%)`,
      duration: 0.25,
      ease: "power2.out"
    });
  });
});
// GSAP Neon Pulse Animation
gsap.to(".cta-button", {
  boxShadow: `
    0 0 15px rgba(0, 255, 255, 0.5),
    0 0 25px rgba(143, 0, 255, 0.3),
    inset 0 0 10px rgba(255, 255, 255, 0.1)
  `,
  duration: 1.8,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
});
