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