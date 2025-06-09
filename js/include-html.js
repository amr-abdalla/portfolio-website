// scans for [data-include] attributes and injects the HTML
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(el => {
    fetch(el.getAttribute('data-include'))
      .then(resp => resp.text())
      .then(html => el.innerHTML = html);
  });
});

   const projectImages = {
      lastEpoch: [
        'images/last-epoch/gameplay.png',
        'images/last-epoch/gameplay2.png',
        'images/last-epoch/main-menu.png',
        'images/last-epoch/ui.png',
        'images/last-epoch/ui2.png',
        'images/last-epoch/patch-notes.png'
      ],
      lastLoremaster: [
        'images/last-loremaster/gameplay.png',
        'images/last-loremaster/gameplay2.png',
        'images/last-loremaster/gameplay3.png',
        'images/last-loremaster/gameplay4.png',
        'images/last-epoch/ui.png',
        'images/last-epoch/ui2.png',
        'images/last-epoch/ui3.png'
      ],
      khefTeom: [
        'images/khef/mainmenu.png',
        'images/khef/gameplay1.png',
        'images/khef/gameplay2.png',
        'images/khef/gameplay3.png',
        'images/khef/gameplay4.png',
        'images/khef/arcade1.png',
        'images/khef/arcade2.png'
      ]
    };

    let currentProject = null;
    let currentIndex = 0;

    function openModal(id) {
      document.getElementById(`modal-${id}`).style.display = 'flex';
    }

    function closeModal(id) {
      document.getElementById(`modal-${id}`).style.display = 'none';
    }

    function openLightbox(project, index) {
      currentProject = project;
      currentIndex = index;
      document.getElementById('lightbox-image').src = projectImages[project][index];
      document.getElementById('lightbox').style.display = 'flex';
    }

    function closeLightbox() {
      document.getElementById('lightbox').style.display = 'none';
    }

    function prevImage() {
      if (!currentProject) return;
      currentIndex = (currentIndex - 1 + projectImages[currentProject].length) % projectImages[currentProject].length;
      document.getElementById('lightbox-image').src = projectImages[currentProject][currentIndex];
    }

    function nextImage() {
      if (!currentProject) return;
      currentIndex = (currentIndex + 1) % projectImages[currentProject].length;
      document.getElementById('lightbox-image').src = projectImages[currentProject][currentIndex];
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") closeLightbox();
    });

    window.addEventListener('click', function (e) {
      document.querySelectorAll('.project-modal').forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });