document.addEventListener('DOMContentLoaded', () => {
    const photoData = [
        { id: 1, url: 'assets/cartas/Carta1.jpg', name: '', tags: [] },
        { id: 2, url: 'assets/cartas/Carta2.jpg', name: '', tags: [] },
        { id: 3, url: 'assets/cartas/Carta3.jpg', name: '', tags: [] },
        { id: 4, url: 'assets/cartas/Carta4.jpg', name: '', tags: [] },
        { id: 5, url: 'assets/cartas/Carta5.jpg', name: '', tags: [] },
        { id: 6, url: 'assets/cartas/Carta6.jpg', name: '', tags: [] },
        { id: 7, url: 'assets/cartas/Carta7.jpg', name: '', tags: [] },
        { id: 8, url: 'assets/cartas/Carta8.jpg', name: '', tags: [] },
        { id: 9, url: 'assets/cartas/Carta9.jpg', name: '', tags: [] },
        { id: 10, url: 'assets/cartas/Carta10.jpg', name: '', tags: [] },
        { id: 11, url: 'assets/cartas/Carta11.jpg', name: '', tags: [] },
        { id: 12, url: 'assets/cartas/Carta12.jpg', name: '', tags: [] },
        { id: 13, url: 'assets/cartas/Carta13.jpg', name: '', tags: [] },
        { id: 14, url: 'assets/cartas/Carta14.jpg', name: '', tags: [] },
        { id: 15, url: 'assets/cartas/Carta15.jpg', name: '', tags: [] },
        { id: 16, url: 'assets/cartas/Carta16.jpg', name: '', tags: [] },
        { id: 17, url: 'assets/cartas/Carta17.jpg', name: '', tags: [] },
        { id: 18, url: 'assets/cartas/Carta18.jpg', name: '', tags: [] },
        { id: 19, url: 'assets/cartas/Carta19.jpg', name: '', tags: [] },
        { id: 20, url: 'assets/cartas/Carta20.jpg', name: '', tags: [] },
        { id: 21, url: 'assets/cartas/Carta21.jpg', name: '', tags: [] },
        { id: 22, url: 'assets/cartas/Carta22.jpg', name: '', tags: [] },
        { id: 23, url: 'assets/cartas/Carta23.jpg', name: '', tags: [] },
        { id: 24, url: 'assets/cartas/Carta24.jpg', name: '', tags: [] },
        { id: 25, url: 'assets/cartas/Carta25.jpg', name: '', tags: [] },
        { id: 26, url: 'assets/cartas/Carta26.jpg', name: '', tags: [] },
        { id: 27, url: 'assets/cartas/Carta27.jpg', name: '', tags: [] },
        { id: 28, url: 'assets/cartas/Carta28.jpg', name: '', tags: [] },
        { id: 29, url: 'assets/cartas/Carta30.jpg', name: '', tags: [] },
        { id: 30, url: 'assets/cartas/Carta31.jpg', name: '', tags: [] },
        { id: 31, url: 'assets/cartas/Carta29.jpg', name: '', tags: [] }
    ];

    const photoGallery = document.getElementById('photoGallery');
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

    
    renderPhotos(photoData);
});