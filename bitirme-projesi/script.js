(() => {
    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div class="carousel-container">
                <h2 class="carousel-title">You Might Also Like</h2>
                <div class="carousel-wrapper">
                    <div class="carousel-track"></div>
                </div>
                <button class="carousel-nav prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                    </svg>
                </button>
                <button class="carousel-nav next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242">
                        <path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path>
                    </svg>
                </button>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .carousel-container { 
                margin: 40px 0; 
                padding: 0 20px; 
                max-width: 80%; 
                margin-left: auto; 
                margin-right: auto; 
                position: relative;
            }
            .carousel-title { 
                font-size: 32px; 
                line-height: 43px; 
                font-weight: lighter;
                margin-bottom: 20px; 
            }
            .carousel-wrapper { 
                position: relative; 
                overflow: hidden; 
                width: 100%;
            }
            .carousel-track { 
                display: flex; 
                transition: transform 0.5s ease; 
                gap: 3px;
            }
            .carousel-item { 
                flex: 0 0 calc(20% - 12px);
                min-width: 200px;
            }
            .product-card { 
                border: 1px solid #e0e0e0; 
                overflow: hidden; 
                background: white; 
                cursor: pointer; 
            }
            .product-image-container { 
                position: relative; 
                overflow: hidden; 
            }
            .product-image { 
                width: 100%; 
                height: 100%; 
                object-fit: contain; 
                background: #f8f9fa;
            }
            .heart-icon { 
                position: absolute; 
                top: 10px; 
                right: 10px; 
                width: 21px; 
                height: 20px; 
                cursor: pointer; 
                z-index: 2; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .heart-icon svg { 
                width: 21px; 
                height: 20px; 
                transition: all 0.2s ease; 
            }
            .heart-icon.favorite svg path { 
                fill: rgb(25, 61, 176) !important; 
                stroke: rgb(25, 61, 176) !important; 
            }
            .product-info { 
                display: flex;
                flex-direction: column;
                padding: 0 10px;
            }
            .product-name { 
                font-size: 14px; 
                margin-top: 5px;
                color: #333; 
                margin-bottom: 8px; 
                line-height: 1.3; 
                height: 36px; 
                overflow: hidden; 
                display: -webkit-box; 
                -webkit-line-clamp: 2; 
                -webkit-box-orient: vertical; 
            }
            .product-price { 
                font-size: 16px; 
                font-weight: bold; 
                color: #193db0; 
            }
            .product-card_price {
                display: flex;
                align-items: flex-start;
                height: 50px;
                flex-direction: column;
                margin-top: 8px;
            }
            .product-add-to-cart {
                height: 35px;
                display: none;
                background-color: #193db0;
                color: #fff;
                width: 100%;
                border-radius: 5px;
                border: none;
                line-height: 19px;
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                cursor: pointer;
                margin-top: 8px;
            }
            .product-add-to-cart:hover {
                background-color: #152a7a;
            }
            .carousel-nav { 
                position: absolute;
                top: 60%;
                transform: translateY(-50%);
                background: transparent; 
                border: none; 
                cursor: pointer; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                z-index: 3; 
                flex-shrink: 0;
            }
            .carousel-nav.prev {
                left: -15px;
            }
            .carousel-nav.next {
                right: -15px;
            }
            .carousel-nav svg { 
                width: 14.242px; 
                height: 24.242px; 
            }
            .carousel-nav.next svg {
                transform: rotate(180deg);
            }
            .carousel-nav:hover {
                opacity: 0.7;
            }
            .carousel-nav:disabled {
                cursor: not-allowed;
                pointer-events: none;
            }
            @media (max-width: 991px) {
                .carousel-nav {
                    display: none;
                }
                .carousel-wrapper {
                    overflow-x: hidden;
                    scroll-behavior: smooth;
                    margin: 0 auto;
                }
                .carousel-track {
                    display: flex;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .carousel-track::-webkit-scrollbar {
                    display: none;
                }
                .carousel-item {
                    flex: 0 0 calc(33.333% - 10px);
                }
                .product-add-to-cart {
                    display: block;
                }
            }
            @media (max-width: 767px) {
                .carousel-nav.prev {
                    left: -40px;
                }
                .carousel-nav.next {
                    right: -40px;
                }
                .carousel-nav { 
                    width: 35px; 
                    height: 35px; 
                }
                .carousel-item {
                    flex: 0 0 calc(50% - 7.5px);
                }
            }
            @media (max-width: 479px) {
                .carousel-nav.prev {
                    left: -30px;
                }
                .carousel-nav.next {
                    right: -30px;
                }
                .carousel-nav { 
                    width: 30px; 
                    height: 30px; 
                }
                .carousel-item {
                    flex: 0 0 100%;
                }
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        loadProducts();
    };

    const loadProducts = async () => {
        const products = localStorage.getItem('carousel_products');
        if (products) {
            try { 
                const parsedProducts = JSON.parse(products); 
                createProductCards(parsedProducts); 
                return; 
            } catch (e) { 
                localStorage.removeItem('carousel_products'); 
            }
        }
        
        try {
            const response = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
            const data = await response.json();
            localStorage.setItem('carousel_products', JSON.stringify(data));
            createProductCards(data);
        } catch (err) {
            console.error('Ürünler alınamadı:', err);
        }
    };

    const createProductCards = (products) => {
        const favs = getFavorites();
        const track = document.querySelector('.carousel-track');
        
        products.forEach((product) => {
            const productHTML = `
                <div class="carousel-item">
                    <div class="product-card" data-product-id="${product.id}">
                        <div class="product-image-container">
                            <img class="product-image" src="${product.img}" alt="${product.name}">
                            <div class="heart-icon ${favs.includes(product.id) ? 'favorite' : ''}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none">
                                    <path fill="${favs.includes(product.id) ? 'rgb(25, 61, 176)' : '#fff'}" fill-rule="evenodd" stroke="${favs.includes(product.id) ? 'rgb(25, 61, 176)' : '#B6B7B9'}" d="M19.97 6.449c-.277-3.041-2.429-5.247-5.123-5.247-1.794 0-3.437.965-4.362 2.513C9.57 2.147 7.993 1.2 6.228 1.2c-2.694 0-4.846 2.206-5.122 5.247-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-card_price">
                                <div class="product-price">${product.price} TL</div>
                            </div>
                            <button class="product-add-to-cart">SEPETE EKLE</button>
                        </div>
                    </div>
                </div>
            `;
            
            track.insertAdjacentHTML('beforeend', productHTML);
        });

        setupCarousel();
        setupProductEvents();
    };

    const setupCarousel = () => {
        const track = document.querySelector('.carousel-track');
        const prevBtn = document.querySelector('.carousel-nav.prev');
        const nextBtn = document.querySelector('.carousel-nav.next');
        
        let currentIndex = 0;
        const totalItems = track.children.length;

        const getMaxIndex = () => {
            const width = window.innerWidth;
            let itemsPerView;
            if (width >= 992) itemsPerView = 5;
            else if (width >= 768) itemsPerView = 3;
            else if (width >= 480) itemsPerView = 2;
            else itemsPerView = 1;
            
            return Math.max(0, totalItems - itemsPerView);
        };

        const updatePosition = () => {
            const itemWidth = track.children[0].offsetWidth + 3;
            const translateX = -currentIndex * itemWidth;
            track.style.transform = `translateX(${translateX}px)`;
            updateNavigation();
        };

        const updateNavigation = () => {
            prevBtn.disabled = currentIndex <= 0;
            nextBtn.disabled = currentIndex >= getMaxIndex();
        };

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                updatePosition();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updatePosition();
            }
        });

        updateNavigation();
    };

    const setupProductEvents = () => {
        document.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;
            
            if (e.target.closest('.heart-icon')) return;
            
            const productId = productCard.dataset.productId;
            const product = getProductById(productId);
            if (product) window.open(product.url, '_blank');
        });

        document.addEventListener('click', function(e) {
            const heartIcon = e.target.closest('.heart-icon');
            if (!heartIcon) return;
            
            e.stopPropagation();
            const productCard = heartIcon.closest('.product-card');
            const productId = productCard.dataset.productId;
            const favs = toggleFavorite(productId);
            
            if (favs.includes(productId)) {
                heartIcon.classList.add('favorite');
                const svgPath = heartIcon.querySelector('svg path');
                svgPath.style.fill = 'rgb(25, 61, 176)';
                svgPath.style.stroke = 'rgb(25, 61, 176)';
            } else {
                heartIcon.classList.remove('favorite');
                const svgPath = heartIcon.querySelector('svg path');
                svgPath.style.fill = '#fff';
                svgPath.style.stroke = '#B6B7B9';
            }
        });
    };

    const getFavorites = () => {
        try {
            return JSON.parse(localStorage.getItem('carousel_favorites')) || [];
        } catch (e) {
            return [];
        }
    };

    const setFavorites = (favs) => {
        localStorage.setItem('carousel_favorites', JSON.stringify(favs));
    };

    const toggleFavorite = (id) => {
        const favs = getFavorites();
        const idx = favs.indexOf(id);
        if (idx > -1) favs.splice(idx, 1);
        else favs.push(id);
        setFavorites(favs);
        return favs;
    };

    const getProductById = (id) => {
        const products = localStorage.getItem('carousel_products');
        if (products) {
            const parsedProducts = JSON.parse(products);
            return parsedProducts.find(p => p.id === id);
        }
        return null;
    };

    init();
})();