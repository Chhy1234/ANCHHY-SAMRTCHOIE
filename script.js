// Example product data
const products = [
    {
        name: "Xiaomi 15 ultra",
        desc: "Snapdragon 8 Gen 3 / 120Hz",
        price: "1199$",
        img: "mi15.png",
        longDesc: "CPU: Snapdragon 8 Gen 3, Refresh Rate: 120Hz"
    },
    {
        name: "vivo x200 pro",
        desc: "Dimensity 9300 / 120Hz",
        price: "1099$",
        img: "https://img-prd-pim.poorvika.com/product/Vivo-x200-pro-5g-titanium-grey-512gb-16gb-ram-Front-Back-View-Image.png",
        longDesc: "CPU: Dimensity 9300, Refresh Rate: 120Hz"
    },
    {
        name: "samsung galaxy s25 ultra",
        desc: "Snapdragon 8 Gen 4 / 120Hz",
        price: "1199$",
        img: "S25Ultra.png",
        longDesc: "CPU: Snapdragon 8 Gen 4, Refresh Rate: 120Hz"
    },
    {
        name: "iphone 16 pro max",
        desc: "A18 Pro / 120Hz",
        price: "1299$",
        img: "gold16Promax.jpg",
        longDesc: "CPU: Apple A18 Pro, Refresh Rate: 120Hz"
    },
    {
        name: "oneplus 13",
        desc: "Snapdragon 8 Gen 3 / 120Hz",
        price: "1099$",
        img: "OnePlus13.jpg",
        longDesc: "CPU: Snapdragon 8 Gen 3, Refresh Rate: 120Hz"
    },
    {
        name: "oppo find x8 pro",
        desc: "Snapdragon 8 Gen 3 / 120Hz",
        price: "1099$",
        img: "FindX8.png",
        longDesc: "CPU: Snapdragon 8 Gen 3, Refresh Rate: 120Hz"
    },
    {
        name: "pova 6 pro",
        desc: "Dimensity 7020 / 120Hz",
        price: "799$",
        img: "https://d13pvy8xd75yde.cloudfront.net/global/pova6/800%2A800/KJ6_%E6%99%93%E9%9B%BE%E8%B1%A1%E7%89%99%E7%99%BD_V3.1_20231018.png",
        longDesc: "CPU: Dimensity 7020, Refresh Rate: 120Hz"
    },
    {
        name: "iPhone 15",
        desc: "8GB/256GB · Apple A17 Pro / 120Hz",
        price: "999$",
        img: "iPhone15.webp",
        longDesc: "8GB/256GB · Apple A17 Pro / 120Hz"
    },
    {
        name: "Samsung Galaxy S24",
        desc: "8GB/256GB · Snapdragon 8 Gen 3 / 120Hz",
        price: "999$",
        img: "Samsung/s24.webp",
        longDesc: "8GB/256GB · Snapdragon 8 Gen 3 / 120Hz"
    },
    {
        name: "Google Pixel 8 Pro",
        desc: "12GB/256GB · Google Tensor G3 / 120Hz",
        price: "999$",
        img: "Google-Pixel-9-Pro.png",
        longDesc: "12GB/256GB · Google Tensor G3 / 120Hz"
    },
    {
        name: "Realme GT 6",
        desc: "12GB/256GB · Snapdragon 8s Gen 3 / 120Hz",
        price: "899$",
        img: "realme-gt6.jpg",
        longDesc: "12GB/256GB · Snapdragon 8s Gen 3 / 120Hz"
    },
    {
        name: "Honor Magic 6",
        desc: "12GB/512GB · Snapdragon 8 Gen 3 / 120Hz",
        price: "1099$",
        img: "honor-magic6-pro.jpg",
        longDesc: "12GB/512GB · Snapdragon 8 Gen 3 / 120Hz"
    }
    // ...add more products as needed
];

/**
 * Render the product list in the page
 */
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    // Loop through the products array and create a product card for each
    products.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer';
        // Set the onclick event to show the product detail popup
        card.onclick = function() {
            showProductDetail(p.img, p.name, p.desc, p.price, p.longDesc);
        };
        // Create the HTML for the product card
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="name">${p.name}</div>
            <div class="desc">${p.desc}</div>
            <div class="price">${p.price}</div>
            <div class="action-buttons" style="width:100%;display:flex;flex-direction:column;gap:6px;margin-top:auto;">
                <button onclick="event.stopPropagation();addToCart('${p.name}')">add to cart</button>
            </div>
        `;
        list.appendChild(card);
    });
}

window.addToCart = function(name) {
    // Find the product by name
    let p = products.find(prod => prod.name === name);
    if (!p) {
        // Try to find in moreProducts if available
        if (typeof moreProducts !== "undefined") {
            p = moreProducts.find(prod => prod.name === name);
        }
    }
    if (!p) {
        alert(`Added ${name} to cart!`);
        return;
    }
    // Store item in localStorage for cart.html
    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    } catch {}
    cartItems.push({
        img: p.img,
        name: p.name,
        desc: p.desc,
        price: p.price
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Update badge
    let cartIcon = document.querySelector('.cart');
    if (cartIcon) {
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
        }
        badge.textContent = cartItems.length;
        badge.style.display = 'inline-block';
    }
    alert(`Added ${name} to cart!`);
};

// Carousel logic
let currentSlide = 0;
const totalSlides = 4; // Number of images in carousel

function showSlide(idx) {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    currentSlide = (idx + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

window.nextSlide = function() {
    showSlide(currentSlide + 1);
};

window.prevSlide = function() {
    showSlide(currentSlide - 1);
};

window.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    renderProducts();
});

window.showProductDetail = function(img, name, desc, price, longDesc) {
    const detail = document.getElementById('modal-detail-content');
    detail.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:18px;">
            <div style="display:flex;flex-direction:column;align-items:center;">
                <input type="text" id="select-product-input" placeholder="Enter product name to buy/cancel/remove" style="padding:6px 10px;border-radius:5px;border:1px solid #ccc;width:140px;margin-bottom:10px;">
                <img src="${img}" alt="${name}" class="product-detail-img">
            </div>
            <div class="product-detail-info">
                <h2>${name}</h2>
                <p class="desc">${desc}</p>
                <p class="price">${price}</p>
                <div class="action-buttons" style="display:flex;gap:12px;margin-top:auto;">
                    <button onclick="addToCart('${name}')">add to cart</button>
                    <button onclick="buyNow('${name}')" style="background:#2563eb;color:#fff;border:none;padding:8px 18px;border-radius:5px;font-weight:bold;cursor:pointer;">Buy</button>
                    <button id="cancel-btn" style="background:#eee;color:#222;border:none;padding:8px 18px;border-radius:5px;font-weight:bold;cursor:pointer;">Cancel</button>
                    <button id="remove-btn" style="background:#ffdddd;color:#c00;border:none;padding:8px 18px;border-radius:5px;font-weight:bold;cursor:pointer;">Remove</button>
                </div>
                <label style="margin-left:18px;">
                    <input type="checkbox" id="cancel-checkbox" style="vertical-align:middle;margin-right:6px;">
                    Select for cancel/remove
                </label>
                <p class="long-desc">${longDesc || ""}</p>
            </div>
        </div>
    `;
    document.getElementById('product-modal').style.display = 'flex';

    // Add logic: if "Select for cancel" is checked, enable Cancel/Remove button, else disable
    const cancelBtn = document.getElementById('cancel-btn');
    const removeBtn = document.getElementById('remove-btn');
    const cancelCheckbox = document.getElementById('cancel-checkbox');
    const selectInput = document.getElementById('select-product-input');
    if (cancelBtn && cancelCheckbox && selectInput && removeBtn) {
        cancelBtn.disabled = true;
        removeBtn.disabled = true;
        function updateBtns() {
            const match = selectInput.value.trim().toLowerCase() === name.toLowerCase();
            cancelBtn.disabled = !(cancelCheckbox.checked && match);
            removeBtn.disabled = !(cancelCheckbox.checked && match);
        }
        cancelCheckbox.addEventListener('change', updateBtns);
        selectInput.addEventListener('input', updateBtns);
        cancelBtn.addEventListener('click', function() {
            if (cancelCheckbox.checked && selectInput.value.trim().toLowerCase() === name.toLowerCase()) {
                closeProductDetail();
            }
        });
        removeBtn.addEventListener('click', function() {
            if (cancelCheckbox.checked && selectInput.value.trim().toLowerCase() === name.toLowerCase()) {
                // Remove from cart in localStorage
                let cartItems = [];
                try {
                    cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                } catch {}
                const idx = cartItems.findIndex(item => item.name && item.name.toLowerCase() === name.toLowerCase());
                if (idx !== -1) {
                    cartItems.splice(idx, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    // Optionally update badge
                    let cartIcon = document.querySelector('.cart');
                    if (cartIcon) {
                        let badge = cartIcon.querySelector('.cart-badge');
                        if (badge) {
                            badge.textContent = cartItems.length;
                            badge.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
                        }
                    }
                    alert('Removed from cart!');
                }
                closeProductDetail();
            }
        });
    }
};

window.buyNow = function(name) {
    addToCart(name);
    window.location.href = "cart.html";
};

window.closeProductDetail = function() {
    document.getElementById('product-modal').style.display = 'none';
};

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeProductDetail();
});
document.addEventListener('click', function(e) {
    const modal = document.getElementById('product-modal');
    if (modal && modal.style.display === 'flex' && e.target === modal) {
        closeProductDetail();
    }
});

// For use on more-products.html: show product detail modal by index
window.showProductDetailByIdx = function(idx) {
    const p = moreProducts[idx];
    const modal = document.getElementById('product-modal');
    const detail = document.getElementById('modal-detail-content');
    detail.innerHTML = `
        <img src="${p.img}" alt="${p.name}" class="product-detail-img">
        <div class="product-detail-info">
            <h2>${p.name}</h2>
            <p class="desc">${p.desc}</p>
            <p class="price">${p.price}</p>
            <button onclick="addToCart('${p.name}')">add to cart</button>
            <p class="long-desc">${p.longDesc || ""}</p>
        </div>
    `;
    modal.style.display = 'flex';
};

// Add to cart alert and icon badge logic
document.addEventListener('DOMContentLoaded', function () {
    let cartCount = 0;

    // Restore cart count from localStorage
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartCount = cartItems.length;
        updateCartBadge(cartCount);
    } catch {}

    // Find all add to cart buttons
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'add to cart') {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                // Store item in localStorage for cart.html
                const productCard = btn.closest('.product-card, .product-detail-container');
                const img = productCard ? productCard.querySelector('img') : null;
                const item = {
                    img: img ? img.src : '',
                    name: productCard && productCard.querySelector('.name, h2') ? productCard.querySelector('.name, h2').textContent : '',
                    desc: productCard && productCard.querySelector('.desc') ? productCard.querySelector('.desc').textContent : '',
                    price: productCard && productCard.querySelector('.price') ? productCard.querySelector('.price').textContent : ''
                };
                let cartItems = [];
                try {
                    cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                } catch {}
                cartItems.push(item);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                cartCount = cartItems.length;
                alert('Added to cart!');
                updateCartBadge(cartCount);

                // Animate product image to cart icon
                const cartIcon = document.querySelector('.cart');
                if (img && cartIcon) {
                    const imgRect = img.getBoundingClientRect();
                    const cartRect = cartIcon.getBoundingClientRect();
                    const clone = img.cloneNode(true);
                    clone.style.position = 'fixed';
                    clone.style.left = imgRect.left + 'px';
                    clone.style.top = imgRect.top + 'px';
                    clone.style.width = imgRect.width + 'px';
                    clone.style.height = imgRect.height + 'px';
                    clone.style.transition = 'all 0.7s cubic-bezier(.4,2,.6,1)';
                    clone.style.zIndex = 2000;
                    document.body.appendChild(clone);

                    setTimeout(() => {
                        clone.style.left = (cartRect.left + cartRect.width / 2 - imgRect.width / 4) + 'px';
                        clone.style.top = (cartRect.top + cartRect.height / 2 - imgRect.height / 4) + 'px';
                        clone.style.width = imgRect.width / 2 + 'px';
                        clone.style.height = imgRect.height / 2 + 'px';
                        clone.style.opacity = '0.3';
                    }, 10);

                    setTimeout(() => {
                        clone.remove();
                    }, 800);
                }
            });
        }
    });

    function updateCartBadge(count) {
        let cartIcon = document.querySelector('.cart');
        if (!cartIcon) return;
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
        }
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
});

// Make all "add to cart" buttons work everywhere (including static HTML pages and all brand pages)
function globalAddToCartHandler() {
    document.querySelectorAll('button').forEach(btn => {
        if (
            btn.textContent.trim().toLowerCase() === 'add to cart' &&
            !btn.dataset.cartBound
        ) {
            btn.dataset.cartBound = "1";
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                // Try to get product info from the DOM
                const productCard = btn.closest('.product-card, .product-detail-container');
                let name = '', desc = '', price = '', img = '';
                if (productCard) {
                    // Try both .name and h2 for name
                    let nameEl = productCard.querySelector('.name') || productCard.querySelector('h2');
                    name = nameEl ? nameEl.textContent : '';
                    desc = productCard.querySelector('.desc') ? productCard.querySelector('.desc').textContent : '';
                    price = productCard.querySelector('.price') ? productCard.querySelector('.price').textContent : '';
                    img = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
                }
                // Fallback: try button attribute if present
                if (!name && btn.getAttribute('data-name')) name = btn.getAttribute('data-name');
                if (!desc && btn.getAttribute('data-desc')) desc = btn.getAttribute('data-desc');
                if (!price && btn.getAttribute('data-price')) price = btn.getAttribute('data-price');
                if (!img && btn.getAttribute('data-img')) img = btn.getAttribute('data-img');

                // If still no name, fallback to window.addToCart if available
                if (name && window.addToCart) {
                    window.addToCart(name);
                } else {
                    // Store item in localStorage for cart.html
                    let cartItems = [];
                    try {
                        cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                    } catch {}
                    cartItems.push({ img, name, desc, price });
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    // Update badge
                    let cartIcon = document.querySelector('.cart');
                    if (cartIcon) {
                        let badge = cartIcon.querySelector('.cart-badge');
                        if (!badge) {
                            badge = document.createElement('span');
                            badge.className = 'cart-badge';
                            cartIcon.appendChild(badge);
                        }
                        badge.textContent = cartItems.length;
                        badge.style.display = 'inline-block';
                    }
                    alert(`Added ${name || 'item'} to cart!`);
                }
            });
        }
    });
}

// Global search handler for all pages
function globalSearchHandler() {
    document.querySelectorAll('.search-bar input[type="text"]').forEach(input => {
        // Prevent duplicate binding
        if (input.dataset.searchBound) return;
        input.dataset.searchBound = "1";
        const searchBtn = input.parentElement.querySelector('button');
        function doSearch() {
            const query = input.value.trim().toLowerCase();
            if (!query) return;
            // Try to filter product cards on the page
            const cards = document.querySelectorAll('.product-card');
            let found = false;
            cards.forEach(card => {
                const nameEl = card.querySelector('.name') || card.querySelector('h2');
                const descEl = card.querySelector('.desc');
                const name = nameEl ? nameEl.textContent.toLowerCase() : '';
                const desc = descEl ? descEl.textContent.toLowerCase() : '';
                if (name.includes(query) || desc.includes(query)) {
                    card.style.display = '';
                    found = true;
                } else {
                    card.style.display = 'none';
                }
            });
            // If no cards or not found, fallback to alert
            if (cards.length === 0 || !found) {
                alert('No matching products found.');
            }
        }
        if (searchBtn) {
            searchBtn.onclick = doSearch;
        }
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') doSearch();
        });
    });
}

// Run on DOMContentLoaded and after modal/product renders
document.addEventListener('DOMContentLoaded', function () {
    globalAddToCartHandler();
    globalSearchHandler();
});
