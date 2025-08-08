const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let imagesArray = Array.from(galleryImages);

// Show lightbox on image click
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showLightbox(img.src);
  });
});

function showLightbox(src) {
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imagesArray.length;
  lightboxImg.src = imagesArray[currentIndex].src;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  lightboxImg.src = imagesArray[currentIndex].src;
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Filter Functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const category = btn.getAttribute('data-filter');
    galleryImages.forEach(img => {
      if (category === 'all' || img.dataset.category === category) {
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    });

    // Refresh imagesArray for filtered images
    imagesArray = Array.from(document.querySelectorAll('.gallery-img')).filter(img => img.style.display !== 'none');
  });
});
