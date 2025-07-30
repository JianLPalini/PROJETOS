// JS para interação do site Hidro RS

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
  /**
   * ROLAGEM SUAVE PARA ÂNCORAS DO SITE
   */
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * CARROSSEL AUTOMÁTICO E COM CONTROLES
   */
  const track = document.querySelector('.carousel-track');
  const carouselItem = track.querySelector('.carousel-item');
  const style = getComputedStyle(carouselItem);
  const width = carouselItem.offsetWidth;
  const marginRight = parseInt(style.marginRight);
  const scrollStep = width + marginRight; // Tamanho total a rolar por item

  let scrollAmount = 0;

  // Função que faz o carrossel rolar automaticamente
  function autoScrollCarousel() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    scrollAmount += scrollStep;

    // Reinicia do início se chegar ao fim
    if (scrollAmount > maxScrollLeft) scrollAmount = 0;

    track.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Inicia rolagem automática a cada 4 segundos
  setInterval(autoScrollCarousel, 4000);

  /**
   * CONTROLE MANUAL COM BOTÕES (se existirem no HTML)
   */
  document.querySelectorAll('.btn-carrossel').forEach(btn => {
    btn.addEventListener('click', () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      if (btn.classList.contains('esquerda')) {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = maxScrollLeft;
      } else {
        scrollAmount += scrollStep;
        if (scrollAmount > maxScrollLeft) scrollAmount = 0;
      }
      track.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
});
