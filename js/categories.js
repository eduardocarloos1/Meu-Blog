// Dados simulados dos posts por categoria
const categoryPosts = {
    programacao: [
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
            id: 4,
            title: 'Dominando JavaScript Moderno',
            excerpt: 'Aprenda as features mais recentes do JavaScript e como utilizá-las...',
            image: 'https://source.unsplash.com/random/800x600/?javascript',
            category: 'Programação',
            date: '2024-03-12',
            views: 89
        }
    ],
    tecnologia: [
        {
            id: 3,
            title: 'Tendências de Tecnologia para 2024',
            excerpt: 'Descubra as principais tendências tecnológicas que dominarão o mercado...',
            image: 'https://source.unsplash.com/random/800x600/?technology',
            category: 'Tecnologia',
            date: '2024-03-13',
            views: 234
        }
    ],
    carreira: [
        {
            id: 2,
            title: 'Dicas de Produtividade para Desenvolvedores',
            excerpt: 'Aprenda as melhores práticas para aumentar sua produtividade como desenvolvedor...',
            image: 'https://source.unsplash.com/random/800x600/?productivity',
            category: 'Carreira',
            date: '2024-03-14',
            views: 98
        }
    ],
    design: [
        {
            id: 5,
            title: 'Princípios de UI/UX Design',
            excerpt: 'Entenda os fundamentos do design de interfaces e experiência do usuário...',
            image: 'https://source.unsplash.com/random/800x600/?design',
            category: 'Design',
            date: '2024-03-11',
            views: 145
        }
    ]
};

class CategoryManager {
    constructor() {
        this.selectedCategory = 'todos';
        this.categoryCards = document.querySelectorAll('.category-card');
        this.categoryPostsContainer = document.getElementById('categoryPosts');
        this.selectedCategoryText = document.getElementById('selectedCategory');
        
        this.init();
    }

    init() {
        // Adicionar eventos de clique nas categorias
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.selectCategory(category);
            });
        });

        // Carregar todos os posts inicialmente
        this.loadAllPosts();
    }

    selectCategory(category) {
        // Atualizar seleção visual
        this.categoryCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.category === category) {
                card.classList.add('active');
            }
        });

        // Atualizar categoria selecionada
        this.selectedCategory = category;
        this.selectedCategoryText.textContent = this.getCategoryName(category);

        // Carregar posts da categoria
        this.loadCategoryPosts(category);
    }

    getCategoryName(category) {
        const categoryNames = {
            programacao: 'Programação',
            tecnologia: 'Tecnologia',
            carreira: 'Carreira',
            design: 'Design',
            todos: 'Todos'
        };
        return categoryNames[category] || category;
    }

    loadCategoryPosts(category) {
        let posts = [];
        
        if (category === 'todos') {
            // Combinar todos os posts de todas as categorias
            Object.values(categoryPosts).forEach(categoryPosts => {
                posts = posts.concat(categoryPosts);
            });
        } else {
            posts = categoryPosts[category] || [];
        }

        // Ordenar posts por data (mais recentes primeiro)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Renderizar posts
        this.renderPosts(posts);
    }

    loadAllPosts() {
        this.loadCategoryPosts('todos');
    }

    renderPosts(posts) {
        if (posts.length === 0) {
            this.categoryPostsContainer.innerHTML = `
                <div class="no-posts">
                    <h3>Nenhum post encontrado nesta categoria</h3>
                    <p>Em breve adicionaremos mais conteúdo!</p>
                </div>
            `;
            return;
        }

        this.categoryPostsContainer.innerHTML = posts
            .map(post => this.createPostCard(post))
            .join('');
    }

    createPostCard(post) {
        return `
            <article class="post-card">
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
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

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
}

// Inicializar gerenciador de categorias quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CategoryManager();
}); 