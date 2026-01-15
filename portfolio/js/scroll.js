// ===== TIMELINE REVEAL =====
const timelineItems = document.querySelectorAll(".timeline-item");

const revealTimeline = () => {
  const triggerBottom = window.innerHeight * 0.85;

  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);

// ===== SKILL RING FILL =====
document.querySelectorAll(".skill-ring").forEach((ring) => {
  const level = ring.dataset.level;
  ring.style.background = `conic-gradient(
    var(--accent) ${level * 3.6}deg,
    rgba(255, 255, 255, 0.12) 0deg
  )`;
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
