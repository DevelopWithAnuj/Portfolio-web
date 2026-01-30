const body = document.body;

/* ===============================
   LIGHT / DARK MODE
================================ */
const toggleBtn = document.getElementById("theme-toggle");

function initializeTheme() {
  const savedMode = localStorage.getItem("mode") || "dark";
  body.classList.toggle("light", savedMode === "light");
  toggleBtn.textContent = savedMode === "light" ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
  const isLight = body.classList.toggle("light");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("mode", isLight ? "light" : "dark");
});
