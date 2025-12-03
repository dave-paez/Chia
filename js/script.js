// ========================================
// ANIMACIÓN DE CARGA ENTRE PÁGINAS
// ========================================

// Crear el loader
window.addEventListener('DOMContentLoaded', () => {
  // Crear elemento loader
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="spinner"></div>
      <div class="loader-text">CHÍA</div>
    </div>
  `;
  document.body.insertBefore(loader, document.body.firstChild);
  
  // Ocultar loader cuando la página esté completamente cargada
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.add('page-loaded');
  }, 500);
});

// Mostrar loader al hacer clic en enlaces internos
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href$=".html"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Solo aplicar a links internos (no externos ni anclas)
      if (href && href.includes('.html') && !this.target) {
        e.preventDefault();
        
        const loader = document.getElementById('page-loader');
        loader.classList.remove('hidden');
        
        // Navegar después de mostrar el loader
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
});


// ========================================
// BOTÓN SCROLL TO TOP
// ========================================
const btnUp = document.getElementById("btn-up");

if (btnUp) {
  // Mostrar / ocultar botón
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnUp.classList.add("show");
    } else {
      btnUp.classList.remove("show");
    }
  });

  // Función de desplazamiento suave manual
  function smoothScrollUp() {
    const current = window.scrollY;
    if (current > 0) {
      window.scrollBy(0, -80);
      requestAnimationFrame(smoothScrollUp);
    }
  }

  // Clic del botón
  btnUp.addEventListener("click", () => {
    requestAnimationFrame(smoothScrollUp);
  });
}


// ========================================
// CARRUSEL (SOLO EN INDEX)
// ========================================
const myCarousel = document.querySelector('#carouselExampleDark');

if (myCarousel && typeof bootstrap !== 'undefined') {
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    ride: 'carousel',
    pause: false,
    wrap: true
  });
}


// ========================================
// SISTEMA DE ANIMACIONES AL SCROLL
// ========================================

let lastScrollTop = 0;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100 &&
    rect.bottom >= 0
  );
}

function animateOnScroll() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Animar todos los elementos con clases de animación (páginas normales)
  const elementsToAnimate = document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .accordion-item'
  );
  
  elementsToAnimate.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add('animate-in');
    }
  });
  
  // ========================================
  // EFECTO DE APARECER/DESAPARECER SECCIONES
  // Para empresa.html, index.html y otras páginas
  // ========================================
  const sections = document.querySelectorAll('main section');
  
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Si la sección está en el viewport - APARECER
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      section.classList.add('animate-in');
      section.classList.remove('fade-out-up', 'fade-out-down');
    }
    // Si la sección está arriba fuera del viewport - DESAPARECER ARRIBA
    else if (rect.bottom < 0) {
      section.classList.remove('animate-in');
      section.classList.add('fade-out-up');
    }
    // Si la sección está abajo fuera del viewport - DESAPARECER ABAJO
    else if (rect.top > windowHeight) {
      section.classList.remove('animate-in');
      section.classList.add('fade-out-down');
    }
  });
  
  // También aplicar al footer
  const footer = document.querySelector('footer');
  if (footer) {
    const rect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      footer.classList.add('animate-in');
      footer.classList.remove('fade-out-down');
    } else if (rect.top > windowHeight) {
      footer.classList.remove('animate-in');
      footer.classList.add('fade-out-down');
    }
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Ejecutar al hacer scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      animateOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});


// ========================================
// CONFIGURAR ANIMACIONES AL CARGAR
// ========================================
window.addEventListener('load', () => {
  
  console.log('🎬 Iniciando configuración de animaciones...');
  
  // ========================================
  // ANIMAR LOGO
  // ========================================
  const logos = document.querySelectorAll('header .logo');
  console.log('Logos encontrados:', logos.length);
  logos.forEach(logo => {
    logo.classList.add('animate-logo');
  });

  
  // ========================================
  // TARJETAS DE PRODUCTOS (MISMO EFECTO EN TODAS LAS PÁGINAS)
  // ========================================
  const cards = document.querySelectorAll('.card');
  console.log('Tarjetas encontradas:', cards.length);
  cards.forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    // Animar texto dentro de las tarjetas
    const cardText = card.querySelector('.card-text, p');
    if (cardText) {
      cardText.classList.add('fade-in-up');
      cardText.style.opacity = '0';
      cardText.style.transform = 'translateY(20px)';
      cardText.style.transitionDelay = `${(index * 0.2) + 0.3}s`;
    }
  });

  
  // ========================================
  // TÍTULOS H2
  // ========================================
  const titles = document.querySelectorAll('main h2, section h2');
  console.log('Títulos h2 encontrados:', titles.length);
  titles.forEach((title, index) => {
    title.classList.add('fade-in-left');
    title.style.opacity = '0';
    title.style.transform = 'translateX(-50px)';
  });

  
  // ========================================
  // TEXTOS H4 (HISTORIA, MISIÓN, ETC)
  // ========================================
  const h4Texts = document.querySelectorAll('section h4');
  console.log('Textos h4 encontrados:', h4Texts.length);
  h4Texts.forEach((h4, index) => {
    h4.classList.add('fade-in-left');
    h4.style.opacity = '0';
    h4.style.transform = 'translateX(-30px)';
  });

  
  // ========================================
  // IMÁGENES EN SECCIONES
  // ========================================
  const sectionImages = document.querySelectorAll('section img:not(.logo):not(.card-img-top)');
  console.log('Imágenes de sección encontradas:', sectionImages.length);
  sectionImages.forEach((img, index) => {
    img.classList.add('fade-in-scale');
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
  });

  
  // ========================================
  // IFRAME DEL MAPA
  // ========================================
  const iframes = document.querySelectorAll('iframe');
  console.log('Iframes encontrados:', iframes.length);
  iframes.forEach(iframe => {
    iframe.classList.add('fade-in-up');
    iframe.style.opacity = '0';
    iframe.style.transform = 'translateY(30px)';
  });

  
  // ========================================
  // FORMULARIO
  // ========================================
  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    console.log('Formulario encontrado');
    formContainer.classList.add('fade-in-right');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateX(50px)';
  }

  
  // ========================================
  // ACCORDION (PREGUNTAS FRECUENTES)
  // ========================================
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    console.log('Items de accordion encontrados:', accordionItems.length);
    accordionItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  }

  
  // ========================================
  // TODAS LAS SECCIONES (PARA INDEX Y OTRAS PÁGINAS)
  // ========================================
  const allSections = document.querySelectorAll('main section');
  console.log('Secciones encontradas:', allSections.length);
  console.log('Ruta actual:', window.location.pathname);
  
  allSections.forEach((section, index) => {
    // Solo agregar si no está en empresa.html (que tiene animación especial)
    if (!window.location.pathname.includes('empresa.html')) {
      console.log('Configurando sección', index);
      section.classList.add('fade-in-up');
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = `all 0.8s ease ${index * 0.15}s`;
    }
  });

  
  // ========================================
  // FOOTER
  // ========================================
  const footer = document.querySelector('footer');
  if (footer) {
    console.log('Footer encontrado');
    footer.classList.add('fade-in-up');
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(50px)';
    footer.style.transition = 'all 0.8s ease 0.3s';
  }

  
  // Ejecutar animaciones iniciales después de configurar
  setTimeout(() => {
    console.log('🎯 Ejecutando animaciones...');
    animateOnScroll();
  }, 100);
});


// ========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});