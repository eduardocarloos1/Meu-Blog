// Gerenciador de pesquisa
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = [];
        this.init();
    }

    init() {
        // Adicionar evento de input com debounce
        this.searchInput.addEventListener('input', this.debounce(() => {
            this.performSearch(this.searchInput.value);
        }, 300));
    }

    // Função de debounce para evitar muitas requisições
    debounce(func, wait) {
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

    // Realizar a pesquisa
    performSearch(query) {
        if (!query.trim()) {
            this.renderAllPosts();
            return;
        }

        query = query.toLowerCase();
        this.searchResults = posts.filter(post => {
            return (
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query)
            );
        });

        this.renderSearchResults();
    }

    // Renderizar resultados da pesquisa
    renderSearchResults() {
        const featuredPosts = document.querySelector('.posts-grid');
        const recentPosts = document.querySelector('.posts-list');

        if (this.searchResults.length === 0) {
            this.renderNoResults();
            return;
        }

        if (featuredPosts) {
            featuredPosts.innerHTML = this.searchResults
                .slice(0, 3)
                .map(post => createPostCard(post))
                .join('');
        }

        if (recentPosts) {
            recentPosts.innerHTML = this.searchResults
                .slice(3)
                .map(post => createPostCard(post))
                .join('');
        }
    }

    // Renderizar mensagem quando não há resultados
    renderNoResults() {
        const featuredPosts = document.querySelector('.posts-grid');
        const recentPosts = document.querySelector('.posts-list');

        const noResultsHTML = `
            <div class="no-results">
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente buscar com palavras diferentes</p>
            </div>
        `;

        if (featuredPosts) {
            featuredPosts.innerHTML = noResultsHTML;
        }

        if (recentPosts) {
            recentPosts.innerHTML = '';
        }
    }

    // Renderizar todos os posts (estado inicial)
    renderAllPosts() {
        renderPosts(); // Função definida em main.js
    }
}

// Inicializar gerenciador de pesquisa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
}); 