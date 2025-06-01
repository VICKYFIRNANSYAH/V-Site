// Bagian 1: Menu, Sticky Header, Scroll Behavior
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const darkModeIcon = document.getElementById("darkMode-icon");
    const sections = document.querySelectorAll("section[id]");

    if (!menuIcon || !navbar || !sidebar || !header) {
      console.warn(
        "Elemen penting tidak ditemukan (menuIcon/navbar/sidebar/header)"
      );
      return;
    }

    // Toggle sidebar
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("fa-x");
      sidebar.classList.toggle("active");
    });

    // Tutup sidebar saat klik link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuIcon.classList.remove("fa-x");
        sidebar.classList.remove("active");

        // Active page highlight
        document
          .querySelectorAll(".sidebar .nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // Sticky header & active nav
    window.addEventListener("scroll", () => {
      menuIcon.classList.remove("fa-x");
      sidebar.classList.remove("active");

      let top = window.scrollY;

      // Sticky header
      header.classList.toggle("sticky", top > 100);

      // Highlight nav
      sections.forEach((sec) => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-link[href*="${id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    });
  });
})();

// Bagian 2: ScrollReveal & Typed.js
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // ScrollReveal
    if (typeof ScrollReveal !== "undefined") {
      const sr = ScrollReveal({
        distance: "80px",
        duration: 1000,
        delay: 200,
        reset: false, // supaya animasi cuma sekali
        easing: "ease-in-out",
      });

      sr.reveal(".home-content", { origin: "top" });
      sr.reveal(".home-img", { origin: "bottom", delay: 300 });
      sr.reveal(".services-container", { origin: "bottom", delay: 400 });
      sr.reveal(".recent-project-container", { origin: "bottom", delay: 500 });
      sr.reveal(".myexpert-container", { origin: "bottom", delay: 600 });

      sr.reveal(
        ".home-content h1, .all-services-wrapper, .all-projects-wrapper",
        {
          origin: "left",
          delay: 300,
        }
      );
      sr.reveal(".home-content p, .about-content", {
        origin: "right",
        delay: 300,
      });
    } else {
      console.warn("ScrollReveal tidak tersedia.");
    }

    // Typed.js
    if (typeof Typed !== "undefined") {
      new Typed(".multiple-text", {
        strings: [
          "Web Developer",
          "Frontend Developer",
          "Graphic Designer",
          "Software Engineer",
        ],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
      });
    } else {
      console.warn("Typed.js tidak tersedia.");
    }
  });
})();
