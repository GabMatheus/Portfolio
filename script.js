// Script para efeito de digitação
const dynamicText = document.getElementById("dynamic-text");
const roles = ["Front-End", "Back-End"];
let index = 0;
let charIndex = 0;
let currentRole = "";
let currentText = "";
let isDeleting = false;

function type() {
    if (isDeleting) {
        currentText = roles[index].substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = roles[index].substring(0, charIndex + 1);
        charIndex++;
    }
    dynamicText.innerHTML = currentText;

    if (!isDeleting && charIndex === roles[index].length) {
        setTimeout(() => {
            isDeleting = true;
        }, 1000); // Tempo que mantém o texto antes de começar a apagar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length; // Muda para o próximo papel
    }

    const speed = isDeleting ? 50 : 150; // Velocidade de digitação e apagamento
    setTimeout(type, speed);
}

// Inicia o efeito de digitação após carregar a página
document.addEventListener("DOMContentLoaded", type);

// Animação da foto ao carregar a página
window.onload = function() {
    const photo = document.querySelector('.author-photo');
    photo.classList.add('animate-comet');
};

// Mudança de idioma
document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'en') {
        window.location.href = 'index_en.html'; // Carrega a versão em inglês
    } else {
        window.location.href = 'index.html'; // Carrega a versão em português
    }
});

// Animação da seção "Sobre" ao rolar
document.addEventListener("DOMContentLoaded", function() {
    var sobreSection = document.getElementById("sobre");

    function checkScroll() {
        var sectionPosition = sobreSection.getBoundingClientRect().top;
        var screenPosition = window.innerHeight / 1.3; // Ajuste para ativação da animação

        if (sectionPosition < screenPosition) {
            sobreSection.classList.add("visible");
        }
    }

    window.addEventListener('scroll', checkScroll);
});

// Função para carregar o conteúdo de projetos.html
function loadProjects() {
    fetch('projetos.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar projetos.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('projetos-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('projetos-content').innerHTML = '<p>Erro ao carregar os projetos. Tente novamente mais tarde.</p>';
        });
}

// Carregar projetos dinamicamente ao rolar até a seção
document.addEventListener("DOMContentLoaded", function() {
    const projetosSection = document.getElementById('projetos');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadProjects();
                observer.unobserve(projetosSection); // Carrega apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // Ativa quando 10% da seção estiver visível

    observer.observe(projetosSection);
});