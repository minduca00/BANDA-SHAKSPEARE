/* BANDA SHAKSPEARE - interatividade da pagina */

var CATALOGO_MUSICAS = [
  { titulo: "Além do Prazer", ano: "2026*", novo: true },
  { titulo: "Caso Perdido", ano: "2022", novo: false, videoId: "FBzf5X-oMMY" },
  { titulo: "Mulher Sente", ano: "2023", novo: false, videoId: "lN7x8WXVrRw" },
  { titulo: "Obsessão", ano: "2023*", novo: false, videoId: "bQML5vdZQrI" },
  { titulo: "História da Vida", ano: "2023*", novo: false, videoId: "EHDIhbfryY8" },
  { titulo: "Teu Amigo Cuidou", ano: "2023*", novo: false, videoId: "xkH2aEEEQvI" },
  { titulo: "Sem Você Tá Foda", ano: "2023*", novo: false, videoId: "jU4TVwZZNLk" },
  { titulo: "Irreal", ano: "2023", novo: false, videoId: "_h_UUUHdCRA" },
  { titulo: "Abismo", ano: "2024", novo: false, videoId: "snGpXT5g1HU" },
  { titulo: "Apaixonado", ano: "2023", novo: false, videoId: "neuwh0b1Hao" },
  { titulo: "Vem Vem Vem", ano: "2022", novo: false, videoId: "kGO34DwgZeE" }
];

var LINK_PADRAO = "https://www.youtube.com/@bandashakespeare";

function renderMusicas() {
  var grid = document.getElementById("musicas-grid");
  if (!grid) return;

  CATALOGO_MUSICAS.forEach(function (musica) {
    var card = document.createElement("a");
    card.className = "musica-card";
    card.href = musica.videoId ? "https://www.youtube.com/watch?v=" + musica.videoId : LINK_PADRAO;
    card.target = "_blank";
    card.rel = "noopener";
    var cover = musica.videoId
      ? '<img class="musica-cover-image" src="https://i.ytimg.com/vi/' + musica.videoId + '/hqdefault.jpg" alt="Capa do vídeo ' + musica.titulo + ' no YouTube" loading="lazy">'
      : '<span class="musica-cover-fallback">Ouça no<br>YouTube</span>';
    card.innerHTML =
      '<div class="musica-cover">' +
        cover +
        (musica.novo ? '<span class="musica-tag-new">Lançamento</span>' : "") +
        '<span class="musica-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
      '</div>' +
      '<div class="musica-info">' +
        '<p class="titulo">' + musica.titulo + '</p>' +
        '<p class="ano">' + (musica.ano || 'Ano a confirmar') + '</p>' +
      '</div>';
    grid.appendChild(card);
  });
}

function setupInteractions() {
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  var header = document.querySelector(".site-header");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
  });

  var year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  renderMusicas();
  setupInteractions();
});
