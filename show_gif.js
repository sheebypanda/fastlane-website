document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
    const staticBg = thumbnail.style.backgroundImage; // Sauvegarde l'image statique
    const gifBg = thumbnail.getAttribute('data-gif'); // Récupère le GIF

    thumbnail.addEventListener('mouseenter', () => {
      thumbnail.style.backgroundImage = `url('${gifBg}')`;
    });

    thumbnail.addEventListener('mouseleave', () => {
      thumbnail.style.backgroundImage = staticBg; // Remet l'image statique au départ
    });
  });

// Précharge les GIF une fois la page chargée pour éviter le délai au premier survol
window.addEventListener('load', () => {
  document.querySelectorAll('.video-thumbnail[data-gif]').forEach(thumbnail => {
    const img = new Image();
    img.src = thumbnail.getAttribute('data-gif');
  });
});