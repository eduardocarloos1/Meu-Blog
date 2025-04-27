// Dados simulados dos posts (em um projeto real, isso viria de uma API ou banco de dados)
const posts = [
    {
        id: 1,
        title: 'Como Começar com Programação Web',
        excerpt: 'Um guia completo para iniciantes que desejam aprender desenvolvimento web...',
        image: 'https://source.unsplash.com/random/800x600/?coding',
        category: 'Programação',
        date: '2024-03-15',
        views: 156
    },
    {
        id: 2,
        title: 'Dicas de Produtividade para Desenvolvedores',
        excerpt: 'Aprenda as melhores práticas para aumentar sua produtividade como desenvolvedor...',
        image: 'https://source.unsplash.com/random/800x600/?productivity',
        category: 'Carreira',
        date: '2024-03-14',
        views: 98
    },
    {
        id: 3,
        title: 'Tendências de Tecnologia para 2024',
        excerpt: 'Descubra as principais tendências tecnológicas que dominarão o mercado...',
        image: 'https://source.unsplash.com/random/800x600/?technology',
        category: 'Tecnologia',
        date: '2024-03-13',
        views: 234
    }
];

// Função para criar um card de post
function createPostCard(post) {
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="post-views">${post.views} visualizações</span>
                </div>
                <div class="share-buttons">
                    <button onclick="sharePost('whatsapp', ${post.id})">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    <button onclick="sharePost('twitter', ${post.id})">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button onclick="sharePost('linkedin', ${post.id})">
                        <i class="fab fa-linkedin"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Função para formatar a data
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para compartilhar posts
function sharePost(platform, postId) {
    const post = posts.find(p => p.id === postId);
    const postUrl = `${window.location.origin}/post/${postId}`;
    
    const shareUrls = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${postUrl}`)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${post.title}`)}&url=${encodeURIComponent(postUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    };

    window.open(shareUrls[platform], '_blank');
}

// Função para renderizar os posts
function renderPosts() {
    const featuredPosts = document.querySelector('.posts-grid');
    const recentPosts = document.querySelector('.posts-list');

    if (featuredPosts) {
        featuredPosts.innerHTML = posts
            .slice(0, 3)
            .map(post => createPostCard(post))
            .join('');
    }

    if (recentPosts) {
        recentPosts.innerHTML = posts
            .slice(3)
            .map(post => createPostCard(post))
            .join('');
    }
}

// Animação suave do scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adiciona classe active ao link do menu atual
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Efeito parallax na imagem de perfil
function parallaxEffect() {
    const profileImage = document.querySelector('.profile-frame');
    if (profileImage) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const percentX = (clientX / innerWidth - 0.5) * 20;
            const percentY = (clientY / innerHeight - 0.5) * 20;
            
            profileImage.style.transform = `perspective(1000px) rotateY(${percentX}deg) rotateX(${-percentY}deg)`;
        });
    }
}

// Animação dos cards de projeto
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Efeito de hover nos ícones de tecnologia
function techIconsEffect() {
    const icons = document.querySelectorAll('.tech-stack-icons i');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
            icon.style.color = 'var(--primary-color)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1)';
            icon.style.color = 'var(--text-color)';
        });
    });
}

// Inicializar o blog
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setActiveLink();
    parallaxEffect();
    animateProjectCards();
    techIconsEffect();
}); 