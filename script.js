// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initTypewriter();
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
    initContactForm();
    initCurrentYear();
    initSmoothScroll();
    initTimelineProgress();
});

// Barra de Progresso de Scroll
function initScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Ano Atual no Footer
function initCurrentYear() {
    var yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Navegação
function initNavbar() {
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    if (!navbar) return;

    var ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                var current = '';
                sections.forEach(function(section) {
                    var sectionTop = section.offsetTop - 150;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Menu Mobile
function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        var isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            hamburger.focus();
        }
    });
}

// Typewriter
function initTypewriter() {
    var element = document.getElementById('typewriter');
    if (!element) return;

    var texts = [
        'Desenvolvedor Full Stack Júnior',
        'JavaScript | Python | Java',
        'Estudante de Eng. de Software',
        'HTML5 | CSS3 | APIs REST',
        'Git & GitHub'
    ];

    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function type() {
        var currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        var typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Animações de Scroll
function initScrollAnimations() {
    var animateElements = document.querySelectorAll(
        '.info-card, .skill-card, .project-card, .timeline-item, .education-card, .soft-skill-tag'
    );

    if (animateElements.length === 0) return;

    animateElements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function(el) { observer.observe(el); });
}

// Barras de Skills
function initSkillBars() {
    var skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var progress = entry.target.querySelector('.skill-progress');
                if (progress) {
                    var level = progress.getAttribute('data-progress');
                    setTimeout(function() {
                        progress.style.width = level + '%';
                    }, 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(function(card) { observer.observe(card); });
}

// Botão Voltar ao Topo
function initBackToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Formulário de Contato
function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var nameInput = form.querySelector('#name');
    var emailInput = form.querySelector('#email');
    var subjectInput = form.querySelector('#subject');
    var messageInput = form.querySelector('#message');

    // Validação em tempo real
    nameInput.addEventListener('blur', function() { validateField(this, 'name'); });
    emailInput.addEventListener('blur', function() { validateField(this, 'email'); });
    subjectInput.addEventListener('blur', function() { validateField(this, 'subject'); });
    messageInput.addEventListener('blur', function() { validateField(this, 'message'); });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var isValid = true;

        if (!validateField(nameInput, 'name')) isValid = false;
        if (!validateField(emailInput, 'email')) isValid = false;
        if (!validateField(subjectInput, 'subject')) isValid = false;
        if (!validateField(messageInput, 'message')) isValid = false;

        if (!isValid) {
            showNotification('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '&#8987; Enviando...';
        submitBtn.disabled = true;

        setTimeout(function() {
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            form.reset();
            form.querySelectorAll('input, textarea').forEach(function(input) {
                input.classList.remove('success', 'error');
            });
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function validateField(input, type) {
    var value = input.value.trim();
    var errorElement = document.getElementById(type + '-error');
    var isValid = true;
    var message = '';

    switch(type) {
        case 'name':
            if (!value) {
                isValid = false;
                message = 'Por favor, insira seu nome.';
            } else if (value.length < 2) {
                isValid = false;
                message = 'Nome deve ter pelo menos 2 caracteres.';
            }
            break;
        case 'email':
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                message = 'Por favor, insira seu e-mail.';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Por favor, insira um e-mail válido.';
            }
            break;
        case 'subject':
            if (!value) {
                isValid = false;
                message = 'Por favor, insira o assunto.';
            }
            break;
        case 'message':
            if (!value) {
                isValid = false;
                message = 'Por favor, insira sua mensagem.';
            } else if (value.length < 10) {
                isValid = false;
                message = 'Mensagem deve ter pelo menos 10 caracteres.';
            }
            break;
    }

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
    }

    return isValid;
}

// Notificação
function showNotification(message, type) {
    var existing = document.querySelector('.notification');
    if (existing) existing.remove();

    var notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;

    notification.style.position = 'fixed';
    notification.style.bottom = '2rem';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%) translateY(100px)';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '12px';
    notification.style.fontSize = '0.95rem';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
    notification.style.background = type === 'success' ? '#22c55e' : '#ef4444';
    notification.style.color = 'white';
    notification.style.maxWidth = '90%';
    notification.style.textAlign = 'center';

    document.body.appendChild(notification);

    setTimeout(function() {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(function() {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(function() { notification.remove(); }, 300);
    }, 5000);
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var href = this.getAttribute('href');
            
            if (!href || href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            var target = document.querySelector(href);
            if (target) {
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Atualizar foco para acessibilidade
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
}

// Timeline Progress Animation
function initTimelineProgress() {
    var timeline = document.querySelector('.timeline');
    var items = document.querySelectorAll('.timeline-item');
    if (!timeline || items.length === 0) return;

    var activeItem = null;

    function setActive(item) {
        if (activeItem === item) return;
        if (activeItem) activeItem.classList.remove('active');
        activeItem = item;
        item.classList.add('active');
        updateLine(item);
    }

    function updateLine(item) {
        if (!item) return;
        var dot = item.querySelector('.timeline-dot');
        var timelineRect = timeline.getBoundingClientRect();
        var dotRect = dot.getBoundingClientRect();
        var offset = dotRect.top - timelineRect.top + dot.offsetHeight / 2;
        timeline.style.setProperty('--timeline-progress', offset + 'px');
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                setActive(entry.target);
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '-10% 0px -30% 0px'
    });

    items.forEach(function(item) { observer.observe(item); });

    window.addEventListener('scroll', function() {
        requestAnimationFrame(function() {
            if (activeItem) updateLine(activeItem);
        });
    });
}
