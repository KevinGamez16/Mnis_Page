document.addEventListener('DOMContentLoaded', () => {
    const photoData = [
        { id: 1, url: 'assets/fotos/Ale.jpg', name: 'Ale', tags: [] },
        { id: 2, url: 'assets/fotos/Sol.jpg', name: 'Sol', tags: [] },
        { id: 3, url: 'assets/fotos/Ivett.jpg', name: 'Ivett', tags: [] },
        { id: 4, url: 'assets/fotos/Andrea.jpg', name: 'Andrea', tags: [] },
        { id: 5, url: 'assets/fotos/Fernanda.jpg', name: 'Fernanda', tags: [] },
        { id: 6, url: 'assets/fotos/Kali.jpg', name: 'Kali', tags: [] },
        { id: 7, url: 'assets/fotos/Katherine.jpg', name: 'Katherine', tags: [] },
        { id: 8, url: 'assets/fotos/Monse.jpg', name: 'Monse', tags: [] },
        { id: 9, url: 'assets/fotos/Eli.jpg', name: 'Eli', tags: [] },
        { id: 10, url: 'assets/fotos/Rodolfo.jpg', name: 'Rodolfo', tags: [] },
        { id: 11, url: 'assets/fotos/Andy.jpg', name: 'Andy', tags: [] },
        { id: 12, url: 'assets/fotos/Jessy.jpg', name: 'Jessy', tags: [] },
        { id: 13, url: 'assets/fotos/Valeria.jpg', name: 'Valeria', tags: [] },
        { id: 14, url: 'assets/fotos/Yara.jpg', name: 'Yara', tags: [] },
        { id: 15, url: 'assets/fotos/Elizabeth.jpg', name: 'Elizabeth', tags: [] },
        { id: 16, url: 'assets/fotos/Pao.jpg', name: 'Pao', tags: [] },
        { id: 17, url: 'assets/fotos/Patricia.jpg', name: 'Patricia', tags: [] },
        { id: 18, url: 'assets/fotos/Marcia.jpg', name: 'Marcia', tags: [] },
        { id: 19, url: 'assets/fotos/Klau.jpg', name: 'Klau', tags: [] },
        { id: 20, url: 'assets/fotos/Vale.jpg', name: 'Vale', tags: [] },
        { id: 21, url: 'assets/fotos/Mey.jpg', name: 'Mey', tags: [] },
        { id: 22, url: 'assets/fotos/Vane.jpg', name: 'Vane', tags: [] },
        { id: 23, url: 'assets/fotos/Yunet.jpg', name: 'Yunet', tags: [] },
        { id: 24, url: 'assets/fotos/Dany.jpg', name: 'Dany', tags: [] },
        { id: 25, url: 'assets/fotos/Erikita.jpg', name: 'Erikita', tags: [] },
        { id: 26, url: 'assets/fotos/Karime.jpg', name: 'Karime', tags: [] },
        { id: 27, url: 'assets/fotos/Guille.jpg', name: 'Guille', tags: [] },
        { id: 28, url: 'assets/fotos/Liseht.jpg', name: 'Liseht', tags: [] },
        { id: 29, url: 'assets/fotos/Giovanna.jpg', name: 'Guiovanna', tags: [] },
        { id: 30, url: 'assets/fotos/Kariño.jpg', name: 'Kariño', tags: [] },
        { id: 31, url: 'assets/fotos/Toby.jpg', name: 'Toby', tags: [] },
        { id: 32, url: 'assets/fotos/Maldonado.jpg', name: 'Maldonado', tags: [] },
        { id: 32, url: 'assets/fotos/Naye.jpg', name: 'Naye', tags: [] },
        { id: 33, url: 'assets/fotos/Naty.jpg', name: 'Naty', tags: [] }
    ];

    const photoGallery = document.getElementById('photoGallery');
    const searchInput = document.getElementById('searchInput');
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalTags = document.getElementById('modalTags');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentPhotoIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isSliding = false;

    function renderPhotos(photos) {
        photoGallery.innerHTML = '';
        photos.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.className = 'photo-item relative group overflow-hidden rounded-lg shadow-lg';
            photoElement.innerHTML = `
                <img src="${photo.url}" alt="${photo.name}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                    <div class="flex justify-between items-center">
                        <span class="text-sm">${photo.name}</span>
                    </div>
                </div>
            `;
            
            photoElement.addEventListener('click', () => openModal(photo, photos.indexOf(photo)));
            photoGallery.appendChild(photoElement);
        });
    }

    function openModal(photo, index) {
        currentPhotoIndex = index;
        modalImage.src = photo.url;
        modalTitle.textContent = photo.name;
        
        modalTags.innerHTML = photo.tags.map(tag => 
            `<span class="tag bg-blue-500 text-white px-2 py-1 rounded-full text-xs">${tag}</span>`
        ).join(' ');

        prevButton.onclick = () => navigatePhotos(-1);
        nextButton.onclick = () => navigatePhotos(1);

        // Añadir eventos de teclado y táctil
        document.addEventListener('keydown', handleKeyboardNavigation);

        photoModal.classList.remove('hidden');
        adjustModalImageSize();
    }

    function navigatePhotos(direction) {
        currentPhotoIndex += direction;
        if (currentPhotoIndex < 0) {
            currentPhotoIndex = photoData.length - 1;
        } else if (currentPhotoIndex >= photoData.length) {
            currentPhotoIndex = 0;
        }
        openModal(photoData[currentPhotoIndex], currentPhotoIndex);
    }

    function handleKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft') {
            navigatePhotos(-1);
        } else if (event.key === 'ArrowRight') {
            navigatePhotos(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }

    function adjustModalImageSize() {
        const modalImageElement = document.getElementById('modalImage');
        const modalElement = document.getElementById('photoModal');
        const maxHeight = modalElement.offsetHeight * 0.8; // 80% de la altura del modal
        modalImageElement.style.maxHeight = `${maxHeight}px`;
    }

    function closeModal() {
        photoModal.classList.add('hidden');
        document.removeEventListener('keydown', handleKeyboardNavigation);
    }

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            closeModal();
        }
    });

    // Mejora en el manejo de eventos táctiles
    photoModal.addEventListener('touchstart', handleTouchStart, false);
    photoModal.addEventListener('touchmove', handleTouchMove, false);
    photoModal.addEventListener('touchend', handleTouchEnd, false);

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        isSliding = false;
    }

    function handleTouchMove(event) {
        if (isSliding) return;

        let touchCurrentX = event.touches[0].clientX;
        let touchCurrentY = event.touches[0].clientY;
        let touchDiffX = touchStartX - touchCurrentX;
        let touchDiffY = touchStartY - touchCurrentY;

        // Prevenir el deslizamiento vertical mientras se navega horizontalmente
        if (Math.abs(touchDiffX) > Math.abs(touchDiffY) && Math.abs(touchDiffX) > 50) {
            event.preventDefault();
            isSliding = true;
            
            if (touchDiffX > 0) {
                navigatePhotos(1);
            } else {
                navigatePhotos(-1);
            }
        }
    }

    function handleTouchEnd() {
        isSliding = false;
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPhotos = photoData.filter(photo => 
            photo.name.toLowerCase().includes(searchTerm) ||
            photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        renderPhotos(filteredPhotos);
    });

    renderPhotos(photoData);
});