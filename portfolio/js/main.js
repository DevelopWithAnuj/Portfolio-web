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

let isMobileMenuOpen = false;
let firstFocusableElement;
let lastFocusableElement;

function openMenu() {
  menuToggle.classList.add("active");
  mobileMenu.classList.add("active");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";

  isMobileMenuOpen = true; // Set flag
  setTimeout(() => { // Allow menu to become visible before querying focusable elements
    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    firstFocusableElement.focus(); // Move focus to the first element in the menu
  }, 100); // Small delay to ensure menu is rendered and focusable
}

function closeMenu() {
  menuToggle.classList.remove("active");
  mobileMenu.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.style.overflow = "";

  isMobileMenuOpen = false; // Clear flag
  menuToggle.focus(); // Return focus to the menu button
}

menuToggle.addEventListener("click", () => {
  menuToggle.classList.contains("active") ? closeMenu() : openMenu();
});

backdrop.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ESC key close and Focus Trap for mobile menu
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMobileMenuOpen) {
    closeMenu();
    return;
  }

  if (e.key === "Tab" && isMobileMenuOpen) {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
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
// DYNAMICALLY LOAD PROJECTS
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  initializeTheme();

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
              <img src="${skill.icon}" alt="${skill.category}" loading="lazy" />
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
