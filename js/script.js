// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const backToTop = document.querySelector('.back-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Inicializa as animações ao carregar a página
    initAnimations();
    
    // Adiciona os pontos do slider de depoimentos
    createTestimonialDots();
    
    // Inicializa o slider de depoimentos
    let currentSlide = 0;
    showTestimonialSlide(currentSlide);
    
    // Event Listeners
    window.addEventListener('scroll', function() {
        // Header fixo ao rolar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botão voltar ao topo
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Anima elementos quando entram na viewport
        animateOnScroll();
    });
    
    // Menu mobile toggle
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fecha o menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Remove a classe active de todos os links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
        });
    });
    
    // Filtro do portfólio
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtra os itens do portfólio
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Controles do slider de depoimentos
    prevBtn.addEventListener('click', function() {
        showTestimonialSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showTestimonialSlide(currentSlide + 1);
    });
    
    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Aqui você adicionaria o código para enviar o formulário para o servidor
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Formulário de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de inscrição na newsletter
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Aqui você adicionaria o código para enviar o email para o servidor
                alert(`Email ${emailInput.value} inscrito com sucesso!`);
                this.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Rolagem suave para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão voltar ao topo
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Funções
    
    // Inicializa as animações
    function initAnimations() {
        // Adiciona classes de animação aos elementos
        document.querySelectorAll('.hero-content h1, .hero-content p, .hero-buttons').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, 300 * index);
        });
        
        document.querySelector('.hero-image').classList.add('animated', 'slide-right');
        
        // Anima elementos visíveis na viewport inicial
        animateOnScroll();
    }
    
    // Anima elementos quando entram na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                // Adiciona um pequeno atraso para criar um efeito cascata
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Adiciona classes de animação específicas com base na posição
                    if (element.getBoundingClientRect().left < window.innerWidth / 2) {
                        element.classList.add('slide-left');
                    } else {
                        element.classList.add('slide-right');
                    }
                    
                    // Anima as barras de habilidades
                    if (element.classList.contains('skill-level')) {
                        const width = element.style.width;
                        element.style.width = '0';
                        setTimeout(() => {
                            element.style.width = width;
                        }, 100);
                    }
                }, Math.random() * 300);
            }
        });
    }
    
    // Verifica se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Cria os pontos do slider de depoimentos
    function createTestimonialDots() {
        for (let i = 0; i < testimonialSlides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                showTestimonialSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Mostra um slide específico do slider de depoimentos
    function showTestimonialSlide(n) {
        const dots = document.querySelectorAll('.dot');
        
        // Ajusta o índice se estiver fora dos limites
        if (n >= testimonialSlides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Esconde todos os slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('animated');
        });
        
        // Remove a classe active de todos os pontos
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostra o slide atual e ativa o ponto correspondente
        testimonialSlides[currentSlide].style.display = 'block';
        setTimeout(() => {
            testimonialSlides[currentSlide].classList.add('animated');
        }, 100);
        
        dots[currentSlide].classList.add('active');
    }
    
    // Atualiza o link ativo do menu com base na seção visível
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Atualiza o link ativo do menu ao rolar
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Chama a função uma vez para definir o link ativo inicial
    updateActiveNavLink();
}); 