// Main JavaScript file for the website

// Global variables
let currentRoute = '/';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = crystalProducts || [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
    initializeRouter();
    updateCartCount();
    setupEventListeners();

    // Handle initial route
    const path = window.location.pathname;
    navigateTo(path);
});

// Initialize router and navigation
function initializeRouter() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Handle browser back/forward
    window.addEventListener('popstate', function (e) {
        const path = window.location.pathname;
        loadPage(path);
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('translate-y-0');
    mobileMenu.classList.toggle('translate-y-full');
}

// Setup event listeners
function setupEventListeners() {
    window.addEventListener('scroll', handleScroll);
    addScrollToTopButton();
}

function setupAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
}

function setupProductDetailsForm() {
    const form = document.getElementById('product-details-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fd = new FormData(form);
        const product = {
            product_name: fd.get('product_name'),
            quantity: Number(fd.get('quantity') || 1),
            price: Number(fd.get('price') || 0),
        };
        const customer = {
            name: fd.get('name'),
            email: fd.get('email'),
            phone: fd.get('phone'),
            address: fd.get('address')
        };

        // compute total
        const total = product.price * product.quantity;

        // open Razorpay
        try {
            const key = window.RAZORPAY_KEY || 'rzp_test_placeholder';
            if (typeof key !== 'string' || (!key.startsWith('rzp_test_') && !key.startsWith('rzp_live_'))) {
                showNotification('Payment gateway not configured correctly. Please set a valid Razorpay publishable key in index.html.', 'error');
                return;
            }
            const options = {
                key,
                amount: Number(total) * 100,
                currency: 'INR',
                name: customer.name || 'Customer',
                description: product.product_name,
                prefill: {
                    name: customer.name,
                    email: customer.email,
                    contact: customer.phone
                },
                handler: function (response) {
                    // send emails to customer and admin
                    sendOrderEmail({
                        items: [product],
                        total,
                        customer_name: customer.name,
                        customer_email: customer.email,
                        customer_phone: customer.phone,
                        customer_address: customer.address,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id
                    }).then(() => {
                        showNotification('Payment successful and email sent!', 'success');
                        navigateTo('/');
                    }).catch((err) => {
                        console.error('Error sending email', err);
                        showNotification('Payment successful but failed to send email.', 'warning');
                        navigateTo('/');
                    });
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Razorpay error', err);
            showNotification('Failed to open payment gateway. Please try again.', 'error');
        }
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Navigation function
function navigateTo(path) {
    if (path !== window.location.pathname) {
        history.pushState(null, '', path);
    }
    loadPage(path);
    closeMobileMenu();
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.add('translate-y-full');
    mobileMenu.classList.remove('translate-y-0');
}

function loadPage(path) {
    currentRoute = path;
    updateNavigation(path);

    const app = document.getElementById('app');

    switch (path) {
        case '/':
            app.innerHTML = getHomePage();
            initializeHomePage();
            break;
        case '/about-page':
            app.innerHTML = getAboutPage();
            break;
        case '/services':
            app.innerHTML = getServicesPage();
            break;
        case '/products':
            app.innerHTML = getProductsPage();
            displayProducts();
            break;
        case '/product-details':
            app.innerHTML = getProductDetailsPage();
            setupProductDetailsForm();
            break;
        case '/cart':
            app.innerHTML = getCartPage();
            displayCart();
            break;
        case '/appointment':
            app.innerHTML = getAppointmentPage();
            setupAppointmentForm();
            break;
        case '/contact':
            app.innerHTML = getContactPage();
            setupContactForm();
            break;

        default:
            if (path.startsWith('/astro-') || path.startsWith('/palmistry') || path.startsWith('/numerology') || path.startsWith('/face-reading') || path.startsWith('/life-coach')) {
                app.innerHTML = getServiceDetailPage(path);
            } else {
                navigateTo('/');
            }
    }

    window.scrollTo(0, 0);
}

function updateNavigation(path) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('font-bold');
        const hr = item.querySelector('hr');
        if (hr) hr.remove();
    });

    const activeItem = document.querySelector(`[onclick="navigateTo('${path}')"]`);
    if (activeItem) {
        activeItem.classList.add('font-bold');
        activeItem.innerHTML += '<hr class="border-b-2 border-white mt-[1px]">';
    }
}

// Page templates
function getHomePage() {
    return `
        <div class="relative">
            <div class="fixed w-full h-screen bg-white z-0">
            </div>
            
            <div class="flex justify-center items-start w-full absolute inset-0 z-5 pt-28">
                <div class="text-center p-4 w-full max-w-6xl">
                    <div class="mb-2">
                        <img src="src/images/logo/astro achariya logo-01.png" alt="Astro Achariya Logo" class="mx-auto mb-1 w-32 h-32 md:w-40 md:h-10 object-contain">
                        <div class="text-xl md:text-2xl text-gray-800 mb-1 font-light">
                            Astrology • Numerology • Vastu
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <div id="astrology-slider" class="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl shadow-2xl border border-purple-400/30">
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-3 justify-center mb-8">
                        <button onclick="navigateTo('/products')" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400 cosmic-glow">
                            Explore Sacred Crystals
                        </button>
                        <button onclick="navigateTo('/appointment')" class="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border border-yellow-400">
                            Book Consultation
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="px-10 bg-white absolute w-full mt-[-400px]">
                <div class="mt-10 pb-10">
                    <h3 class="font-philosopher text-3xl text-black mb-8 text-center">About the Cosmic Guide</h3>
                    <h3 class="font-dancing text-2xl leading-9 text-gray-700 mb-8 text-center">Namaskar & Blessed Greetings!</h3>
                    <div class="text-center">
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Welcome to my cosmic realm! I am your spiritual guide through the mysteries of the universe, 
                            a master practitioner in the ancient arts of astrology, crystal healing, numerology, and sacred geometry. 
                            With over 21 years of divine experience, I've dedicated my existence to unveiling the cosmic secrets 
                            that govern our destinies and illuminate the path to spiritual awakening.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Born under the mystical energies of Mumbai, Maharashtra, my soul has been attuned to the 
                            spiritual vibrations of ancient India since birth. The sacred wisdom of our ancestors flows through 
                            my being, connecting me to the eternal cosmic consciousness.
                        </p>
                        <p class="text-gray-700 leading-relaxed mb-6">
                            From my earliest memories, the metaphysical realm called to me with an irresistible force. 
                            The stars whispered their secrets, crystals revealed their healing powers, and numbers unveiled 
                            their sacred meanings - all preparing me for this divine mission of guiding souls toward enlightenment.
                        </p>
                        <button onclick="navigateTo('/about-page')" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border border-purple-400">
                            Discover My Cosmic Journey
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="absolute mt-[1600px] md:mt-[1200px] lg:mt-[600px] bg-white w-full">
                <div>
                    <h1 class="text-center text-2xl md:text-3xl lg:text-4xl m-3 font-philosopher mt-[600px] md:mt-[200px] lg:mt-[100px] mb-5">
                         Mystical Services 
                    </h1>
                    <p class="text-center text-lg text-gray-600 mb-8">
                        Unlock the secrets of the universe through ancient wisdom 
                    </p>
                </div>
                
                <div id="services-grid" class="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center w-[90%] m-auto">
                </div>
                

                
                <div class="m-auto w-[50%] mb-4">
                    <h1 class="text-2xl text-center md:text-3xl lg:text-4xl m-3 font-philosopher">Client Stories</h1>
                    <p class="text-center">Explore the inspiring success stories of individuals whose lives have been positively impacted by Achariya Debdutta guidance and expertise.</p>
                </div>
                
                <div class="grid gap-6 md:grid-cols-3 w-[90%] mx-auto mb-16">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="src/images/clientImage/client1.jpg" alt="Client 1" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
                        <p class="text-gray-600 mb-4">"The birth chart reading was incredibly accurate and helped me understand my life's purpose."</p>
                        <h4 class="font-semibold">- Sarah M.</h4>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="src/images/clientImage/client2.jpg" alt="Client 2" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
                        <p class="text-gray-600 mb-4">"Vastu consultation transformed my home's energy completely. Highly recommended!"</p>
                        <h4 class="font-semibold">- Raj P.</h4>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <img src="src/images/clientImage/client3.jpg" alt="Client 3" class="w-20 h-20 rounded-full mx-auto mb-4 object-cover">
                        <p class="text-gray-600 mb-4">"The numerology reading gave me insights I never expected. Life-changing experience!"</p>
                        <h4 class="font-semibold">- Maya K.</h4>
                    </div>
                </div>
                
                ${getFooter()}
            </div>
        </div>
    `;
}

// Initialize home page specific functionality
function initializeHomePage() {
    startAstrologySlider();
    loadFeaturedServices();
}

// Astrology slider functionality
function startAstrologySlider() {
    const slides = [
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: 'Sacred Crystal Healing',
            description: 'Harness the mystical powers of crystals for spiritual transformation'
        },
        {
            image: 'src/images/sliderImages/slide2.jpg',
            title: 'Discover Your Cosmic Energy',
            description: 'Unlock the secrets written in the stars through ancient astrology wisdom'
        },
        {
            image: 'src/images/sliderImages/slide3.jpg',
            title: 'Numerology Insights',
            description: 'Decode your life path through the sacred language of numbers'
        },
        {
            image: 'src/images/sliderImages/slide4.jpg',
            title: 'Spiritual Awakening',
            description: 'Embark on a journey of self-discovery and cosmic enlightenment'
        }
    ];

    const sliderElement = document.getElementById('astrology-slider');
    if (!sliderElement) return;

    let currentSlide = 0;

    function createSliderHTML() {
        let slidesHTML = '';
        slides.forEach((slide, index) => {
            slidesHTML += `
                <div class="absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}" data-slide="${index}">
                    <div class="relative w-full h-full">
                        <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 class="text-xl md:text-2xl font-bold mb-2 gradient-text">${slide.title}</h3>
                            <p class="text-sm md:text-base text-purple-200">${slide.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add indicators
        let indicatorsHTML = '<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">';
        slides.forEach((_, index) => {
            indicatorsHTML += `
                <button onclick="setSlide(${index})" class="w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/75'}"></button>
            `;
        });
        indicatorsHTML += '</div>';

        sliderElement.innerHTML = slidesHTML + indicatorsHTML;
    }

    function updateSlide() {
        const slideElements = sliderElement.querySelectorAll('[data-slide]');
        const indicators = sliderElement.querySelectorAll('button');

        slideElements.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.remove('opacity-0');
                slide.classList.add('opacity-100');
            } else {
                slide.classList.remove('opacity-100');
                slide.classList.add('opacity-0');
            }
        });

        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-yellow-400 scale-125';
            } else {
                indicator.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/75';
            }
        });
    }

    // Global function for indicators
    window.setSlide = function (index) {
        currentSlide = index;
        updateSlide();
    };

    createSliderHTML();

    // No auto-advance - slides change only on click
}

// Load featured services with flip functionality
function loadFeaturedServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    const services = [
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: 'Cosmic Birth Chart Reading',
            description: ' Unveil the celestial blueprint of your soul\'s journey through the stars and planets ',
            link: '/astro-birth-chart-reformation'
        },
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: ' Sacred Space Harmonization',
            description: ' Align your living space with cosmic energies for prosperity and spiritual growth ',
            link: '/astro-vastu-consultancy'
        },
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: '🔮 Spiritual Life Guidance',
            description: ' Transform your destiny through ancient wisdom and unlock your divine potential ',
            link: '/life-coach-and-success-guru'
        },
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: ' Mystical Palm Reading',
            description: ' Decode the sacred lines of your hands to reveal your soul\'s deepest secrets and future path ',
            link: '/palmistry'
        },
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: ' Sacred Number Divination',
            description: ' Unlock the mystical power of numbers to illuminate your life\'s purpose and destiny ',
            link: '/numerology'
        },
        {
            image: 'src/images/sliderImages/slide1.jpg',
            title: ' Ancient Face Divination',
            description: ' Read the cosmic map written upon your face to unveil hidden truths and future possibilities ',
            link: '/face-reading'
        }
    ];

    servicesGrid.innerHTML = services.map(service => `
        <div class="border px-3 py-3 service-flip-card">
            <div class="flipper">
                <div class="front">
                    <img src="${service.image}" alt="${service.title}" class="m-auto object-cover w-full h-60">
                </div>
                <div class="back">
                    <h3 class="text-center m-auto font-bold mb-4">${service.title}</h3>
                    <div class="w-[90%] m-auto">
                        <p class="text-[14px] mb-4">${service.description}</p>
                    </div>
                    <button onclick="navigateTo('${service.link}')" class="text-white mt-2 bg-black hover:bg-transparent border border-black rounded-sm px-3 py-2 hover:border hover:border-black transition duration-700 ease-in-out hover:text-black">
                        Get Started Here
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Setup category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && productCategories) {
        categoryFilter.innerHTML = productCategories.map(cat =>
            `<option value="${cat}">${cat}</option>`
        ).join('');

        categoryFilter.addEventListener('change', function () {
            filterProducts(this.value);
        });
    }

    filterProducts('All');
}

function filterProducts(category) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    let filteredProducts = products;
    if (category !== 'All') {
        filteredProducts = products.filter(product => product.category === category);
    }

    productsGrid.innerHTML = filteredProducts.map(product =>
        createProductCardHTML(product)
    ).join('');
}

function createProductCardHTML(product) {
    return `
        <div class="product-card crystal-card border rounded-lg overflow-hidden shadow-lg bg-white">
            <img src="${product.image}" alt="${product.name}" class="product-image w-full h-48 object-cover" onerror="this.src='src/images/products/Clear_Quartz.png'">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                <div class="mb-2">
                    ${product.benefits ? product.benefits.map(benefit =>
        `<span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${benefit}</span>`
    ).join('') : ''}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-purple-600">₹${product.price}</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary text-sm px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card crystal-card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='src/images/products/Clear_Quartz.png'">
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">${product.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-purple-600">₹${product.price}</span>
                <button onclick="addToCart(${product.id})" class="btn-primary text-sm px-4 py-2">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    return card;
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    saveCart();
    showNotification('Product added to cart!', 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCart();
    showNotification('Product removed from cart!', 'info');
}

// Update quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCartCount();
    saveCart();
    displayCart();
}

// Display cart
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p class="text-gray-500 mb-4">Add some sacred crystals to your cart</p>
                <button onclick="navigateTo('/products')" class="btn-primary">
                    Browse Products
                </button>
            </div>
        `;
        return;
    }

    let total = 0;
    let cartHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item flex items-center justify-between">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4" onerror="this.src='src/images/products/Clear_Quartz.png'">
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-gray-600">₹${item.price}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                    <span class="px-3 py-1 bg-gray-100 rounded">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 ml-4">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    cartHTML += `
        <div class="border-t pt-4 mt-4">
            <div class="flex justify-between items-center text-xl font-bold">
                <span>Total: ₹${total}</span>
                <button onclick="proceedToCheckout()" class="btn-primary">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;

    cartItems.innerHTML = cartHTML;
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Show modal checkout form
    const modal = document.getElementById('checkout-modal');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutName = document.getElementById('checkout-name');
    const checkoutEmail = document.getElementById('checkout-email');
    const checkoutPhone = document.getElementById('checkout-phone');
    const checkoutAddress = document.getElementById('checkout-address');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutClose = document.getElementById('checkout-close');

    if (!modal || !checkoutForm) {
        showNotification('Checkout form not available', 'error');
        return;
    }

    checkoutTotal.textContent = `₹${total}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // close handler
    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };
    checkoutClose.onclick = closeModal;

    // submit handler
    const onSubmit = (e) => {
        e.preventDefault();
        const customer_name = checkoutName.value || '';
        const customer_email = checkoutEmail.value || '';
        const customer_phone = checkoutPhone.value || '';
        const customer_address = checkoutAddress.value || '';

        closeModal();

        try {
            const key = window.RAZORPAY_KEY || 'rzp_test_placeholder';
            if (typeof key !== 'string' || (!key.startsWith('rzp_test_') && !key.startsWith('rzp_live_'))) {
                console.error('Invalid Razorpay key configured:', key);
                showNotification('Payment gateway not configured correctly. Please set a valid Razorpay publishable key (starts with rzp_test_ or rzp_live_) in index.html.', 'error');
                return;
            }
            const options = {
                key,
                amount: Number(total) * 100,
                currency: 'INR',
                name: customer_name || 'Customer',
                description: `Purchase of ${cart.length} item(s)`,
                prefill: {
                    name: customer_name,
                    email: customer_email,
                    contact: customer_phone
                },
                handler: function (response) {
                    // On successful payment, send emails via serverless endpoint (or EmailJS fallback)
                    sendOrderEmail({
                        items: cart,
                        total,
                        customer_name,
                        customer_email,
                        customer_phone,
                        to_email: 'bhavikasmart15@gmail.com',
                        subject: `New Order - ${'wasedfgh'}`,
                        email: 'bhavikasmart15@gmail.com',
                        title: 'New Order Received',
                        name: 'Admin',
                        customer_address,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id
                    }).then(() => {
                        cart = [];
                        updateCartCount();
                        saveCart();
                        showNotification('Payment successful and email sent!', 'success');
                        navigateTo('/');
                    }).catch((err) => {
                        console.error('Error sending order email', err);
                        showNotification('Payment successful but failed to send email.', 'warning');
                        cart = [];
                        updateCartCount();
                        saveCart();
                        navigateTo('/');
                    });
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Razorpay error', err);
            showNotification('Failed to open payment gateway. Please try again.', 'error');
        }
        checkoutForm.removeEventListener('submit', onSubmit);
    };

    checkoutForm.addEventListener('submit', onSubmit);
}


// Send order email using EmailJS (global emailjs included in index.html)
function sendOrderEmail(order, totalOrUndefined) {
    // normalize signature: can be called either as sendOrderEmail(cart, total) or sendOrderEmail(orderObj)
    let payload = {};
    if (Array.isArray(order)) {
        payload.items = order;
        payload.total = totalOrUndefined;
        payload.customer_name = '';
        payload.customer_email = '';
        payload.customer_phone = '';
    } else {
        payload = order || {};
    }

    const itemsArray = payload.items || [];
    const items_text = itemsArray.map(it => `- ${it.name} x${it.quantity} — ₹${it.price}`).join('\n');
    const items_html = `<ul>${itemsArray.map(it => `<li>${it.name} x${it.quantity} — ₹${it.price}</li>`).join('')}</ul>`;

    const serviceId = window.EMAILJS_SERVICE_ID || 'service_1jvj89d';
    const templateAdmin = window.EMAILJS_TEMPLATE_ORDER_ADMIN || 'template_8ius8u1';
    const templateReply = window.EMAILJS_TEMPLATE_ORDER_REPLY || 'template_order_reply';

    // Send admin email
    const adminParams = {
        to_email: 'bhavikasmart15@gmail.com',
        subject: `New Order - ${payload.razorpay_order_id || ''}`,
        email: 'bhavikasmart15@gmail.com',
        title: 'New Order Received',
        name: 'Admin',
        order_id: payload.razorpay_order_id || '',
        total: payload.total || '',
        items: JSON.stringify(payload.items || []),
        items_text,
        items_html,
        customer_name: payload.customer_name || '',
        customer_email: payload.customer_email || '',
        customer_address: payload.customer_address || '',
        customer_phone: payload.customer_phone || '',
        razorpay_payment_id: payload.razorpay_payment_id || ''
    };

    // Prefer serverless endpoint for sending (keeps credentials secret)
    const invoiceHtml = `<h2>Order Receipt</h2>
        <p>Order ID: ${payload.razorpay_order_id || ''}</p>
        <p>Total: ₹${payload.total || ''}</p>
        <p>Customer: ${payload.customer_name || ''}</p>
        <p>Address: ${payload.customer_address || ''}</p>
        ${items_html}
        <p>Payment ID: ${payload.razorpay_payment_id || ''}</p>`;

    // Use EmailJS directly (frontend-only). Ensure service/template IDs are set in index.html
    if (!window.emailjs) {
        console.error('EmailJS SDK not loaded');
        openMailClient('bhavikasmart15@gmail.com', `Order - ${payload.razorpay_order_id || ''}`, items_text);
        return Promise.resolve({ fallback: 'mailto' });
    }
    // if (!window.EMAILJS_SERVICE_ID || window.EMAILJS_SERVICE_ID === 'service_1jvj89d') {
    //     console.error('EmailJS service ID not configured. Set window.EMAILJS_SERVICE_ID in index.html');
    //     openMailClient('bhavikasmart15@gmail.com', `Order - ${payload.razorpay_order_id || ''}`, items_text);
    //     return Promise.resolve({ fallback: 'mailto' });
    // }

    // send admin notification via EmailJS
    return emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ORDER_ADMIN || templateAdmin, adminParams)
        .then((res) => {
            // Send customer confirmation email
            if (payload.customer_email) {
                const customerParams = {
                    to_email: payload.customer_email,
                    subject: `Order Confirmation - ${payload.razorpay_order_id || ''}`,
                    email: payload.customer_email,
                    title: 'Order Confirmation',
                    name: payload.customer_name || 'Customer',
                    message: `Dear ${payload.customer_name || 'Customer'},\n\nThank you for your order!\n\nOrder ID: ${payload.razorpay_order_id || ''}\nTotal: ₹${payload.total || ''}\n\nItems:\n${items_text}\n\nYour order will be processed soon.\n\nRegards,\nAstro Achariya Team`,
                    order_id: payload.razorpay_order_id || '',
                    total: payload.total || '',
                    customer_address: payload.customer_address || '',
                    razorpay_payment_id: payload.razorpay_payment_id || ''
                };
                
                return window.emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ORDER_ADMIN, customerParams)
                    .then((customerRes) => {
                        console.log('✅ Customer confirmation email sent:', customerRes.status, customerRes.text);
                        return { success: true, response: res, customerResponse: customerRes };
                    })
                    .catch((customerError) => {
                        console.error('❌ Failed to send customer confirmation:', customerError);
                        return { success: true, response: res, customerError };
                    });
            }
            return res;
        }).catch((finalErr) => {
            console.error('EmailJS failed for order', finalErr);
            // Last-resort: open user's mail client with prefilled admin email
            const subject = `Order - ${payload.razorpay_order_id || 'NoOrderId'}`;
            const body = `Order Details:\n\nCustomer: ${payload.customer_name || ''}\nEmail: ${payload.customer_email || ''}\nPhone: ${payload.customer_phone || ''}\nAddress: ${payload.customer_address || ''}\n\nItems:\n${items_text}\n\nTotal: ₹${payload.total || ''}\n\nPayment ID: ${payload.razorpay_payment_id || ''}\n`;
            openMailClient('bhavikasmart15@gmail.com', subject, body);
            return Promise.resolve({ fallback: 'mailto' });
        });
}

// Send appointment email using the same working method as cart
function sendAppointmentEmail(appointmentData) {
    console.log('Processing appointment request');
    
    if (!window.emailjs) {
        console.error('EmailJS not loaded');
        openMailClient('bhavikasmart15@gmail.com', `Appointment Request - ${appointmentData.service || ''}`, 'EmailJS not available');
        return Promise.resolve({ success: false, error: 'EmailJS not available' });
    }

    const appointmentMessage = `NEW APPOINTMENT REQUEST

Customer Details:
Name: ${appointmentData.name || ''}
Email: ${appointmentData.email || ''}
Phone: ${appointmentData.phone || ''}
Service: ${appointmentData.service || ''}
Date: ${appointmentData.date || ''}
Message: ${appointmentData.message || ''}

Status: Pending Confirmation`;

    const adminParams = {
        to_email: 'bhavikasmart15@gmail.com',
        subject: `New Appointment Request - ${appointmentData.service || ''}`,
        email: 'bhavikasmart15@gmail.com',
        title: 'New Appointment Request',
        name: 'Admin',
        customer_name: appointmentData.name || '',
        customer_email: appointmentData.email || '',
        customer_phone: appointmentData.phone || '',
        service: appointmentData.service || '',
        appointment_date: appointmentData.date || '',
        message: appointmentMessage
    };

    return window.emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ORDER_ADMIN, adminParams)
        .then((res) => {
            console.log('✅ Appointment email sent to admin:', res.status, res.text);
            
            // Send confirmation email to customer
            if (appointmentData.email) {
                const customerParams = {
                    to_email: appointmentData.email,
                    subject: `Appointment Confirmation - ${appointmentData.service || ''}`,
                    email: appointmentData.email,
                    title: 'Appointment Confirmation',
                    name: appointmentData.name || 'Customer',
                    message: `Dear ${appointmentData.name || 'Customer'},\n\nYour appointment request has been received successfully!\n\nService: ${appointmentData.service || ''}\nDate: ${appointmentData.date || ''}\n\nWe will contact you soon to confirm the details.\n\nRegards,\nAstro Achariya Team`
                };
                
                return window.emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ORDER_ADMIN, customerParams)
                    .then((customerRes) => {
                        console.log('✅ Confirmation email sent to customer:', customerRes.status, customerRes.text);
                        return { success: true, response: res, customerResponse: customerRes };
                    })
                    .catch((customerError) => {
                        console.error('❌ Failed to send customer confirmation:', customerError);
                        return { success: true, response: res, customerError };
                    });
            }
            
            return { success: true, response: res };
        }).catch((error) => {
            console.error('❌ EmailJS failed for appointment:', error);
            // Fallback to mailto
            const subject = `Appointment Request - ${appointmentData.service || ''}`;
            const body = appointmentMessage;
            openMailClient('bhavikasmart15@gmail.com', subject, body);
            return { success: false, error, fallback: 'mailto' };
        });
}

// Last-resort: open user's mail client with prefilled subject/body
function openMailClient(to, subject, body) {
    try {
        const params = [];
        if (subject) params.push('subject=' + encodeURIComponent(subject));
        if (body) params.push('body=' + encodeURIComponent(body));
        const mailto = `mailto:${encodeURIComponent(to)}${params.length ? ('?' + params.join('&')) : ''}`;
        // Use window.open so the current SPA state isn't lost in some browsers
        window.open(mailto, '_blank');
        showNotification('Email client opened with prefilled message. Please send the email manually.', 'info');
    } catch (e) {
        console.error('Failed to open mail client', e);
        showNotification('Failed to open email client. Please contact bhavikasmart15@gmail.com directly.', 'error');
    }
}

// Handle appointment form submission
function handleAppointmentSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const appointmentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        message: formData.get('message')
    };

    sendAppointmentEmail(appointmentData);
    showNotification('Appointment booked successfully! We will contact you soon.', 'success');
    e.target.reset();
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
    }, 1000);
}

// Show service detail
function showServiceDetail(serviceType) {
    const serviceDetails = {
        'astro-birth-chart': {
            title: 'Cosmic Birth Chart Reading',
            description: 'Discover the celestial blueprint of your soul through detailed birth chart analysis.',
            price: '₹2,999'
        },
        'vastu': {
            title: 'Sacred Space Harmonization',
            description: 'Align your living space with cosmic energies for prosperity and spiritual growth.',
            price: '₹4,999'
        },
        'life-coach': {
            title: 'Spiritual Life Guidance',
            description: 'Transform your destiny through ancient wisdom and unlock your divine potential.',
            price: '₹3,999'
        },
        'palmistry': {
            title: 'Mystical Palm Reading',
            description: 'Decode the sacred lines of your hands to reveal your soul\'s deepest secrets.',
            price: '₹1,999'
        },
        'numerology': {
            title: 'Sacred Number Divination',
            description: 'Unlock the mystical power of numbers to illuminate your life\'s purpose.',
            price: '₹2,499'
        },
        'face-reading': {
            title: 'Ancient Face Divination',
            description: 'Read the cosmic map written upon your face to unveil hidden truths.',
            price: '₹2,299'
        }
    };

    const service = serviceDetails[serviceType];
    if (service) {
        alert(`${service.title}\n\n${service.description}\n\nPrice: ${service.price}\n\nClick "Book Appointment" to schedule your session.`);
    }
}

// Helper to determine API base URL for local development
//function getApiUrl(path) {
//   try {
//      const loc = window.location;
//        if (loc.hostname === 'localhost' || loc.hostname === '127.0.0.1') {
            // local dev: talk to local server on 3002 (fallback port when 3001 is in use)
//    return `http://localhost:3002${path}`;
//        }
//  function getApiUrl(path) {
//    try {
//        const loc = window.location;
//        if (loc.hostname === 'localhost' || loc.hostname === '127.0.0.1') {
//            return `https://acharyaraajveerguptaa-7.onrender.com${path}`;
//        }
    function getApiUrl(path) {
    const baseUrl = import.meta.env.VITE_HOST_URL_ENDPOINT || 'https://acharyaraajveerguptaa-7.onrender.com';
    return `${baseUrl}${path}`;
}

        
    } catch (e) {
        // ignore
    }
    // production: relative path
    return path;
}



// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle scroll events
function handleScroll() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollToTopBtn?.classList.add('show');
    } else {
        scrollToTopBtn?.classList.remove('show');
    }
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    document.body.appendChild(scrollBtn);
}
