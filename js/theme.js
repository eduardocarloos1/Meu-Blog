// Gerenciador de tema (claro/escuro)
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.icon = this.themeToggle.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Aplicar tema salvo
        this.applyTheme(this.currentTheme);
        
        // Adicionar evento de clique
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Verificar preferência do sistema
        this.checkSystemPreference();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Atualizar ícone
        this.icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    checkSystemPreference() {
        // Verificar se o usuário já definiu uma preferência
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? 'dark' : 'light');
        }

        // Ouvir mudanças nas preferências do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Inicializar gerenciador de tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 