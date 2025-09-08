// ====================
// Funciones al cargar DOM
// ====================
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.destination-item, .package-card, .testimonial-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Carrusel de testimonios
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) testimonial.classList.add('active');
        });
    }
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    if (testimonials.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 4000);
    }

    // Efecto parallax hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) hero.style.transform = `translateY(${scrolled * -0.5}px)`;
    });

    // Hover tarjetas destinos
    const destinationItems = document.querySelectorAll('.destination-item');
    destinationItems.forEach(item => {
        item.addEventListener('mouseenter', () => { item.style.transform = 'translateY(-10px) scale(1.02)'; });
        item.addEventListener('mouseleave', () => { item.style.transform = 'translateY(0) scale(1)'; });
    });

    // Validación formulario de contacto
    const contactForm = document.querySelector('.contact form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            if(name && email && message) {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Efecto de escritura hero
    const heroTitle = document.querySelector('.hero h2');
    if(heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if(i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // Contador animado precios
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const finalPrice = parseInt(price.textContent.replace('$',''));
        let currentPrice = 0;
        const increment = finalPrice / 50;
        const priceObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const counter = setInterval(() => {
                        currentPrice += increment;
                        if(currentPrice >= finalPrice) {
                            currentPrice = finalPrice;
                            clearInterval(counter);
                        }
                        price.textContent = '$' + Math.floor(currentPrice);
                    },30);
                    priceObserver.unobserve(entry.target);
                }
            });
        });
        priceObserver.observe(price);
    });

    // Efecto partículas hero
    function createParticles() {
        const hero = document.querySelector('.hero');
        if(!hero) return;
        for(let i=0; i<50; i++){
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                left: ${Math.random()*100}%;
                top: ${Math.random()*100}%;
                animation: float ${3+Math.random()*4}s ease-in-out infinite;
                animation-delay: ${Math.random()*2}s;
            `;
            hero.appendChild(particle);
        }
    }
    const style = document.createElement('style');
    style.textContent = `
        .particle { pointer-events: none; }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        .hero { position: relative; overflow: hidden; }

        /* Modal animaciones */
        #modalDestino { opacity:0; transition: opacity 0.4s ease; }
        #modalDestino.show { opacity:1; }
    `;
    document.head.appendChild(style);
    createParticles();

    // ====================
    // Modal Destinos con animación suave
    // ====================
    const destinos = [
        {
            titulo: "San Juan de los Lagos",
            imagen: "assets/images/San_Juan_de_los_Lagos.jpeg",
            descripcion:"Visita el famoso Santuario de San Juan de los Lagos, un destino lleno de fe, cultura y tradición.",
            precio:`
                <ul>
                    <li>$450.00 MXN por persona</li>
                </ul>
                <ul>
                    <li>$300 MXN Menores (Menores a 6 años.)</li>
                </ul>
            `
        },
        {
            titulo:"Hotel 'Los Angeles Locos', Tenacatita. Jal",
            imagen:"assets/images/Los_Angeles_Locos_Tenacatita.jpg",
            descripcion:"Un hotel todo incluido frente al mar, perfecto para disfrutar de playas espectaculares y actividades acuáticas. Disfruta de este viaje del 03 al 06 de noviembre del 2025.",
            precio:`
                <ul>
                    <li>Adultos - $6,650.00 MXN.</li>
                </ul>
                <ul>
                    <li>Junior (13 a 17 años) - $5,700.00 MXN.</li>
                </ul>
                <ul>
                    <li>Menor de 12 años (Solo asiento) - $1,200.00 MXN.</li>
                </ul>
            `
        },
        {
            titulo:"Hotel 'Oceano Palace, Mazatlán', Sinaloa",
            imagen:"assets/images/Oceano_Palace.jpg",
            descripcion:"Disfruta de Mazatlán con este paquete en el hotel Oceano Palace, ideal para vacaciones en familia o pareja. Disfruta de este viaje del 9 al 12 de Marzo del 2026.",
                precio:`
                <ul>
                    <li>Adultos - $7,700.00 MXN.</li>
                </ul>
                <ul>
                    <li>Junior (13 a 15 años) - $4,500.00 MXN.</li>
                </ul>
                <ul>
                    <li>Niños (6 a 12 años) - $3,400.00 MXN.</li>
                </ul>
            `
        },
        {
            titulo:"Hotel 'Tesoro Ixtapa', Ixtapa",
            imagen:"assets/images/Tesoro_Ixtapa.jpg",
            descripcion:"Relájate en Ixtapa con un plan todo incluido en el Hotel Tesoro. Playas paradisíacas y excelente gastronomía. El viaje incluye 4 dias y 3 noches, desayuno gratis y actividades en la playa. Disfruta de este viaje del 11 al 14 de Mayo del 2026.",
            precio:`
                <ul>
                    <li>Adultos - $7,800.00 MXN.</li>
                </ul>
                <ul>
                    <li>Junior (13 a 15 años) - $7,280.00 MXN.</li>
                </ul>
                <ul>
                    <li>Menores de 12 años - GRATIS.</li>
                </ul>
            `
        }
    ];

    const modal = document.getElementById("modalDestino");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalImagen = document.getElementById("modalImagen");
    const modalDescripcion = document.getElementById("modalDescripcion");
    const modalPrecio = document.getElementById("modalPrecio");
    const closeBtn = document.querySelector(".close");

    // Abrir modal con animación
    document.querySelectorAll(".destination-item").forEach((item,index)=>{
        item.addEventListener("click",()=>{
            const destino = destinos[index];
            modalTitulo.textContent = destino.titulo;
            modalImagen.src = destino.imagen;
            modalDescripcion.textContent = destino.descripcion; // descripción en texto plano
            modalPrecio.innerHTML = destino.precio; // precio con viñetas
            modal.style.display = "flex";
            setTimeout(()=>modal.classList.add("show"),10);
        });
    });

    // Cerrar modal con animación
    function cerrarModal() {
        modal.classList.remove("show");
        setTimeout(()=>modal.style.display="none",400);
    }
    closeBtn.addEventListener("click",cerrarModal);
    window.addEventListener("click",e=>{if(e.target===modal) cerrarModal();});

});
