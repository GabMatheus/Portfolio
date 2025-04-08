// Dados dos projetos
const projetos = [
    {
        id: 1,
        titulo: "Gerador de Códigos de Barras",
        descricao: "Este projeto de automação foi desenvolvido para gerar códigos de barras para produtos. Ele surgiu da necessidade de resolver o problema de códigos ilegíveis ou de difícil acesso para os funcionários. O funcionamento é simples, o usuário digita os códigos e ao finalizar o programa cria no desktop um docx com todos os códigos para impressão.",
        imagens: [
            '<img src="img/Ger_cod_128.png" alt="Tela para digitar os códigos e salvá-los" >',
            '<img src="img/Ger_cod_128_doc.png" alt="Documento docx gerado">'
        ], 
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
        imagens: [
            '<img src="img/Consulta_cnpj2.png" alt="Programa de consultar cnpj na receita" >',
            '<img src="img/Consulta_cnpj.png" alt="Programa executando">'
        ],    
        link: "https://github.com/GabMatheus/consultaCNPJ"
    },
    {
        id: 3,
        titulo: "Distância entre cidades",
        descricao: "Calcula a distância entre uma cidade a outra e de uma cidade para todas do Brasil que são fornecidas pela API do Google Maps. Desenvolvido em python e conta com uma interface simples criada pelo TKinter porém responsiva." ,
        imagens: [
            '<img src="img/dist cid.png" alt="Tela Inicial" >'
        ],
        link: "https://github.com/GabMatheus/Distancia_cidades"
    },
    {
        id: 4,
        titulo: "Site Nutricional",
        descricao: "O projeto 'Nutrição Alimentar' é um site desenvolvido com o objetivo de promover a conscientização sobre a importância da alimentação saudável e oferecer ferramentas práticas para auxiliar os usuários em suas escolhas nutricionais. " +
                  "Ele foi produzido a partir de um projeto de atividade extensionista que a faculdade proporcionou e seu link de acesso é o: <a href='https://gabmatheus.github.io/Site_nutri/' target='_blank' class='link'>https://gabmatheus.github.io/Site_nutri/</a>",
        imagens: [
            '<img src="img/Site nutri - inicio.png" alt="Inicio do site" >',
            '<img src="img/Site nutri - consulta.png" alt="Consulta Alimentos">'
        ],
        link: "https://github.com/GabMatheus/Site_nutri"
    },
    {
        id: 5,
        titulo: "Soldiers vs Zombies",
        descricao: "Soldiers vs Zombies é um jogo arcade 2D desenvolvido com Pygame. O jogo possui 2 fases, e cada fase termina com um evento de tempo esgotado. Pode ser jogado no modo cooperativo (2 jogadores). A pontuação é salva no banco de dados (SQLite3).",
        imagens: [
            '<img src="img/SvZ - menu.png" alt="Menu do jogo Soldiers vs Zombies" >',
            '<img src="img/SvZ - fase.png" alt="Tela de jogo Soldiers vs Zombies">'
        ],
        link: "https://github.com/GabMatheus/Soldiers_vs_zombies"
    },
    {
        id: 6,
        titulo: "Consulta produtos/cartões",
        descricao: "Este projeto é uma aplicação desktop que permite a consulta de informações sobre produtos e cartões em aberto para a empresa onde trabalho. Desenvolvida utilizando Electron no frontend e Flask no backend, a aplicação acessa dados armazenados em um banco de dados PostgreSQL. A interface gráfica foi construída com HTML, CSS e JavaScript." ,
        imagens: [
            '<img src="img/Cons_prod_inicial.png" alt="Tela inicia do programa" >',
            '<img src="img/Cons_prod.png" alt="Exemplo ao executar um comando">'
        ],
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

// Adicione esta função para o efeito de scroll
function setupScrollReveal() {
    const sections = document.querySelectorAll('section, .projeto, .header-content, footer');
    
    // Adiciona a classe 'reveal' a todos os elementos que devem ser animados
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Função para verificar se o elemento está na viewport
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Quando a seção está a 80% da altura da janela
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('active');
            }
        });
    }
    
    // Verifica na carga inicial
    checkScroll();
    
    // Verifica durante o scroll
    window.addEventListener('scroll', checkScroll);
}

// texto dentro de prjetos
document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector(".titulo-detalhe");
    setTimeout(() => {
        titulo.classList.add("mostrar");
    }, 100); // pequeno delay pra dar o efeito
});

// Função para carregar os detalhes do projeto
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = parseInt(urlParams.get('id'));
    const projeto = projetos.find(p => p.id === projetoId);
    
    if (projeto) {
        const conteudo = document.getElementById('projeto-conteudo');
        if (conteudo) {
            let html = `
                <h2>${projeto.titulo}</h2>
                <p>${projeto.descricao}</p>
            `;
            
            // Adiciona as imagens se existirem
            if (projeto.imagens && projeto.imagens.length > 0) {
                html += `<div class="projeto-imagens">`;
                projeto.imagens.forEach(img => {
                    html += img;
                });
                html += `</div>`;
            }
            
            html += `<a href="${projeto.link}" target="_blank" class="link">Ver no GitHub</a>`;
            
            conteudo.innerHTML = html;
        }
    }
}

// Carrega as tecnologias do arquivo JSON
async function loadTecnologias() {
    try {
        // Se estiver usando formacao.html como fonte:
        // const response = await fetch('formacao.html');
        // Ou se preferir um arquivo separado:
        const response = await fetch('tecnologias.json');
        const data = await response.json();
        displayTecnologias(data.tecnologias);
    } catch (error) {
        console.error('Erro ao carregar tecnologias:', error);
        document.getElementById('tecnologias-content').innerHTML = 
            '<p>Erro ao carregar tecnologias. Por favor, tente novamente mais tarde.</p>';
    }
}

// Exibe as tecnologias na página
function displayTecnologias(tecnologias) {
    const container = document.getElementById('tecnologias-content');
    
    container.innerHTML = tecnologias.map(tech => `
        <div class="tech-item">
            <img src="${tech.icone}" alt="${tech.nome}" class="tech-icon" 
                 onerror="this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file/file-original.svg'">
            <h3 class="tech-name">${tech.nome}</h3>
            <p class="tech-desc">${tech.descricao}</p>
        </div>
    `).join('');
}

// Carrega quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadTecnologias);

// Event listener principal
document.addEventListener("DOMContentLoaded", function() {
    // Configura o efeito de revelação ao scroll
    setupScrollReveal();

    // Efeito de digitação
    if (dynamicText) {
        type();
    }

    // Animação da foto (agora tratada pelo scroll reveal)
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

    // Carregar conteúdo dinâmico
    if (document.getElementById('projeto-conteudo')) {
        loadProjectDetails();
    }

    // Observadores de interseção para carregamento lazy (mantido do seu código original)
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

// Funções de carregamento de conteúdo (mantidas do seu código original)
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
            // Atualiza o efeito de scroll para os novos elementos
            setTimeout(setupScrollReveal, 100);
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
            // Atualiza o efeito de scroll para os novos elementos
            setTimeout(setupScrollReveal, 100);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('projetos-content').innerHTML = '<p>Erro ao carregar os projetos. Tente novamente mais tarde.</p>';
        });
}