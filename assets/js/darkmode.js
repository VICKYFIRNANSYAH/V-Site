document.addEventListener("DOMContentLoaded", () => {
  const darkModeIcon = document.getElementById("darkMode-icon");

  if (!darkModeIcon) return;

  darkModeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      darkModeIcon.classList.replace("fa-sun", "fa-moon");
    }
  });
});
