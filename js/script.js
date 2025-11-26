const btnUp = document.getElementById("btn-up");

// Mostrar / ocultar botón
window.addEventListener("scroll", () => {
  btnUp.style.display = window.scrollY > 300 ? "flex" : "none";
});

// Función de desplazamiento suave manual
function smoothScrollUp() {
  const current = window.scrollY;

  if (current > 0) {
    window.scrollBy(0, -30); // velocidad de subida (más negativo = más rápido)
    requestAnimationFrame(smoothScrollUp);
  }
}

// Clic del botón
btnUp.addEventListener("click", () => {
  requestAnimationFrame(smoothScrollUp);
});

const myCarousel = document.querySelector('#carouselExampleDark');

const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 3000,  // Cambia cada 3 segundos
  ride: 'carousel',
  pause: false,    // No se detiene cuando pasas el mouse
  wrap: true       // Cuando llega al final vuelve al inicio
});
