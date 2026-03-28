import './style.css'

// --- Portfolio Data ---
const projects = [
  {
    category: "blockchain",
    title: "AetherGuard",
    description: "Privacy-first AI portfolio guardian for ETH Mumba 2026. Uses Merkle proofs and Fileverse to provide verifiable AI trading suggestions while keeping strategies 100% private.",
    tech: ["Solidity", "Merkle Proofs", "Fileverse", "AI"],
    github: "https://github.com/ritigya03/AetherGuard",
    demo: "#"
  },
  {
    category: "blockchain",
    title: "TON SwarmOS",
    description: "Decentralized protocol on TON enabling AI agents to function as independent economic actors with self-managed wallets and on-chain reputation.",
    tech: ["Tolk", "Node.js", "MCP SDK"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "blockchain",
    title: "Loyalty Layer",
    description: "TON-based Telegram Mini App enabling merchants to launch QR-based loyalty programs and accept real-time TON payments.",
    tech: ["Tolk", "React", "TonConnect"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "blockchain",
    title: "StableCoin-Fi",
    description: "Decentralized overcollateralized stablecoin protocol with automated liquidations and Chainlink integrations.",
    tech: ["Solidity", "Foundry", "Chainlink"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "blockchain",
    title: "SquadBNB",
    description: "Decentralized reading platform on BNB Chain where squads vote on books and earn rewards via consensus governance.",
    tech: ["Solidity", "React", "IPFS"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "fullstack",
    title: "Vocal-Mail",
    description: "Productivity-first desktop app that categorizes, summarizes, and reads out your emails using AI and Text-to-Speech.",
    tech: ["Electron", "React", "OpenRouter", "Murf TTS"],
    github: "https://github.com/Heeral03",
    demo: "https://drive.google.com/file/d/17XF_EKE4hOoKE5iNxAohLSOhVy1-3PGr/view?usp=sharing"
  },
  {
    category: "fullstack",
    title: "QR Payment & Loyalty",
    description: "Digital payment solution for small merchants with real-time transaction processing and escrow-based settlement.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "fullstack",
    title: "LifeTracker AI",
    description: "AI-powered goal tracker that decomposes abstract goals into actionable daily habits using Gemini API.",
    tech: ["MERN", "Gemini AI", "Tailwind"],
    github: "https://github.com/Heeral03",
    demo: "#"
  },
  {
    category: "ai",
    title: "Driving Assistance",
    description: "Real-time object detection and distance estimation for low-visibility conditions using YOLOv12-s.",
    tech: ["Python", "YOLOv12", "OpenCV"],
    github: "https://github.com/ritigya03/Driving-Assistance-Low-Visibility",
    demo: "#"
  }
];

const skills = [
  { name: "Solidity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" }
];

const achievements = [
  {
    title: "1st Prize - TON Dev Lab",
    description: "Awarded $850 for high-impact developer documentation and ecosystem contributions."
  },
  {
    title: "2nd Runner-Up - The Open Hack",
    description: "Awarded $500 at The Open Hack 2025 for Loyalty Layer solution."
  },
  {
    title: "Accepted - Uniswap Hook Incubator",
    description: "Shortlisted for UHI10 for real-time liquidation notifications hook idea."
  }
];

// --- Initialization & Logic ---

function injectSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  container.innerHTML = skills.map(s => `
    <div class="skill-card reveal interactive-card">
      <img src="${s.icon}" alt="${s.name}">
      <p>${s.name}</p>
      <div class="glow-point"></div>
    </div>
  `).join('');
}

function injectProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  
  container.innerHTML = filtered.map(p => `
    <div class="project-glass-card reveal interactive-card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tech-pile">
        ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
      <div class="project-actions">
        <a href="${p.github}" class="action-link" target="_blank">Repository</a>
        ${p.demo !== '#' ? `<a href="${p.demo}" class="action-link" target="_blank">Demo</a>` : ''}
      </div>
      <div class="glow-point"></div>
    </div>
  `).join('');
  
  // Re-init hooks for new elements
  initScrollReveal();
  initCardEffects();
}

function injectAchievements() {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  container.innerHTML = achievements.map(a => `
    <div class="achievement-glass reveal interactive-card">
      <h4>${a.title}</h4>
      <p>${a.description}</p>
      <div class="glow-point"></div>
    </div>
  `).join('');
}

// --- Card Effects (Tilt & Glow) ---
function initCardEffects() {
  const cards = document.querySelectorAll('.interactive-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update glow position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Calculate tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 10;
      const rotateY = (x - centerX) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });
}

// --- Typing Effect ---
function initTyping() {
  const target = document.getElementById('typed-text');
  const text = "Heeral Mandolia";
  let i = 0;
  
  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 150);
    }
  }
  
  // Start after loading screen
  setTimeout(type, 1500);
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(r => observer.observe(r));
}

// --- Tab Logic ---
function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      injectProjects(btn.dataset.tab);
    });
  });
}

// --- Glitter Particle System ---
class GlitterParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.init();
  }

  init() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 3 + 1; // Larger particles
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random();
    this.opacityChange = Math.random() * 0.03 + 0.02; // Faster twinkle
    this.color = Math.random() > 0.5 ? '#ff007f' : '#8a2be2';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.opacityChange;

    if (this.opacity > 1 || this.opacity < 0.2) {
      this.opacityChange *= -1;
    }

    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;
  }

  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    // Removed expensive shadowBlur for performance
  }
}

let particles = [];
function initGlitter() {
  const canvas = document.getElementById('glitter-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  const particleCount = window.innerWidth < 768 ? 50 : 120;
  particles = Array.from({ length: particleCount }, () => new GlitterParticle(canvas));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen'; // Brighter blend mode
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// --- App Start ---
document.addEventListener('DOMContentLoaded', () => {
  injectSkills();
  injectProjects();
  injectAchievements();
  initTabs();
  initGlitter();
  initCardEffects();

  // Loading Screen Timeout
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    if (screen) {
      screen.style.opacity = '0';
      setTimeout(() => screen.style.display = 'none', 400); // reduced from 800 to match css
    }
    initTyping();
  }, 200); // reduced from 1200

  initScrollReveal();
});
