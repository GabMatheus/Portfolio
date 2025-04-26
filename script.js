// =============================================
// CONFIGURAÇÕES GERAIS E EFEITOS VISUAIS
// =============================================

// Efeito de digitação dinâmica
const setupTypingEffect = () => {
  const dynamicText = document.getElementById("dynamic-text");
  if (!dynamicText) return;

  const roles = ["Front-End", "Back-End"];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";

  const type = () => {
    currentText = roles[index].substring(0, charIndex);
    dynamicText.textContent = currentText;

    if (!isDeleting && charIndex === roles[index].length) {
      setTimeout(() => isDeleting = true, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, isDeleting ? 50 : 150);
  };

  type();
};

// Efeito de revelação ao scroll
const setupScrollReveal = () => {
  const sections = document.querySelectorAll('section, .projeto, .header-content');
  
  const checkScroll = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.8) {
        section.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Verifica na carga inicial
};

// =============================================
// CARREGAMENTO DE CONTEÚDO DINÂMICO
// =============================================

// Função para carregar o conteúdo do Sobre
async function loadSobre() {
  const isEnglish = window.location.pathname.includes('_en');

  try {
    const response = await fetch(isEnglish ? 'sobre_en.html' : 'sobre.html');
    if (!response.ok) throw new Error('Erro ao carregar sobre.html');

    const data = await response.text();
    document.getElementById('sobre-content').innerHTML = data;
    setTimeout(setupScrollReveal, 100);
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('sobre-content').innerHTML = `
      <p class="error-message">Erro ao carregar informações. Tente novamente mais tarde.</p>
    `;
  }
}

// =============================================
// MANIPULAÇÃO DE PROJETOS
// =============================================

// Função para carregar o conteúdo dos Projetos
async function loadProjects() {
  const isEnglish = window.location.pathname.includes('_en');

  try {
    const response = await fetch(isEnglish ? 'const_en.json' : 'const.json');
    const data = await response.json();
    renderProjects(data.projetos);
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    document.getElementById('projetos-content').innerHTML = `
      <p class="error-message">Erro ao carregar projetos. Por favor, tente novamente mais tarde.</p>
    `;
  }
}

// Renderiza os projetos na página
const renderProjects = (projetos) => {
  const container = document.getElementById('projetos-content');
  if (!container) return;

  container.innerHTML = `
    <div class="projetos-container">
      ${projetos.map(projeto => `
        <div class="projeto-card" onclick="navigateToProject(${projeto.id})">
          <h3>${projeto.titulo}</h3>
          <p>${projeto.descricaoResumida}</p>
          <div class="tech-tags-mini">
            ${projeto.tecnologias.slice(0, 3).map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

// Navega para a página de detalhes do projeto
const navigateToProject = (projectId) => {
  const isEnglish = window.location.pathname.includes('_en');
  window.location.href = isEnglish ? `projeto-detalhe_en.html?id=${projectId}` : `projeto-detalhe.html?id=${projectId}`;
};

// Carrega os detalhes de um projeto específico
const loadProjectDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projetoId = parseInt(urlParams.get('id'));
  if (!projetoId) return;

  const isEnglish = window.location.pathname.includes('_en');

  try {
    const response = await fetch(isEnglish ? 'const_en.json' : 'const.json');
    const data = await response.json();
    const projeto = data.projetos.find(p => p.id === projetoId);
    
    if (projeto) renderProjectDetail(projeto, isEnglish);
  } catch (error) {
    console.error('Erro ao carregar detalhes:', error);
    document.getElementById('projeto-conteudo').innerHTML = `
      <p class="error-message">Erro ao carregar detalhes do projeto.</p>
    `;
  }
};

// Renderiza os detalhes do projeto
const renderProjectDetail = (projeto, isEnglish) => {
  const conteudo = document.getElementById('projeto-conteudo');
  if (!conteudo) return;

  const siteButton = projeto.site ? `
    <a href="${projeto.site}" target="_blank" class="button live-button">
      <i class="fas fa-external-link-alt"></i> ${isEnglish ? 'View Site' : 'Ver Site'}
    </a>
  ` : '';

  conteudo.innerHTML = `
    <article class="project-detail">
      <h2>${projeto.titulo}</h2>
      <p class="project-description">${projeto.descricaoCompleta}</p>
      
      <div class="tech-tags">
        ${projeto.tecnologias.map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('')}
      </div>
      
      <div class="project-gallery">
        ${projeto.imagens.map((img, index) => `
          <img src="${img}" alt="${projeto.titulo} - Imagem ${index + 1}" class="project-image">
        `).join('')}
      </div>
      
      <div class="project-actions">
        <a href="${projeto.link}" target="_blank" class="button github-button">
          <i class="fab fa-github"></i> ${isEnglish ? 'View on GitHub' : 'Ver no GitHub'}
        </a>
        ${siteButton}
        <button onclick="window.history.back()" class="button back-button">
          <i class="fas fa-arrow-left"></i> ${isEnglish ? 'Go Back' : 'Voltar'}
        </button>
      </div>
    </article>
  `;
};

// =============================================
// MANIPULAÇÃO DE TECNOLOGIAS
// =============================================
// Carrega e exibe as tecnologias
const loadTecnologias = async () => {
  const isEnglish = window.location.pathname.includes('_en');

  try {
    const response = await fetch(isEnglish ? 'tecnologias_en.json' : 'tecnologias.json');
    const data = await response.json();
    displayTecnologias(data.tecnologias);
  } catch (error) {
    console.error('Erro ao carregar tecnologias:', error);
    document.getElementById('tecnologias-content').innerHTML = `
      <p class="error-message">Erro ao carregar tecnologias.</p>
    `;
  }
};

// Exibe as tecnologias na página
const displayTecnologias = (tecnologias) => {
  const container = document.getElementById('tecnologias-content');
  if (!container) return;

  container.innerHTML = tecnologias.map(tech => `
    <div class="tech-item">
      <img src="${tech.icone}" alt="${tech.nome}" class="tech-icon"
           onerror="this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/file/file-original.svg'">
      <h3 class="tech-name">${tech.nome}</h3>
      <p class="tech-desc">${tech.descricao}</p>
    </div>
  `).join('');
};


// =============================================
// MENU HAMBÚRGUER RESPONSIVO
// =============================================
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

// =============================================
// INICIALIZAÇÃO DA PÁGINA
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  setupTypingEffect();
  setupScrollReveal();

  const photo = document.querySelector('.author-photo');
  if (photo) photo.classList.add('animate-comet');

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    // Corrige valor do select baseado na página atual
    if (window.location.pathname.includes('index_en.html')) {
      languageSelect.value = 'en';
    } else {
      languageSelect.value = 'pt';
    }

    // Atualiza página ao mudar idioma
    languageSelect.addEventListener('change', function() {
      if (this.value === 'en') {
        window.location.href = 'index_en.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // Carrega conteúdos específicos se existir
  if (document.getElementById('projetos-content')) loadProjects();
  if (document.getElementById('projeto-conteudo')) loadProjectDetails();
  if (document.getElementById('tecnologias-content')) loadTecnologias();
  if (document.getElementById('sobre-content')) loadSobre();

  const titulo = document.querySelector(".titulo-detalhe");
  if (titulo) setTimeout(() => titulo.classList.add("mostrar"), 100);
});
