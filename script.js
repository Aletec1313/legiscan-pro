// Legiscan Pro - JavaScript Interactivo
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Calculadora IGIC
    const igicForm = document.getElementById('igicForm');
    const resultadoIgic = document.getElementById('resultadoIgic');

    igicForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const importe = parseFloat(document.getElementById('importe').value);
        const tipoCalculo = document.getElementById('tipoCalculo').value;
        const tipoIgic = parseFloat(document.getElementById('tipoIgic').value);

        if (!importe || importe <= 0) {
            alert('Por favor introduce un importe válido');
            return;
        }

        let resultado;
        if (tipoCalculo === 'sin') {
            // Precio sin IGIC → Precio con IGIC
            const igic = importe * (tipoIgic / 100);
            const total = importe + igic;
            resultado = {
                base: importe,
                igic: igic,
                total: total
            };
        } else {
            // Precio con IGIC → Precio sin IGIC
            const base = importe / (1 + tipoIgic / 100);
            const igic = importe - base;
            resultado = {
                base: base,
                igic: igic,
                total: importe
            };
        }

        resultadoIgic.innerHTML = `
            <div class="resultado-caja">
                <div class="resultado-item">
                    <span>Base imponible:</span>
                    <strong>${resultado.base.toFixed(2)} €</strong>
                </div>
                <div class="resultado-item">
                    <span>IGIC (${tipoIgic}%):</span>
                    <strong>${resultado.igic.toFixed(2)} €</strong>
                </div>
                <div class="resultado-item total">
                    <span>Total:</span>
                    <strong>${resultado.total.toFixed(2)} €</strong>
                </div>
            </div>
        `;
        resultadoIgic.style.display = 'block';
    });

    // Animaciones en scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.servicio-card, .feature-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulación de envío
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        this.reset();
    });
});

// AOS (Animate On Scroll) fallback
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}
