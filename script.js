// Dados dos projetos
const projetos = [
    {
        id: 1,
        titulo: "Gerador de Códigos de Barras",
        descricao: "Este projeto de automação foi desenvolvido para gerar códigos de barras para produtos. Ele surgiu da necessidade de resolver o problema de códigos ilegíveis ou de difícil acesso para os funcionários. O funcionamento é simples, o usuário digita os códigos e ao finalizar o programa cria no desktop um docx com todos os códigos para impressão.",
        link: "https://github.com/GabMatheus/criar_cod_barras"
    },
    {
        id: 2,
        titulo: "Consulta de CNPJ",
        descricao: "Código feito em Python que realiza uma consulta na API da Receita Federal brasileira para obter dados de empresas. " +
                   "Como a API libera apenas 3 consultas de CNPJs por minuto gratuitamente, implementei um timer que faz o programa " +
                   "realizar 3 consultas, aguardar o tempo necessário e então fazer mais três consultas até o último CNPJ do arquivo. " +
                   "Ao final, são retornados dados como nome da empresa, cidade, estado e outras informações. " +
                   "A API é pública e permite selecionar diferentes informações conforme a necessidade.",
        link: "https://github.com/GabMatheus/consultaCNPJ"
    },
    {
        id: 3,
        titulo: "Distância entre cidades",
        descricao: "Calcula a distância entre uma cidade para todas do Brasil fornecidas pela API do Google Maps Desenvolvido em python e testando a funcionalidade do ChatGPT para saber se é útil para ajudar desenvolvedores sem muita experiência com programas simples, o resultado foi um sucesso, ele trás uma boa base e informa corretamente muitas bibliotecas a serem usadas e como se dá sua utilização, melhor que perder horas e horas lendo toda a documentação das API's ou da linguagem em si, por exemplo, a tkinter eu não tinha conhecimento do funcionamento e ele ajudou bastante a entender o básico." ,
        link: "https://github.com/GabMatheus/Distancia_cidades"
    },
    {
        id: 4,
        titulo: "Site Nutricional",
        descricao: "O projeto 'Nutrição Alimentar' é um site desenvolvido com o objetivo de promover a conscientização sobre a importância da alimentação saudável e oferecer ferramentas práticas para auxiliar os usuários em suas escolhas nutricionais. " +
                  "Ele foi produzido a partir de um projeto de atividade extensionista que a faculdade proporcionou e seu link de acesso é o: <a href='https://gabmatheus.github.io/Site_nutri/' target='_blank' class='link'>https://gabmatheus.github.io/Site_nutri/</a>",
        link: "https://github.com/GabMatheus/Site_nutri"
    },
    {
        id: 5,
        titulo: "Soldiers vs Zombies",
        descricao: "Soldiers vs Zombies é um jogo arcade 2D desenvolvido com Pygame. O jogo possui 2 fases, e cada fase termina com um evento de tempo esgotado. Pode ser jogado no modo cooperativo (2 jogadores). A pontuação é salva no banco de dados (SQLite3). " ,
        link: "https://github.com/GabMatheus/Soldiers_vs_zombies"
    },
    {
        id: 6,
        titulo: "Consulta produtos/cartões",
        descricao: "Este projeto é uma aplicação desktop que permite a consulta de informações sobre produtos e cartões em aberto para a empresa onde trabalho. Desenvolvida utilizando Electron no frontend e Flask no backend, a aplicação acessa dados armazenados em um banco de dados PostgreSQL. A interface gráfica foi construída com HTML, CSS e JavaScript." ,
        link: "https://github.com/GabMatheus/app_flask_electron"
    },

];

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
        }, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % roles.length;
    }

    const speed = isDeleting ? 50 : 150;
    setTimeout(type, speed);
}

// Função para carregar os detalhes do projeto
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = parseInt(urlParams.get('id'));
    const projeto = projetos.find(p => p.id === projetoId);
    
    if (projeto) {
        const conteudo = document.getElementById('projeto-conteudo');
        if (conteudo) {
            conteudo.innerHTML = `
                <h2>${projeto.titulo}</h2>
                <p>${projeto.descricao}</p>
                <a href="${projeto.link}" target="_blank" class="link">Ver no GitHub</a>
            `;
        }
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Efeito de digitação
    if (dynamicText) {
        type();
    }

    // Animação da foto
    const photo = document.querySelector('.author-photo');
    if (photo) {
        photo.classList.add('animate-comet');
    }

    // Mudança de idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (selectedLanguage === 'en') {
                window.location.href = 'index_en.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Animação da seção "Sobre"
    var sobreSection = document.getElementById("sobre");
    if (sobreSection) {
        function checkScroll() {
            var sectionPosition = sobreSection.getBoundingClientRect().top;
            var screenPosition = window.innerHeight / 1.3;

            if (sectionPosition < screenPosition) {
                sobreSection.classList.add("visible");
            }
        }

        window.addEventListener('scroll', checkScroll);
    }

    // Carregar conteúdo dinâmico
    if (document.getElementById('projeto-conteudo')) {
        loadProjectDetails();
    }

    // Observadores de interseção para carregamento lazy
    const sobreSectionLazy = document.getElementById('sobre');
    if (sobreSectionLazy) {
        const observerSobre = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadSobre();
                    observer.unobserve(sobreSectionLazy);
                }
            });
        }, { threshold: 0.1 });

        observerSobre.observe(sobreSectionLazy);
    }

    const projetosSection = document.getElementById('projetos');
    if (projetosSection) {
        const observerProjetos = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadProjects();
                    observer.unobserve(projetosSection);
                }
            });
        }, { threshold: 0.1 });

        observerProjetos.observe(projetosSection);
    }
});

// Funções de carregamento de conteúdo
function loadSobre() {
    fetch('sobre.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar sobre.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sobre-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('sobre-content').innerHTML = '<p>Erro ao carregar informações. Tente novamente mais tarde.</p>';
        });
}

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