const bootLines = [
  "$ whoami",
  "Anuj Prajapati",
  "Frontend / Web Developer",
  "",

  "$ location",
  "Uttar Pradesh, India",
  "",

  "$ skills --primary",
  "• HTML5, CSS3, JavaScript (ES6+)",
  "• Responsive UI, Animations, Performance",
  "• DOM, AJAX, Vanilla JS",
  "",

  "$ skills --backend",
  "• Node.js, Express.js",
  "• MongoDB, Supabase",
  "• JWT Authentication",
  "",

  "$ mindset",
  "• Clean UI > Fancy UI",
  "• Performance matters",
  "• Learn by building",
  "",

  "$ availability",
  "Open for internships, freelance & junior roles",
  "",

  "$ contact",
  "Email: anujprajapati48031@gmail.com",
  "GitHub: github.com/DevelopWithAnuj",
  "",

  "$ type 'help' to continue",
];

const  terminalLines = [
  "$ whoami",
  "Anuj Prajapati — Frontend / Web Developer",
  "",
  "$ stack",
  "HTML • CSS • JavaScript • Node.js • MongoDB",
  "",
  "Type 'help' to see available commands",
];

const projectList = [
  "1. Anime & TV Series Tracker — Full-stack MERN platform",
  "2. Summer Training Frontend Projects — HTML & CSS",
  "3. Tour & Travel Booking Website — Vanilla JS app",
];

const terminal = document.getElementById("terminalOutput");
const output = document.querySelector(".terminal");

const cursor = document.createElement("span");
cursor.className = "terminal-cursor";
cursor.textContent = "█";

let terminalFocused = false;
let typingEnabled = false;
let input = "";

// ---------------- BOOT ----------------
function bootHome() {
  terminal.textContent = bootLines.join("\n") + "\n\n$ ";
  terminal.appendChild(cursor);
}

function bootFull() {
  terminal.textContent = terminalLines.join("\n") + "\n\n$ ";
  terminal.appendChild(cursor);
}

bootHome();

// ---------------- COMMANDS ----------------
const commands = {
  help: [
    "Available commands:",
    "• help            → show commands",
    "• projects        → view projects",
    "• cv              → download resume",
    "• theme light     → light mode",
    "• theme dark      → dark mode",
    "• clear           → reset terminal",
    "• home            → go to home",
  ],

  projects: () => projectList,

  cv: () => {
    window.open("public/Resume - Anuj Prajapati.pdf", "_blank");
    return ["Opening resume..."];
  },

  clear: () => {
    terminal.textContent = "";
    bootFull();
    return null;
  },

  home: () => {
    terminal.textContent = "";
    bootHome();
    return null;
  },

  theme: (arg) => {
    if (arg !== "light" && arg !== "dark") {
      return ["Usage: theme light | theme dark"];
    }

    document.body.classList.toggle("light", arg === "light");
    localStorage.setItem("theme", arg);

    return [`Theme switched to ${arg}`];
  },
};

// ---------------- COMMAND EXECUTION ----------------
function handleCommand(raw) {
  terminal.textContent += "\n";

  if (!raw) return;

  const [cmd, arg] = raw.split(" ");
  const action = commands[cmd];

  if (!action) {
    terminal.textContent += `Command not found: ${cmd}\n`;
    return;
  }

  const output = typeof action === "function" ? action(arg) : action;

  if (!output) return;

  output.forEach((line) => {
    terminal.textContent += line + "\n";
  });
}

// ---------------- REDRAW ----------------
function redraw() {
  cursor.remove();

  const lines = terminal.textContent.split("\n");
  lines[lines.length - 1] = `$ ${input}`;
  terminal.textContent = lines.join("\n");

  terminal.appendChild(cursor);
  terminal.scrollTop = terminal.scrollHeight;
}

let terminalActive = false;

terminal.addEventListener("mousedown", () => {
  terminalFocused = true;
  typingEnabled = true; // typing starts ONLY after click
  output.focus();
});

document.addEventListener("mousedown", (e) => {
  if (!terminal.contains(e.target)) {
    terminalFocused = false;
    typingEnabled = false;
  }
});

document.addEventListener("keydown", (e) => {
  if (!typingEnabled) return;

  const blockKeys = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown"];
  if (blockKeys.includes(e.key)) e.preventDefault();

  if (e.key === "Escape") {
    typingEnabled = false;
    terminalFocused = false;
    return;
  }

  if (e.key === "Backspace") {
    input = input.slice(0, -1);
    redraw();
    return;
  }

  if (e.key === "Enter") {
    handleCommand(input.trim());
    input = "";
    redraw();
    return;
  }

  if (e.key.length === 1) {
    input += e.key;
    redraw();
  }
});
