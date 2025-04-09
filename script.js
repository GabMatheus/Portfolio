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
    try {
      const response = await fetch('sobre.html');
      if (!response.ok) throw new Error('Erro ao carregar sobre.html');
      
      const data = await response.text();
      document.getElementById('sobre-content').innerHTML = data;
      setTimeout(setupScrollReveal, 100); // Atualiza efeito de scroll
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
  
  // Carrega e exibe os projetos
  const loadProjects = async () => {
    try {
      const response = await fetch('const.json');
      const data = await response.json();
      renderProjects(data.projetos);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      document.getElementById('projetos-content').innerHTML = `
        <p class="error-message">Erro ao carregar projetos. Por favor, tente novamente mais tarde.</p>
      `;
    }
  };
  
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
    window.location.href = `projeto-detalhe.html?id=${projectId}`;
  };
  
  // Carrega os detalhes de um projeto específico
  const loadProjectDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = parseInt(urlParams.get('id'));
    if (!projetoId) return;
  
    try {
      const response = await fetch('const.json');
      const data = await response.json();
      const projeto = data.projetos.find(p => p.id === projetoId);
      
      if (projeto) renderProjectDetail(projeto);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
      document.getElementById('projeto-conteudo').innerHTML = `
        <p class="error-message">Erro ao carregar detalhes do projeto.</p>
      `;
    }
  };
  
  // Renderiza os detalhes do projeto
  const renderProjectDetail = (projeto) => {
    const conteudo = document.getElementById('projeto-conteudo');
    if (!conteudo) return;
  
    // Cria o botão do site se existir o link
    const siteButton = projeto.site ? `
      <a href="${projeto.site}" target="_blank" class="button live-button">
        <i class="fas fa-external-link-alt"></i> Ver Site
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
            <i class="fab fa-github"></i> Ver no GitHub
          </a>
          ${siteButton}
          <button onclick="window.history.back()" class="button back-button">
            <i class="fas fa-arrow-left"></i> Voltar
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
    try {
      const response = await fetch('tecnologias.json');
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
  // INICIALIZAÇÃO DA PÁGINA
  // =============================================
  
  document.addEventListener("DOMContentLoaded", () => {
    // Configura efeitos visuais
    setupTypingEffect();
    setupScrollReveal();
    
    // Animação da foto
    const photo = document.querySelector('.author-photo');
    if (photo) photo.classList.add('animate-comet');
    
    // Mudança de idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      languageSelect.addEventListener('change', function() {
        window.location.href = this.value === 'en' ? 'index_en.html' : 'index.html';
      });
    }
    
    // Carrega conteúdo específico com base na página
    if (document.getElementById('projetos-content')) loadProjects();
    if (document.getElementById('projeto-conteudo')) loadProjectDetails();
    if (document.getElementById('tecnologias-content')) loadTecnologias();
    if (document.getElementById('sobre-content')) loadSobre();
    
    // Efeito de fade-in para elementos
    const titulo = document.querySelector(".titulo-detalhe");
    if (titulo) setTimeout(() => titulo.classList.add("mostrar"), 100);
  });

