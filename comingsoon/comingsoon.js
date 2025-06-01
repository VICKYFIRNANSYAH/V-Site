function goBack() {
  // Ganti dengan path atau URL halaman beranda kamu
  window.location.href = "index.html"; // contoh: "./home.html" atau "https://yourdomain.com"
}

// Set target date
const launchDate = new Date("2025-07-01T00:00:00").getTime();

const countdownEl = document.getElementById("countdown");

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = launchDate - now;

  if (diff <= 0) {
    clearInterval(timer);
    countdownEl.innerHTML = "Website Launched!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `Launching in ${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Particle effect
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 100 },
    },
  },
  retina_detect: true,
});
