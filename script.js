let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Toggle icon navbar
menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-x'); 
  navbar.classList.toggle('active');
};

// Scroll behavior
window.onscroll = () => {
  let top = window.scrollY;

  // Sticky navbar
  header.classList.toggle('sticky', top > 100);

  // Active section link
  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document
        .querySelector(`header nav a[href*=${id}]`)
        .classList.add('active');
    }
  });
};

// Tutup menu saat klik link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');
  });
});

// ScrollReveal
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portofolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed.js
const typed = new Typed('.multiple-text', {
  strings: ['Web Developer', 'Frontend Developer', 'Graphic Designer', 'Software Engineer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});
