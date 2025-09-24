// Datos de testimonios dinámicos
const testimonials = [
    {
        text: "Una experiencia inolvidable, todo perfectamente organizado. El equipo de Viajes Turísticos Anita superó todas mis expectativas.",
        author: "María González",
        rating: 5
    },
    {
        text: "Los mejores viajes que he hecho, atención de primera. Cada detalle fue cuidadosamente planificado.",
        author: "Juan Pérez",
        rating: 5
    },
    {
        text: "Volveré a viajar con Viajes Turísticos Anita sin dudarlo. Profesionalismo y calidad en cada momento.",
        author: "Ana Rodríguez",
        rating: 5
    },
    {
        text: "Increíble aventura en las montañas de Boyacá. Los guías fueron excepcionales y muy conocedores.",
        author: "Carlos Mendoza",
        rating: 5
    },
    {
        text: "El paquete de playa fue perfecto. Hotel de lujo y actividades muy bien organizadas.",
        author: "Laura Jiménez",
        rating: 5
    }
];

// Datos de destinos para el modal
const destinationData = {
    "san-juan": {
        title: "San Juan de los Lagos",
        description: "Visita el famoso Santuario de San Juan de los Lagos, un destino lleno de fe, cultura y tradición.",
        image: "Imagenes/images/San_Juan_de_los_Lagos.jpeg",
        pricing: [
            "Adultos: $450.00 MXN por persona",
            "Menores (menores de 6 años): $300.00 MXN"
        ],
        dates: "Disfruta de este viaje el dia 30 de Noviembre del 2025."
    },
    "tenacatita": {
        title: "Hotel \"Los Angeles Locos\", Tenacatita, Jal.",
        description: "Un hotel todo incluido frente al mar, perfecto para disfrutar de playas espectaculares y actividades acuáticas.",
        image: "Imagenes/images/Los_Angeles_Locos_Tenacatita.jpg",
        pricing: [
            "Adultos: $6,650.00 MXN",
            "Junior (13 a 17 años): $5,700.00 MXN",
            "Menor de 12 años (solo asiento): $1,200.00 MXN"
        ],
        dates: "Disfruta de este viaje del 03 al 06 de noviembre del 2025."
    },
    "mazatlan": {
        title: "Hotel \"Oceano Palace, Mazatlán\", Sinaloa",
        description: "Disfruta de Mazatlán con este paquete en el hotel Oceano Palace, ideal para vacaciones en familia o pareja.",
        image: "Imagenes/images/Oceano_Palace.jpg",
        pricing: [
            "Adultos: $7,700.00 MXN",
            "Junior (13 a 15 años): $4,500.00 MXN",
            "Niños (6 a 12 años): $3,400.00 MXN"
        ],
        dates: "Disfruta de este viaje del 09 al 12 de marzo del 2026."
    },
    "ixtapa": {
        title: "Hotel \"Tesoro Ixtapa\", Ixtapa",
        description: "Relájate en Ixtapa con un plan todo incluido en el Hotel Tesoro. Playas paradisíacas y excelente gastronomía. El viaje incluye 4 días y 3 noches, desayuno gratis y actividades en la playa.",
        image: "Imagenes/images/Tesoro_Ixtapa.jpg",
        pricing: [
            "Adultos: $7,800.00 MXN",
            "Junior (13 a 15 años): $7,280.00 MXN",
            "Menores de 12 años: GRATIS"
        ],
        dates: "Disfruta de este viaje del 11 al 14 de mayo del 2026."
    }
    "ixtapa": {
        title: "Viaje, México",
        description: "Relájate en México y disfruta todos los destinos que tenemos por visitar.",
        image: "Imagenes/images/Viaje_Mexico.jpg",
        pricing: [
            "Adultos: $3,300.00 MXN",
            "Niños mayores de 6 años (Con asiento): $2,500.00"
            "Aparta tu asiento con $500.00"
        ],
        dates: "Disfruta de este viaje del 28 al 31 de mayo del 2026."
    }
};

// Datos de paquetes para el modal de reservas
const packageData = {
    religioso: {
        title: "Turismo Religioso",
        description: "Visita los santuarios más importantes de México, incluyendo San Juan de los Lagos y otros destinos de fe. Una experiencia espiritual única.",
        price: "$1200",
        features: ["3 días / 2 noches", "Transporte incluido", "Guía especializado", "Hospedaje cómodo"]
    },
    playa: {
        title: "Escapada a la Playa",
        description: "Relájate en las mejores playas del Pacífico mexicano con hoteles de primera calidad frente al mar.",
        price: "$950",
        features: ["4 días / 3 noches", "Hotel frente al mar", "Desayunos incluidos", "Actividades acuáticas"]
    },
    familiar: {
        title: "Viaje Familiar",
        description: "Paquetes diseñados especialmente para familias con actividades para todas las edades y comodidades pensadas en los más pequeños.",
        price: "$800",
        features: ["5 días / 4 noches", "Habitaciones familiares", "Actividades para niños", "Comidas incluidas"]
    }
};

// Variables globales
let currentTestimonial = 0;
let testimonialInterval;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeTestimonials();
    initializeParallax();
    initializeFormValidation();
    initializeDestinationGallery();
    initializePackageReservations();
    initializeMobileMenu();
    initializeHeaderScroll();
    initializeCTAButton();
});

// Navegación suave mejorada
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('active');
                }
            }
        });
    });
}

// Animaciones al hacer scroll mejoradas
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación especial para contadores de precios
                if (entry.target.classList.contains('price')) {
                    animatePrice(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.destination-item, .package-card, .testimonial-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Observar precios para animación de contador
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        observer.observe(price);
    });
}

// Animación de contador para precios
function animatePrice(priceElement) {
    const finalPrice = parseInt(priceElement.textContent.replace('$', '').replace(',', ''));
    let currentPrice = 0;
    const increment = finalPrice / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        currentPrice += increment;
        if (currentPrice >= finalPrice) {
            currentPrice = finalPrice;
            clearInterval(counter);
        }
        priceElement.textContent = '$' + Math.floor(currentPrice).toLocaleString();
    }, stepTime);
}

// Sistema de testimonios mejorado
function initializeTestimonials() {
    const container = document.querySelector('.testimonial-container');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!container) return;
    
    // Crear testimonios dinámicamente
    container.innerHTML = '';
    if (indicatorsContainer) indicatorsContainer.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        // Crear elemento de testimonio
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial-item';
        if (index === 0) testimonialElement.classList.add('active');
        
        testimonialElement.innerHTML = `
            <p>"${testimonial.text}"</p>
            <h4>- ${testimonial.author}</h4>
            <div class="rating">
                ${'★'.repeat(testimonial.rating)}
            </div>
        `;
        
        container.appendChild(testimonialElement);
        
        // Crear indicador
        if (indicatorsContainer) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => showTestimonial(index));
            indicatorsContainer.appendChild(indicator);
        }
    });
    
    // Event listeners para botones
    if (prevBtn) prevBtn.addEventListener('click', previousTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    
    // Auto-play
    startTestimonialAutoplay();
    
    // Pausar auto-play al hover
    container.addEventListener('mouseenter', stopTestimonialAutoplay);
    container.addEventListener('mouseleave', startTestimonialAutoplay);
}

function showTestimonial(index) {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    testimonialItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (testimonialItems[index]) testimonialItems[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
    
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function startTestimonialAutoplay() {
    stopTestimonialAutoplay();
    testimonialInterval = setInterval(nextTestimonial, 4000);
}

function stopTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
}

// Efecto parallax mejorado
function initializeParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Validación de formulario mejorada
function initializeFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validaciones específicas
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'El nombre es requerido';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'El correo electrónico es requerido';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Por favor ingresa un correo electrónico válido';
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                errorMessage = 'Por favor ingresa un número de teléfono válido';
                isValid = false;
            }
            break;
            
        case 'interest':
            if (!value) {
                errorMessage = 'Por favor selecciona tu interés';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'El mensaje es requerido';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            }
            break;
    }
    
    showFieldError(field, errorMessage);
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.toggle('show', !!message);
    }
    
    field.style.borderColor = message ? 'var(--error-color)' : '';
}

function clearError(field) {
    showFieldError(field, '');
}

function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Simular envío
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        if (successMessage) {
            successMessage.textContent = '¡Mensaje enviado exitosamente! Te contactaremos pronto.';
            successMessage.classList.add('show');
        }
        
        form.reset();
        submitBtn.textContent = 'Enviar Mensaje';
        submitBtn.disabled = false;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            if (successMessage) successMessage.classList.remove('show');
        }, 5000);
    }, 1500);
}

// Galería de destinos con modal mejorado
function initializeDestinationGallery() {
    const destinationItems = document.querySelectorAll('.destination-item');
    const modal = document.getElementById('destination-modal');
    const modalClose = modal?.querySelector('.modal-close');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    
    destinationItems.forEach(item => {
        item.addEventListener('click', function() {
            const destination = this.dataset.destination;
            const data = destinationData[destination];
            
            if (data && modal) {
                // Actualizar contenido del modal
                const modalImage = modal.querySelector('.modal-image');
                const modalTitle = modal.querySelector('.modal-title');
                const modalDescription = modal.querySelector('.modal-description');
                const pricingList = modal.querySelector('.pricing-list');
                const travelDates = modal.querySelector('.travel-dates');
                
                if (modalImage) {
                    modalImage.src = data.image;
                    modalImage.alt = data.title;
                }
                if (modalTitle) modalTitle.textContent = data.title;
                if (modalDescription) modalDescription.textContent = data.description;
                
                // Llenar lista de precios con viñetas
                if (pricingList && data.pricing) {
                    pricingList.innerHTML = '';
                    data.pricing.forEach(price => {
                        const li = document.createElement('li');
                        li.textContent = price;
                        pricingList.appendChild(li);
                    });
                }
                
                // Mostrar fechas si existen
                if (travelDates) {
                    if (data.dates) {
                        travelDates.textContent = data.dates;
                        travelDates.parentElement.style.display = 'block';
                    } else {
                        travelDates.parentElement.style.display = 'none';
                    }
                }
                
                // Mostrar modal con animación
                openModal(modal);
            }
        });
    });
    
    // Cerrar modal con botón X
    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal(modal));
    }
    
    // Cerrar modal haciendo clic en el overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => closeModal(modal));
    }
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });
}

// Función para abrir modal con animación
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Forzar reflow para que la animación funcione
    modal.offsetHeight;
    
    modal.classList.add('show');
}

// Función para cerrar modal con animación
function closeModal(modal) {
    modal.classList.add('closing');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        document.body.style.overflow = '';
    }, 300);
}

// Sistema de reservas de paquetes
function initializePackageReservations() {
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    const bookingModal = document.getElementById('booking-modal');
    const modalClose = bookingModal?.querySelector('.modal-close');
    
    reserveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.dataset.package;
            const data = packageData[packageType];
            
            if (data && bookingModal) {
                const bookingTitle = bookingModal.querySelector('.booking-title');
                const bookingDescription = bookingModal.querySelector('.booking-description');
                const bookingPrice = bookingModal.querySelector('.booking-price');
                
                if (bookingTitle) bookingTitle.textContent = data.title;
                if (bookingDescription) bookingDescription.textContent = data.description;
                if (bookingPrice) bookingPrice.textContent = `Precio: ${data.price}`;
                
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Cerrar modal de reserva
    if (modalClose) {
        modalClose.addEventListener('click', closeBookingModal);
    }
    
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
        
        // Manejar envío del formulario de reserva
        const bookingForm = bookingModal.querySelector('.booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simular reserva
                alert('¡Reserva enviada exitosamente! Te contactaremos para confirmar los detalles.');
                closeBookingModal();
                bookingForm.reset();
            });
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Menú móvil mejorado
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animación del icono hamburguesa
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
}

// Header con efecto scroll
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Botón CTA del hero
function initializeCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const destinationsSection = document.getElementById('destinos');
            if (destinationsSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = destinationsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Efecto de escritura para el eslogan (mejorado)
function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero h2');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent-color)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Efecto de cursor parpadeante
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Iniciar después de un delay
    setTimeout(typeWriter, 1500);
}

// Inicializar efecto de escritura cuando la página carga
window.addEventListener('load', initializeTypewriterEffect);

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de rendimiento para scroll
const optimizedScrollHandler = debounce(function() {
    // Aquí se pueden agregar más funciones de scroll optimizadas
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Preloader (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

