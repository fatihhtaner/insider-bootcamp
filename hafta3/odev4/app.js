(function () {

  function loadjQuery() {
    return new Promise((resolve, reject) => {
      if (window.jQuery) {
        resolve(window.jQuery);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
      script.onload = () => resolve(window.jQuery);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadFontAwesome() {
    return new Promise((resolve) => {
      if (document.querySelector('link[href*="font-awesome"]')) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      link.onload = () => resolve();
      document.head.appendChild(link);
    });
  }

  function addStyles() {
    const styles = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 30px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .header h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 2.5em;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .search-section {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 20px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .search-form {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .search-input {
                    padding: 12px 20px;
                    border: 2px solid #e1e5e9;
                    border-radius: 25px;
                    font-size: 16px;
                    width: 300px;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .search-btn {
                    padding: 12px 25px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .search-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                .carousel-section {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 30px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: relative;
                }

                .carousel-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                    font-size: 1.8em;
                }

                .featured-carousel {
                    margin: 0 auto;
                    max-width: 800px;
                    position: relative;
                    overflow: hidden;
                }

                .carousel-container {
                    display: flex;
                    transition: transform 0.5s ease;
                    width: 100%;
                }

                .carousel-item {
                    text-align: center;
                    padding: 20px;
                    min-width: 100%;
                    flex-shrink: 0;
                    box-sizing: border-box;
                }

                .carousel-item img {
                    max-width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 15px;
                }

                .carousel-item h3 {
                    color: #333;
                    margin-bottom: 10px;
                }

                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(102, 126, 234, 0.8);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    font-size: 18px;
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .carousel-nav:hover {
                    background: rgba(102, 126, 234, 1);
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-nav.prev {
                    left: 10px;
                }

                .carousel-nav.next {
                    right: 10px;
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 20px;
                }

                .carousel-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .carousel-dot.active {
                    background: rgba(102, 126, 234, 1);
                    transform: scale(1.2);
                }

                .main-content {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 30px;
                }

                .product-section {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .section-title {
                    color: #333;
                    margin-bottom: 25px;
                    font-size: 1.8em;
                    text-align: center;
                }

                #productList {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                }

                .product-card {
                    background: white;
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .product-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transition: left 0.5s;
                }

                .product-card:hover::before {
                    left: 100%;
                }

                .product-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .product-image:hover {
                    transform: scale(1.05);
                }

                .product-title {
                    font-size: 1.2em;
                    color: #333;
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                .product-description {
                    color: #666;
                    margin-bottom: 15px;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product-price {
                    font-size: 1.4em;
                    color: #667eea;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .product-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    flex: 1;
                    min-width: 120px;
                }

                .btn-primary {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                .btn-secondary {
                    background: linear-gradient(45deg, #f093fb, #f5576c);
                    color: white;
                }

                .btn-secondary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
                }

                .btn-danger {
                    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
                    color: white;
                }

                .btn-danger:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
                }

                .cart-section {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 15px;
                    padding: 25px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    height: fit-content;
                    position: sticky;
                    top: 20px;
                }

                .cart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .cart-count {
                    background: #667eea;
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                }

                #cart {
                    min-height: 200px;
                }

                .cart-item {
                    background: white;
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 15px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    animation: slideInRight 0.3s ease;
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }

                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .cart-item img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 5px;
                    margin-right: 10px;
                }

                .cart-item-info {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .cart-item-title {
                    font-weight: 600;
                    color: #333;
                    flex: 1;
                }

                .cart-item-price {
                    color: #667eea;
                    font-weight: bold;
                }

                .cart-total {
                    border-top: 2px solid #e1e5e9;
                    padding-top: 15px;
                    margin-top: 15px;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #333;
                }

                .empty-cart {
                    text-align: center;
                    color: #666;
                    font-style: italic;
                    padding: 40px 20px;
                }

                .loading {
                    text-align: center;
                    padding: 40px;
                    color: #666;
                }

                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #667eea;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }

                    100% {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 768px) {
                    .main-content {
                        grid-template-columns: 1fr;
                    }

                    .search-input {
                        width: 100%;
                    }

                    #productList {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    }
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: none;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }

                .modal-content {
                    background: white;
                    border-radius: 15px;
                    padding: 30px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: modalSlideIn 0.3s ease;
                }

                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8) translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .modal-close:hover {
                    color: #333;
                    background: rgba(0, 0, 0, 0.1);
                }

                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 5px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                    display: none;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }

                .notification.show {
                    display: block;
                    transform: translateX(0);
                }
            </style>
        `;

    if (!document.getElementById("ecommerce-styles")) {
      const styleElement = document.createElement("div");
      styleElement.id = "ecommerce-styles";
      styleElement.innerHTML = styles;
      document.head.appendChild(styleElement);
    }
  }

  function createHTML() {
    if (document.getElementById("ecommerce-app")) {
      return;
    }

    const html = `
            <div id="ecommerce-app" class="container">
                <div class="header">
                    <h1><i class="fas fa-shopping-cart"></i>E-nsider</h1>
                </div>

                <div class="search-section">
                    <form class="search-form" id="searchForm">
                        <input type="text" class="search-input" id="searchInput" placeholder="Mens Cotton T-Shirt">
                        <button type="submit" class="search-btn">
                            <i class="fas fa-search"></i> Ara
                        </button>
                    </form>
                </div>

                <div class="carousel-section">
                    <h2 class="carousel-title">Öne Çıkan Ürünler</h2>
                    <div class="featured-carousel" id="featuredCarousel">
                        <button class="carousel-nav prev" id="prevBtn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="carousel-nav next" id="nextBtn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="carousel-container" id="carouselContainer">
                            <div class="loading">
                                <div class="spinner"></div>
                                <p>Öne çıkan ürünler yükleniyor...</p>
                            </div>
                        </div>
                        <div class="carousel-dots" id="carouselDots"></div>
                    </div>
                </div>

                <div class="main-content">
                    <div class="product-section">
                        <h2 class="section-title">Ürün Listesi</h2>
                        <div id="productList">
                            <div class="loading">
                                <div class="spinner"></div>
                                <p>Ürünler yükleniyor...</p>
                            </div>
                        </div>
                    </div>

                    <div class="cart-section">
                        <div class="cart-header">
                            <h3 style="color: #000;"><i class="fas fa-shopping-bag" style="color:rgb(0, 0, 0);"></i> Sepetim</h3>
                            <span class="cart-count" id="cartCount">0</span>
                        </div>
                        <div id="cart">
                            <div class="empty-cart">
                                <i class="fas fa-shopping-bag" style="font-size: 3em; color: #ccc; margin-bottom: 15px;"></i>
                                <p>Sepetiniz boş</p>
                            </div>
                        </div>
                        <div class="cart-total" id="cartTotal" style="display: none;">
                            Toplam: <span id="totalAmount">0</span> TL
                        </div>
                        <button class="btn btn-danger" id="clearCart" style="width: 100%; margin-top: 15px; display: none;">
                            <i class="fas fa-trash"></i> Sepeti Temizle
                        </button>
                    </div>
                </div>
            </div>

            <div class="modal-overlay" id="productModal">
                <div class="modal-content">
                    <button class="modal-close" id="closeModal">&times;</button>
                    <div id="modalContent"></div>
                </div>
            </div>

            <div class="notification" id="notification"></div>
        `;

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  async function initEcommerce() {
    try {
      console.log("Uygulama başlatılıyor...");
      
      const $ = await loadjQuery();
      console.log("jQuery yüklendi:", $.fn.jquery);

      await loadFontAwesome();
      console.log("Font Awesome yüklendi");

      addStyles();
      console.log("CSS stilleri eklendi");

      createHTML();
      console.log("HTML yapısı oluşturuldu");

      $.fn.ecommerceUtils = function(options) {
        const settings = $.extend({
          animationSpeed: 300,
          enableNotifications: true,
          autoSave: true
        }, options);

        return this.each(function() {
          const $element = $(this);
          
          $element.data('ecommerce-settings', settings);
          
          $element.addToCart = function(product) {
            if (settings.enableNotifications) {
              showNotification("Ürün sepete eklendi!", "success");
            }
            return this;
          };
          
          $element.removeFromCart = function(productId) {
            if (settings.enableNotifications) {
              showNotification("Ürün sepetten çıkarıldı!", "info");
            }
            return this;
          };
        });
      };

      $('body').ecommerceUtils({
        animationSpeed: 300,
        enableNotifications: true,
        autoSave: true
      });
      console.log("jQuery yüklendi");

      let products = [];
      let cart = [];

      function loadProducts() {
        console.log("Ürünler yükleniyor");
        
        $.ajax({
          url: "https://fakestoreapi.com/products",
          method: "GET",
          dataType: "json",
          timeout: 10000,
          success: function (data) {
            
            if (!data || !Array.isArray(data)) {
              console.error("geçersiz veri", data);
              showNotification("API'den geçersiz veri geldi!", "error");
              return;
            }
            
            products = data;
            renderProducts(data);
            renderFeaturedProducts();
            showNotification(`${data.length} ürün yüklendi!`, "success");
          },
          error: function (xhr, status, error) {
            console.error("hata:");
            console.error("Status:", status);
            console.error("Error:", error);
            console.error("Response:", xhr.responseText);
            
            $("#productList").html(`
              <div class="error-message" style="text-align: center; padding: 20px;">
                <p style="color: #f44336; margin-bottom: 15px;">⚠️ API'ye bağlanılamadı!</p>
                <p style="color: #666; margin-bottom: 15px;">Lütfen internet bağlantınızı kontrol edin.</p>
                <button class="btn btn-primary" onclick="loadProducts()">🔄 Tekrar Dene</button>
              </div>
            `);
            
            showNotification("API hatası! Lütfen tekrar deneyin.", "error");
          },
        });
      }

      function createProductTemplate() {
        const template = `
          <div class="product-card" data-product-id="" style="display: none;">
            <img src="" alt="" class="product-image">
            <h3 class="product-title"></h3>
            <p class="product-description"></p>
            <div class="product-price"></div>
            <div class="product-actions">
              <button class="btn btn-primary addToCartBtn" data-product-id="">
                <i class="fas fa-shopping-cart"></i> Sepete Ekle
              </button>
              <button class="btn btn-secondary showDetailBtn" data-product-id="">
                <i class="fas fa-eye"></i> Detay
              </button>
            </div>
          </div>
        `;
        
        const $template = $(template);
        $template.attr('id', 'product-template');
        $('body').append($template);
        return $template;
      }

      function renderProducts(productsToRender) {
        
        if (!productsToRender) {
          $("#productList").html(`
            <div class="error-message" style="text-align: center; padding: 20px;">
              <p style="color: #f44336;">Ürün verisi bulunamadı!</p>
              <button class="btn btn-primary" onclick="loadProducts()">Yeniden Yükle</button>
            </div>
          `);
          return;
        }
        
        if (!Array.isArray(productsToRender)) {
          console.error("productsToRender", typeof productsToRender);
          $("#productList").html(`
            <div class="error-message" style="text-align: center; padding: 20px;">
              <p style="color: #f44336;">Geçersiz veri formatı!</p>
              <button class="btn btn-primary" onclick="loadProducts()">Yeniden Yükle</button>
            </div>
          `);
          return;
        }
        
        if (productsToRender.length === 0) {
          console.log("Ürün listesi boş");
          $("#productList").html(`
            <div class="no-products" style="text-align: center; padding: 20px;">
              <p style="color: #666;">🔍 Ürün bulunamadı.</p>
              <button class="btn btn-primary" onclick="renderProducts(products)">🔄 Tüm Ürünleri Göster</button>
            </div>
          `);
          return;
        }
        
        const $template = createProductTemplate();
        const $productList = $("#productList");
        $productList.empty();

        $.each(productsToRender, function(index, product) {
          console.log(`Ürün ${index + 1}:`, product);
          
          if (!product || !product.id) {
            console.error("❌ Geçersiz ürün:", product);
            return;
          }
          
          const $productCard = $template.clone(true);

          $productCard.removeAttr('id').show();

          $productCard.attr('data-product-id', product.id);
          $productCard.find('.product-image').attr('src', product.image || 'https://via.placeholder.com/300x300?text=No+Image').attr('alt', product.title || 'Ürün');
          $productCard.find('.product-title').text(product.title || 'İsimsiz Ürün');
          $productCard.find('.product-description').text(product.description || 'Açıklama yok');
          $productCard.find('.product-price').text((product.price || 0) + ' TL');
          $productCard.find('.addToCartBtn').attr('data-product-id', product.id);
          $productCard.find('.showDetailBtn').attr('data-product-id', product.id);
          
          $productCard.hide().appendTo($productList).fadeIn(300);
        });

        $('#product-template').remove();
      }

      function renderFeaturedProducts() {
        const featuredProducts = products
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 4);

        if (featuredProducts.length === 0) {
          $("#carouselContainer").html(`
            <div class="no-products">
                <p>Öne çıkan ürün bulunamadı.</p>
            </div>
          `);
          return;
        }

        const carouselHTML = featuredProducts
          .map(
            (product) => `
                    <div class="carousel-item" data-product-id="${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.description.substring(0, 100)}...</p>
                        <div style="color: #667eea; font-weight: bold; margin: 10px 0;">${product.price} TL</div>
                        <div style="color: #ffd700; margin-bottom: 15px;">⭐ ${product.rating.rate}/5 (${product.rating.count} oy)</div>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button class="btn btn-primary addToCartBtn" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Sepete Ekle
                            </button>
                            <button class="btn btn-secondary showDetailBtn" data-product-id="${product.id}">
                                <i class="fas fa-eye"></i> Detay
                            </button>
                        </div>
                    </div>
                `
          )
          .join("");

        $("#carouselContainer").html(carouselHTML);
        
        createCarouselDots(featuredProducts.length);
        
        initSlider();
      }

      function createCarouselDots(count) {
        const dotsHTML = Array.from({ length: count }, (_, i) => 
          `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');
        
        $("#carouselDots").html(dotsHTML);
      }

      function initSlider() {
        const $container = $("#carouselContainer");
        const $items = $container.find(".carousel-item");
        const $dots = $(".carousel-dot");
        const $prevBtn = $("#prevBtn");
        const $nextBtn = $("#nextBtn");
        
        if ($items.length <= 1) {
          $prevBtn.hide();
          $nextBtn.hide();
          return;
        }
        
        let currentIndex = 0;
        const totalItems = $items.length;
        
        function goToSlide(index) {
          if (index < 0) index = totalItems - 1;
          if (index >= totalItems) index = 0;
          
          currentIndex = index;
          const translateX = -index * 100;
          
          $container.css('transform', `translateX(${translateX}%)`);
          
          $dots.removeClass('active').eq(index).addClass('active');
        }
        
        $prevBtn.on('click', () => goToSlide(currentIndex - 1));
        $nextBtn.on('click', () => goToSlide(currentIndex + 1));
        
        $dots.on('click', function() {
          const index = $(this).data('index');
          goToSlide(index);
        });
        
        setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
        
        let startX = 0;
        let endX = 0;
        
        $container.on('touchstart', function(e) {
          startX = e.originalEvent.touches[0].clientX;
        });
        
        $container.on('touchend', function(e) {
          endX = e.originalEvent.changedTouches[0].clientX;
          const diff = startX - endX;
          
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              goToSlide(currentIndex + 1);
            } else {
              goToSlide(currentIndex - 1);
            }
          }
        });
      }

      function handleSearch() {
        const searchTerm = $("#searchInput").val().trim();

        if (!searchTerm) {
          renderProducts(products);
          return;
        }

        if (!isNaN(searchTerm)) {
          const productId = parseInt(searchTerm);
          const foundProduct = products.find((p) => p.id === productId);

          if (foundProduct) {
            renderProducts([foundProduct]);
            showNotification("Ürün bulundu!", "success");
          } else {
            renderProducts([]);
            showNotification("Ürün bulunamadı!", "error");
          }
        } else {
          const filteredProducts = products.filter(
            (product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );

          renderProducts(filteredProducts);
          showNotification(`${filteredProducts.length} ürün bulundu`, "info");
        }
      }

      function debounce(func, wait, immediate) {
        let timeout;
        return function() {
          const context = this, args = arguments;
          const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }

      const debouncedSearch = debounce(handleSearch, 500);

      function addToCart(productId) {

        const product = products.find((p) => p.id === productId);
        console.log("Bulunan ürün:", product);
        
        if (!product) {
          console.error("Ürün bulunamadı, productId:", productId);
          showNotification("Ürün bulunamadı!", "error");
          return;
        }

        if (!cart || !Array.isArray(cart)) {
          cart = [];
        }

        const existingItem = cart.find((item) => item.id === productId);
        console.log("Mevcut sepet item:", existingItem);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          const newCartItem = {
            ...product,
            quantity: 1,
          };
          console.log("Yeni cart item:", newCartItem);
          cart.push(newCartItem);
        }

        saveCartToStorage();
        updateCartUI();
        
        $('body').addToCart(product);
        console.log("Sepete ekleme tamamlandı");
      }

      function removeFromCart(productId) {
        const $cartItem = $(`.cart-item[data-product-id="${productId}"]`);
        const $productCard = $cartItem.closest('.cart-item');
        
        $productCard.slideUp(300, function() {
          $(this).remove();
          
          const itemIndex = cart.findIndex((item) => item.id === productId);
          if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            saveCartToStorage();
            updateCartUI();
            
            $('body').removeFromCart(productId);
          }
        });
      }

      function updateCartUI() {
        
        if (!cart || !Array.isArray(cart)) {
          cart = [];
        }
        
        const cartCount = cart.reduce(
          (total, item) => {
            console.log("Cart item:", item);
            if (!item || !item.quantity) {
              console.error("Geçersiz cart item:", item);
              return total;
            }
            return total + item.quantity;
          },
          0
        );
        
        const totalAmount = cart.reduce(
          (total, item) => {
            if (!item || !item.price || !item.quantity) {
              console.error("Geçersiz cart item for total:", item);
              return total;
            }
            return total + item.price * item.quantity;
          },
          0
        );

        console.log("Cart count:", cartCount);
        console.log("Total amount:", totalAmount);

        $("#cartCount").text(cartCount);

        if (cart.length === 0) {
          console.log("Sepet boş, boş sepet gösteriliyor");
          $("#cart").html(`
            <div class="empty-cart">
              <i class="fas fa-shopping-bag" style="font-size: 3em; color: #ccc; margin-bottom: 15px;"></i>
              <p>Sepetiniz boş</p>
            </div>
          `);
          $("#cartTotal, #clearCart").hide();
        } else {
          const $cart = $("#cart");
          $cart.empty();

          $.each(cart, function(index, item) {
            console.log(`Cart item ${index + 1}:`, item);
            
            if (!item || !item.id) {
              console.error("Geçersiz cart item:", item);
              return;
            }
            
            const $cartItem = $(`
              <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image || 'https://via.placeholder.com/50x50?text=No+Image'}" alt="${item.title || 'Ürün'}">
                <div class="cart-item-info">
                  <div class="cart-item-title">${item.title || 'İsimsiz Ürün'}</div>
                  <div class="cart-item-price">${item.price || 0} TL (${item.quantity || 0} adet)</div>
                </div>
                <button class="btn btn-danger removeFromCartBtn" data-product-id="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `);
            
            console.log("Cart item DOM oluşturuldu:", $cartItem);
            $cartItem.hide().appendTo($cart).slideDown(300);
          });

          $("#totalAmount").text(totalAmount.toFixed(2));
          $("#cartTotal, #clearCart").show();
          console.log("Sepet UI güncelleme tamamlandı");
        }
      }

      function saveCartToStorage() {
        
        try {
          const cartJson = JSON.stringify(cart);
          console.log("JSON string:", cartJson);
          localStorage.setItem("ecommerce_cart", cartJson);
        } catch (error) {
          console.error("hata:", error);
        }
      }

      function loadCartFromStorage() {
        
        try {
          const savedCart = localStorage.getItem("ecommerce_cart");
          
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            
            if (Array.isArray(parsedCart)) {
              cart = parsedCart;
              console.log("Sepet başarıyla yüklendi, item sayısı:", cart.length);
              updateCartUI();
            } else {
              cart = [];
            }
          } else {
            console.log("LocalStorage'da sepet bulunamadı");
            cart = [];
          }
        } catch (error) {
          console.error("hata:", error);
          cart = [];
        }
      }

      function showProductDetail(productId) {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        const modalHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start;">
                        <div>
                            <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        </div>
                        <div>
                            <h2 style="color: #333; margin-bottom: 15px; font-size: 1.5em;">${product.title}</h2>
                            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${product.description}</p>
                            <div style="font-size: 2em; color: #667eea; font-weight: bold; margin: 15px 0;">
                                ${product.price} TL
                            </div>
                            <div style="margin-bottom: 10px; color: #000;"><strong>Kategori:</strong> ${product.category}</div>
                            <div style="margin-bottom: 20px; color: #000;"><strong>Değerlendirme:</strong> ⭐ ${product.rating.rate}/5 (${product.rating.count} oy)</div>
                            <div style="display: flex; gap: 15px; margin-top: 25px;">
                                <button class="btn btn-primary addToCartBtn" data-product-id="${product.id}" style="flex: 1;">
                                    <i class="fas fa-shopping-cart"></i> Sepete Ekle
                                </button>
                                <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">
                                    <i class="fas fa-times"></i> Kapat
                                </button>
                            </div>
                        </div>
                    </div>
                `;

        $("#modalContent").html(modalHTML);
        
        $("body").css("overflow", "hidden");
        
        $("#productModal").css("display", "flex").show();
      }

      function closeModal() {
        $("body").css("overflow", "");
        
        $("#productModal").hide();
      }

      function showNotification(message, type = "info") {
        const $notification = $("#notification");

        $notification
          .removeClass("success error info")
          .addClass(type)
          .text(message)
          .addClass("show");

        setTimeout(() => {
          $notification.removeClass("show");
          setTimeout(() => {
            $notification.css("display", "none");
          }, 300);
        }, 3000);
      }

      $("#searchForm").on("submit", function (e) {
        e.preventDefault();
        handleSearch();
      });

      $("#searchInput").on("input", debouncedSearch);

      $("#closeModal").on("click", closeModal);
      $("#productModal").on("click", function (e) {
        if (e.target === this) closeModal();
      });

      $(document).on("keydown", function(e) {
        if (e.key === "Escape" && $("#productModal").is(":visible")) {
          closeModal();
        }
      });

      $("#clearCart").on("click", function() {
        const $cartItems = $("#cart").find('.cart-item');

        $.each($cartItems, function(index, item) {
          $(item).delay(index * 100).slideUp(300, function() {
            $(this).remove();
          });
        });
        
        setTimeout(() => {
          cart = [];
          saveCartToStorage();
          updateCartUI();
          showNotification("Sepet temizlendi!", "info");
        }, $cartItems.length * 100 + 300);
      });

      $(document).on("click", ".addToCartBtn", function () {
        const productId = $(this).data("product-id");
        addToCart(productId);
      });

      $(document).on("click", ".showDetailBtn", function () {
        const productId = $(this).data("product-id");
        showProductDetail(productId);
      });

      $(document).on("click", ".removeFromCartBtn", function () {
        const productId = $(this).data("product-id");
        removeFromCart(productId);
      });

      loadProducts();
      loadCartFromStorage();

      window.ecommerceApp = {
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart: function() {
          cart = [];
          saveCartToStorage();
          updateCartUI();
          showNotification("Sepet temizlendi!", "info");
        },
        showProductDetail,
        loadProducts,
        renderFeaturedProducts,
        initSlider,
        createCarouselDots,
        handleSearch,
        debouncedSearch,
        debounce,
   
        testTraversing: function() {
          const $firstProduct = $('.product-card').first();
          const $title = $firstProduct.find('.product-title');
          const $card = $title.closest('.product-card');
          console.log('Traversing test:', $card.attr('data-product-id'));
        },
        testClone: function() {
          const $template = $('.product-card').first().clone(true);
          $template.find('.product-title').text('Cloned Product');
          $('#productList').append($template.fadeIn(300));
        }
      };

      console.log("Uygulama başarıyla yüklendi!");

    } catch (error) {
      console.error("Uygulama yüklenirken hata oluştu:", error);
    }
  }

  initEcommerce();
})();
