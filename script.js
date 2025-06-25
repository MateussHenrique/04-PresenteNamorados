document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-20px'
    });

    document.querySelectorAll('.fade-element').forEach(element => {
        observer.observe(element);
    });
});

// Função para rolagem suave
document.querySelector('.btn-rolar-suave').addEventListener('click', function(e) {
    e.preventDefault();
    
    const secaoFotos = document.getElementById('mensagem-especial');
    const posicaoFotos = secaoFotos.getBoundingClientRect().top + window.pageYOffset;
    const posicaoAtual = window.pageYOffset;
    const distancia = posicaoFotos - posicaoAtual;
    const duracao = 1000; 
    const inicio = performance.now();

    function animacaoRolagem(tempoAtual) {
        const tempoDecorrido = tempoAtual - inicio;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        
        // Função de easing suave
        const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, posicaoAtual + (distancia * easing(progresso)));

        if (progresso < 1) {
            requestAnimationFrame(animacaoRolagem);
        }
    }

    requestAnimationFrame(animacaoRolagem);
});