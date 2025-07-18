let users = [];
let currentSlide = 0;

const generateBtn = document.getElementById('generateBtn');
const userCountSelect = document.getElementById('userCount');
const loadingState = document.getElementById('loadingState');
const profileGrid = document.getElementById('profileGrid');
const sliderSection = document.getElementById('sliderSection');
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const profileModal = document.getElementById('profileModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.querySelector('.modal-body');

generateBtn.addEventListener('click', getProfiles);
sliderPrev.addEventListener('click', () => changeSlide(-1));
sliderNext.addEventListener('click', () => changeSlide(1));
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        getProfiles();
    }, 500);
});

async function getProfiles() {
    const count = parseInt(userCountSelect.value);
    
    showLoading();
    
    try {
        generateBtn.classList.add('shake');
        setTimeout(function() {
            generateBtn.classList.remove('shake');
        }, 500);
        
        const response = await fetch('https://randomuser.me/api/?results=' + count + '&nat=tr,us,gb,de,fr,es,it,ca,au,br');
        const data = await response.json();
        users = data.results;
        
        createCards(users);
        
        createSlider(users);
        
        showSuccess();
        
    } catch (error) {
        console.log('Hata:', error);
        showError();
    } finally {
        hideLoading();
    }
}

function createCards(users) {
    profileGrid.innerHTML = '';
    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const card = createCard(user, i);
        profileGrid.appendChild(card);
        
        setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    }
    
    profileGrid.classList.remove('hidden');
}

function createCard(user, index) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    
    card.innerHTML = `
        <div class="card-header">
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" class="card-avatar">
            <h3 class="card-name">${user.name.first} ${user.name.last}</h3>
            <p class="card-email">${user.email}</p>
        </div>
        <div class="card-details">
            <div class="detail-item">
                <span class="detail-icon">📍</span>
                <span class="detail-text">${user.location.city}, ${user.location.country}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">📱</span>
                <span class="detail-text">${user.phone}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🎂</span>
                <span class="detail-text">${new Date(user.dob.date).toLocaleDateString('tr-TR')}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function() {
        openModal(user);
    });
    
    card.addEventListener('mouseenter', function() {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    return card;
}

function createSlider(users) {
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';
        sliderItem.innerHTML = `
            <img src="${user.picture.medium}" alt="${user.name.first}" class="slider-avatar">
            <h4 class="slider-name">${user.name.first} ${user.name.last}</h4>
            <p class="slider-email">${user.email}</p>
        `;
        
        sliderItem.addEventListener('click', function() {
            openModal(user);
        });
        sliderTrack.appendChild(sliderItem);
        
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            goToSlide(i);
        });
        sliderDots.appendChild(dot);
    }
    
    currentSlide = 0;
    updateSlider();
    sliderSection.classList.remove('hidden');
    
    startAutoSlide();
}

function updateSlider() {
    const items = sliderTrack.querySelectorAll('.slider-item');
    const dots = sliderDots.querySelectorAll('.dot');
    
    for (let i = 0; i < items.length; i++) {
        items[i].style.transform = 'translateX(' + ((i - currentSlide) * 220) + 'px)';
    }
    
    for (let i = 0; i < dots.length; i++) {
        if (i === currentSlide) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }
}

function changeSlide(direction) {
    const totalSlides = users.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(function() {
        changeSlide(1);
    }, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function openModal(user) {
    modalBody.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}" class="modal-avatar">
        <h2 class="modal-name">${user.name.first} ${user.name.last}</h2>
        <div class="modal-details">
            <div class="modal-detail">
                <span class="modal-detail-icon">📧</span>
                <span class="modal-detail-text">${user.email}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">📱</span>
                <span class="modal-detail-text">${user.phone}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">📱</span>
                <span class="modal-detail-text">${user.cell}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">📍</span>
                <span class="modal-detail-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">🎂</span>
                <span class="modal-detail-text">${new Date(user.dob.date).toLocaleDateString('tr-TR')} (${user.dob.age} yaşında)</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">👤</span>
                <span class="modal-detail-text">${user.gender === 'male' ? 'Erkek' : 'Kadın'}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-icon">🌐</span>
                <span class="modal-detail-text">${user.nat}</span>
            </div>
        </div>
    `;
    
    profileModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'bounce 0.6s ease-out';
    setTimeout(function() {
        modalContent.style.animation = '';
    }, 600);
}

function closeModal() {
    profileModal.classList.add('hidden');
    document.body.style.overflow = '';
}

function showLoading() {
    loadingState.classList.remove('hidden');
    profileGrid.classList.add('hidden');
    sliderSection.classList.add('hidden');
    
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoader = generateBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Yükleniyor...';
    btnLoader.classList.remove('hidden');
    generateBtn.disabled = true;
}

function hideLoading() {
    loadingState.classList.add('hidden');
    
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoader = generateBtn.querySelector('.btn-loader');
    
    btnText.textContent = 'Profilleri Getir';
    btnLoader.classList.add('hidden');
    generateBtn.disabled = false;
}

function showSuccess() {
    generateBtn.style.background = 'linear-gradient(135deg, #51cf66, #40c057)';
    generateBtn.style.boxShadow = '0 8px 25px rgba(81, 207, 102, 0.6)';
    
    setTimeout(function() {
        generateBtn.style.background = '';
        generateBtn.style.boxShadow = '';
    }, 2000);
}

function showError() {
    generateBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #fa5252)';
    generateBtn.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
    generateBtn.classList.add('shake');
    
    setTimeout(function() {
        generateBtn.style.background = '';
        generateBtn.style.boxShadow = '';
        generateBtn.classList.remove('shake');
    }, 2000);
}

document.addEventListener('keydown', function(e) {
    if (profileModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    } else {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
});

window.addEventListener('resize', function() {
    if (users.length > 0) {
        updateSlider();
    }
});

const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style); 