document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // 1. Intersection Observer (Animações ao rolar a página)
    // ==========================================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    setTimeout(() => {
        document.querySelectorAll('.hero-content .reveal-up').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // ==========================================================
    // 2. Slider Antes/Depois 
    // ==========================================================
    const slider = document.getElementById('ba-slider');
    const imageBefore = document.getElementById('ba-image-before');
    const handle = document.getElementById('ba-handle');
    const line = document.getElementById('ba-line');

    if (slider && imageBefore && handle && line) {
        let isDragging = false;
        
        slider.addEventListener('input', (e) => {
            if (!isDragging) {
                window.requestAnimationFrame(() => {
                    const value = e.target.value;
                    imageBefore.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
                    handle.style.left = `${value}%`;
                    line.style.left = `${value}%`;
                    isDragging = false;
                });
                isDragging = true;
            }
        });
    }

   // ==========================================================
    // 3. Efeito Glassmorphism Dinâmico na Navbar (CORRIGIDO)
    // ==========================================================
    const navbar = document.querySelector('.navbar-glass');
    const heroSection = document.querySelector('.hero-section');
    
    if (navbar && heroSection) {
        window.addEventListener('scroll', () => {
            // Ajustamos o cálculo: agora a barra fica preta muito antes.
            // Subtraindo 350 pixels (ou cerca da metade da tela), garantimos
            // que o fundo preto apareça ANTES de o menu encostar no botão "Fazer Orçamento".
            const triggerPoint = heroSection.offsetHeight - 350;

            if (window.scrollY > triggerPoint) {
                // Estado: Rolou o suficiente (Preto com Blur antes de chegar no botão)
                navbar.style.background = 'rgba(5, 5, 5, 0.9)';
                navbar.style.backdropFilter = 'blur(16px)';
                navbar.style.webkitBackdropFilter = 'blur(16px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            } else {
                // Estado: Topo da página (100% Transparente)
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.webkitBackdropFilter = 'none';
                navbar.style.borderBottom = '1px solid transparent';
            }
        });
    }
});