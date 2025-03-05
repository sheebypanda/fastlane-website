document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const closeMenu = document.getElementById("close-menu");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Fonction pour ouvrir le menu
  function openMenu() {
      sidebar.classList.add("active");
      overlay.classList.add("active");
  }

  // Fonction pour fermer le menu
  function closeSidebar() {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
  }

  // Événements pour ouvrir et fermer la sidebar
  menuToggle.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});