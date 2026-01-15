const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const backdrop = document.getElementById("menu-backdrop");

function openMenu() {
  menuToggle.classList.add("active");
  mobileMenu.classList.add("active");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menuToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

menuToggle.addEventListener("click", () => {
  menuToggle.classList.contains("active") ? closeMenu() : openMenu();
});

backdrop.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ESC key close (small but pro)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

function initTypingEffect() {
  const title = document.querySelector(".hero-title");
  if (!title || !title.dataset.text) return;

  const text = title.dataset.text;
  let i = 0;
  title.innerHTML = ""; // Clear initial content
  title.classList.add("typing");

  function type() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // Typing speed
    } else {
      title.classList.remove("typing"); // Remove cursor when done
    }
  }
  type();
}
initTypingEffect();

// ===============================
// CANVAS PARTICLES (BACKGROUND)
// ===============================
const canvas = document.getElementById("bg-particles");
const ctx = canvas.getContext("2d");

let particles = [];
const COUNT = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
  particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: (Math.random() - 0.5) * 2000,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
createParticles();

let mouseX = 0;
let mouseY = 0;
let isMouseActive = false;

document.addEventListener("mousemove", (e) => {
  isMouseActive = true;
  mouseX = e.clientX - window.innerWidth / 2;
  mouseY = e.clientY - window.innerHeight / 2;
});

let angleY = 0;
let angleX = 0;
let pulse = 0;

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const focalLength = 800;

  angleY += 0.0002 + (isMouseActive ? mouseX * 0.00001 : 0);
  angleX += 0.0001 + (isMouseActive ? mouseY * 0.00002 : 0);
  pulse += 0.05;

  const projected = particles.map((p) => {
    const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
    const z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);

    const y1 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
    const z2 = z1 * Math.cos(angleX) + p.y * Math.sin(angleX);

    const zFinal = z2 + 1000;
    const scale = focalLength / zFinal;
    const size = Math.sin(pulse + p.phase) * 0.5 + 1;

    return {
      x: cx + x1 * scale,
      y: cy + y1 * scale,
      scale: scale,
      z: zFinal,
      size: size,
    };
  });

  projected.forEach((p1, i) => {
    if (p1.z < 100) return;

    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p1.scale)})`;
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 2 * p1.scale * p1.size, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < projected.length; j++) {
      const p2 = projected[j];
      if (p2.z < 100) continue;

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100 * p1.scale) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * p1.scale})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // Connect to mouse
    if (isMouseActive) {
      const mx = cx + mouseX;
      const my = cy + mouseY;
      const distMouse = Math.hypot(p1.x - mx, p1.y - my);

      if (distMouse < 150) {
        ctx.strokeStyle = `rgba(124, 246, 255, ${1 - distMouse / 150})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===============================
// MOUSE PARALLAX BACKGROUND
// ===============================
const orbs = document.querySelectorAll(".bg-animated span");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, i) => {
    orb.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px)`;
  });
});

// ===============================
// DYNAMICALLY LOAD PROJECTS
// ===============================
document.addEventListener("DOMContentLoaded", () => {


  const skillsGrid = document.querySelector(".skills-grid");

  if (skillsGrid) {
    fetch("./data/skills.json")
      .then((response) => response.json())
      .then((skills) => {
        skillsGrid.innerHTML = ""; // Clear existing skills
        skills.forEach((skill) => {
          const skillCard = document.createElement("div");
          skillCard.classList.add("skill-card");

          skillCard.innerHTML = `
            <div class="skill-icon">
              <img src="${skill.icon}" alt="${skill.category}" />
            </div>
            <div class="skill-content">
              <h3>${skill.category}</h3>
              <p>${skill.skills}</p>
            </div>
          `;

          skillsGrid.appendChild(skillCard);
        });
      })
      .catch((error) => console.error("Error fetching skills:", error));
  }

  const experienceTimeline = document.querySelector("#experience .timeline");
  const educationTimeline = document.querySelector("#education .timeline");

  if (experienceTimeline && educationTimeline) {
    fetch("./data/resume.json")
      .then((response) => response.json())
      .then((resume) => {
        // Populate Experience
        experienceTimeline.innerHTML = ""; // Clear existing experience
        resume.experience.forEach((item) => {
          const timelineItem = document.createElement("article");
          timelineItem.classList.add("timeline-item");

          const descriptionList = item.description
            .map((desc) => `<li>${desc}</li>`)
            .join("");

          timelineItem.innerHTML = `
            <span class="timeline-dot"></span>
            <div class="timeline-content">
              <span class="timeline-date">${item.date}</span>
              <h3>${item.title}</h3>
              <p class="timeline-company">${item.company}</p>
              <ul>${descriptionList}</ul>
            </div>
          `;
          experienceTimeline.appendChild(timelineItem);
        });

        // Populate Education
        educationTimeline.innerHTML = ""; // Clear existing education
        resume.education.forEach((item) => {
          const timelineItem = document.createElement("article");
          timelineItem.classList.add("timeline-item");

          timelineItem.innerHTML = `
            <span class="timeline-dot"></span>
            <div class="timeline-content">
              <span class="timeline-date">${item.date}</span>
              <h3>${item.title}</h3>
              <p class="timeline-company">${item.institution}</p>
            </div>
          `;
          educationTimeline.appendChild(timelineItem);
        });
      })
      .catch((error) =>
        console.error("Error fetching resume data:", error)
      );
  }
});
