(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "particle-cursor-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  let lastTouch = { x: canvas.width / 2, y: canvas.height / 2 };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function spawnParticles(x, y) {
    lastTouch = { x, y };
    for (let i = 0; i < 4; i++) {
      particles.push(new Particle(x, y));
    }
  }

  window.addEventListener("mousemove", (e) => {
    spawnParticles(e.clientX, e.clientY);
  });

  window.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnParticles(touch.clientX, touch.clientY);
      }
    },
    { passive: true }
  );

  const shapes = ["circle", "square", "triangle"];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 4;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.alpha = 1;
      this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.015;
    }

    draw() {
      ctx.fillStyle = `rgba(0, 238, 255, ${this.alpha})`;
      ctx.beginPath();
      switch (this.shape) {
        case "circle":
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          break;
        case "square":
          ctx.rect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
          break;
        case "triangle":
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
          break;
      }
      ctx.fill();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
