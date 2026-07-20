document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const closeMenu = document.getElementById("close-menu");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  sidebar.setAttribute("aria-hidden", "true");

  // Fonction pour ouvrir le menu
  function openMenu() {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      sidebar.setAttribute("aria-hidden", "false");
      menuToggle.setAttribute("aria-expanded", "true");
  }

  // Fonction pour fermer le menu
  function closeSidebar() {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      sidebar.setAttribute("aria-hidden", "true");
      menuToggle.setAttribute("aria-expanded", "false");
  }

  // Événements pour ouvrir et fermer la sidebar
  menuToggle.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Ferme la sidebar quand on clique sur un lien du menu
  sidebar.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", closeSidebar);
  });
});