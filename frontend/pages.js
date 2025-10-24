// Page templates for the website

function getAboutPage() {
    return `
        <div class="bg-white absolute w-full pt-16">
            <div class="mt-10 pb-10 px-8">
                <h3 class="font-philosopher text-xl pl-3 font-bold">About Me</h3>
                <h3 class="font-dancing text-[20px] leading-9 pl-3">Namaskar!</h3>
                
                <div class="flex flex-col md:flex-row justify-between text-gray-700 leading-relaxed">
                    <div class="w-full md:w-[50%] px-3 sm:mb-10 text-popp">
                        <p>As I extend my warm greetings, I invite you to delve into the tapestry of my life's journey. My name is Achariya Rajveer Gupta, a seasoned professional in the realms of astrology, vastu consultancy, numerology, success coaching, and authorship. With an enriching experience spanning 21 years, I've dedicated my life to unraveling the mysteries of existence and guiding others toward a harmonious and prosperous life.</p>
                        <br>
                        <p>Born and raised in the culturally rich city of Mumbai, West Bengal, my roots are deeply embedded in the spiritual essence of India.</p>
                        <br>
                        <p>From the early days of my childhood, I felt a profound connection to the metaphysical aspects of life, a calling that would shape my destiny.</p>
                    </div>
                    <div class="w-full md:w-[40%] flex items-center justify-center mt-16 sm:mt-8 md:mt-[-50px]">
                        <div class="border-2 border-green-200 rounded-3xl w-[300px] h-auto relative overflow-hidden bg-black/20">
                            <img src="/src/images/alldebdatta-images/feature3.jpg" class="w-full h-auto rounded-3xl" alt="">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="pb-10 px-10 m-auto">
                <p class="text-gray-700 leading-relaxed">In the vibrant streets of Mumbai, amidst the hustle and bustle, I discovered my spiritual inclination. The diverse experiences and the cultural mosaic of the city fuelled my curiosity, leading me to explore the intricacies of understanding the vibes of people and places. Religious practices, a cornerstone of Indian culture, became my refuge during my formative years. Prayer and meditation emerged as pillars of solace, laying the foundation for a deeper exploration of the mystical arts. My journey into astrology began with an innate intuition that guided me to explore the intricate world of predicting personalities and glimpses into the future. The pursuit of knowledge led me to focus on astrology, a discipline that continues to be a guiding light in my life.</p>
                <br>
                <p>In addition to my spiritual pursuits, I pursued Honours in Philosophy, enriching my understanding of life's philosophical underpinnings. The integration of academic knowledge with spiritual wisdom formed the cornerstone of my approach to life. During my college years, a natural fondness for imparting knowledge led me to give tuition at a coaching academy. This effortless exchange of knowledge laid the groundwork for what brings you and me here—a shared quest for bliss.</p>
                <br>
                <p>In the grand tapestry of existence, I acknowledge God as my eternal teacher, and the Universe as my guiding force. Insights, courage, and wisdom assimilated over the years empower me to fulfill the noble purpose of spreading knowledge. My mission is to kindle hope in humanity, offering the keys to solving life's puzzles through astrology, Vastu, and palmistry. These ancient sciences, when understood and applied, unlock abundance for all.</p>
                <br>
                <h3 class="font-sans italic font-bold text-xl">- Astro Achariya Rajveer Gupta</h3>
            </div>
            
            <div class="grid md:flex lg:flex m-auto mb-7 font-sans w-[70%] gap-4">
                <div class="m-auto bg-purple-600 text-center p-4 w-full rounded-br-3xl rounded-tl-3xl">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-philosopher text-center">Mission</h1>
                    <p class="text-white font-poppins">Empower All Through Astrology & Palmistry Wisdom.</p>
                </div>
                <div class="m-auto bg-purple-600 text-center p-4 w-full rounded-bl-3xl rounded-tr-3xl">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 font-philosopher text-center">Vision</h1>
                    <p class="text-white font-poppins">Crafting Better Lives with Astrological Solutions.</p>
                </div>
            </div>
            
            ${getFooter()}
        </div>
    `;
}

function getServicesPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-4xl font-philosopher text-center mb-8"> Mystical Services </h1>
                <p class="text-center text-lg text-gray-600 mb-12"> Unlock the secrets of the universe through ancient wisdom </p>
                
                <div id="services-detail-grid" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <!-- Services will be loaded here -->
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getProductsPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-4xl font-philosopher text-center mb-8">Sacred Crystals & Products</h1>
                <p class="text-center text-lg text-gray-600 mb-8">Discover the healing power of sacred crystals</p>
                
                <div class="mb-8 flex justify-center">
                    <select id="category-filter" class="px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500">
                        <option value="All">All Categories</option>
                    </select>
                </div>
                
                <div id="products-grid" class="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                    <!-- Products will be loaded here -->
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getCartPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-philosopher text-center mb-8">Shopping Cart</h1>
                <div id="cart-items">
                    <!-- Cart items will be displayed here -->
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getAppointmentPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-philosopher text-center mb-8">Book Appointment</h1>
                <div class="max-w-md mx-auto">
                    <form id="appointment-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input type="text" name="name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                            <input type="tel" name="phone" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Service</label>
                            <select name="service" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                                <option value="">Select a service</option>
                                <option value="birth-chart">Birth Chart Reading</option>
                                <option value="vastu">Vastu Consultation</option>
                                <option value="numerology">Numerology</option>
                                <option value="palmistry">Palmistry</option>
                                <option value="face-reading">Face Reading</option>
                                <option value="life-coaching">Life Coaching</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Preferred Date</label>
                            <input type="date" name="date" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Message</label>
                            <textarea name="message" rows="4" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" placeholder="Tell us about your concerns..."></textarea>
                        </div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getContactPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-philosopher text-center mb-8">Contact Us</h1>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Get in Touch</h3>
                        <div class="space-y-4">
                            <p><i class="fas fa-phone mr-2 text-purple-600"></i> +91 XXXXX XXXXX</p>
                            <p><i class="fas fa-envelope mr-2 text-purple-600"></i> info@achariyadebdutta.com</p>
                            <p><i class="fas fa-map-marker-alt mr-2 text-purple-600"></i> Mumbai, Maharashtra</p>
                        </div>
                        
                        <div class="mt-8">
                            <h3 class="text-xl font-semibold mb-4">Follow Us</h3>
                            <div class="flex space-x-4">
                                <a href="#" class="text-purple-600 hover:text-purple-800"><i class="fab fa-facebook text-2xl"></i></a>
                                <a href="#" class="text-purple-600 hover:text-purple-800"><i class="fab fa-instagram text-2xl"></i></a>
                                <a href="#" class="text-purple-600 hover:text-purple-800"><i class="fab fa-youtube text-2xl"></i></a>
                                <a href="#" class="text-purple-600 hover:text-purple-800"><i class="fab fa-twitter text-2xl"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <form id="contact-form">
                        <div class="mb-4">
                            <input type="text" name="name" placeholder="Your Name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <input type="email" name="email" placeholder="Your Email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <input type="text" name="subject" placeholder="Subject" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required>
                        </div>
                        <div class="mb-4">
                            <textarea name="message" placeholder="Your Message" rows="4" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500" required></textarea>
                        </div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getProductDetailsPage() {
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-2xl mx-auto">
                <h1 class="text-3xl font-philosopher text-center mb-6">Product Details & Order Form</h1>
                <form id="product-details-form" class="space-y-4 bg-white p-6 rounded shadow">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" name="product_name" class="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" name="quantity" min="1" value="1" class="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price (INR)</label>
                        <input type="number" name="price" min="0" step="0.01" class="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Your Name</label>
                        <input type="text" name="name" class="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" class="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" name="phone" class="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Address</label>
                        <textarea name="address" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
                    </div>
                    <div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-2 px-4 rounded">Proceed to Checkout</button>
                    </div>
                </form>
            </div>
            ${getFooter()}
        </div>
    `;
}



function getServiceDetailPage(path) {
    const serviceData = {
        '/astro-birth-chart-reformation': {
            title: ' Cosmic Birth Chart Reading',
            description: 'Unveil the celestial blueprint of your soul\'s journey through the stars and planets',
            price: '₹2,999',
            image: 'src/images/alldebdutta-images/sliderImages/slide1.jpg',
            details: 'A comprehensive birth chart reading that reveals your cosmic blueprint, personality traits, life purpose, and future possibilities based on the exact time and place of your birth.'
        },
        '/astro-vastu-consultancy': {
            title: ' Sacred Space Harmonization',
            description: 'Align your living space with cosmic energies for prosperity and spiritual growth',
            price: '₹4,999',
            image: 'src/images/alldebdutta-images/sliderImages/slide2.jpg',
            details: 'Transform your home or office into a harmonious sanctuary using ancient Vastu principles that attract positive energy, prosperity, and well-being.'
        },
        '/life-coach-and-success-guru': {
            title: ' Spiritual Life Guidance',
            description: 'Transform your destiny through ancient wisdom and unlock your divine potential',
            price: '₹3,999',
            image: 'src/images/alldebdutta-images/sliderImages/slide3.jpg',
            details: 'Personalized life coaching sessions that combine spiritual wisdom with practical guidance to help you overcome obstacles and achieve your goals.'
        },
        '/palmistry': {
            title: ' Mystical Palm Reading',
            description: 'Decode the sacred lines of your hands to reveal your soul\'s deepest secrets and future path',
            price: '₹1,999',
            image: 'src/images/alldebdutta-images/sliderImages/slide4.jpg',
            details: 'Ancient art of palm reading that reveals your personality, relationships, career prospects, and life events through the lines and mounts on your hands.'
        },
        '/numerology': {
            title: ' Sacred Number Divination',
            description: 'Unlock the mystical power of numbers to illuminate your life\'s purpose and destiny',
            price: '₹2,499',
            image: 'src/images/alldebdutta-images/sliderImages/slide5.jpg',
            details: 'Discover the hidden meanings behind numbers in your life - birth date, name, and important dates - to understand your life path and make better decisions.'
        },
        '/face-reading': {
            title: ' Ancient Face Divination',
            description: 'Read the cosmic map written upon your face to unveil hidden truths and future possibilities',
            price: '₹2,299',
            image: 'src/images/alldebdutta-images/sliderImages/slide6.jpg',
            details: 'The ancient Chinese art of face reading that reveals personality traits, health indicators, and future prospects through facial features and expressions.'
        }
    };
    
    const service = serviceData[path];
    if (!service) return getHomePage();
    
    return `
        <div class="pt-20 px-4 py-16 bg-white min-h-screen">
            <div class="max-w-4xl mx-auto">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <img src="${service.image}" alt="${service.title}" class="w-full rounded-lg shadow-lg">
                    </div>
                    <div>
                        <h1 class="text-3xl font-philosopher mb-4">${service.title}</h1>
                        <p class="text-lg text-gray-600 mb-6">${service.description}</p>
                        <p class="text-gray-700 mb-6">${service.details}</p>
                        <div class="mb-6">
                            <span class="text-2xl font-bold text-purple-600">${service.price}</span>
                        </div>
                        <button onclick="navigateTo('/appointment')" class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300">
                            Book This Service
                        </button>
                    </div>
                </div>
            </div>
            ${getFooter()}
        </div>
    `;
}

function getFooter() {
    return `
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <img src="src/images/logo/astro achariya logo-01.png" alt="Logo" class="w-30 h-16 mb-4">
                        <p class="text-gray-400">Unlock the mysteries of the universe through ancient wisdom and spiritual guidance.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Services</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" onclick="navigateTo('/astro-birth-chart-reformation')" class="hover:text-white">Birth Chart Reading</a></li>
                            <li><a href="#" onclick="navigateTo('/astro-vastu-consultancy')" class="hover:text-white">Vastu Consultation</a></li>
                            <li><a href="#" onclick="navigateTo('/numerology')" class="hover:text-white">Numerology</a></li>
                            <li><a href="#" onclick="navigateTo('/palmistry')" class="hover:text-white">Palmistry</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Quick Links</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" onclick="navigateTo('/about-page')" class="hover:text-white">About</a></li>
                            <li><a href="#" onclick="navigateTo('/services')" class="hover:text-white">Services</a></li>
                            <li><a href="#" onclick="navigateTo('/products')" class="hover:text-white">Products</a></li>
                            <li><a href="#" onclick="navigateTo('/contact')" class="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-4">Contact Info</h3>
                        <div class="space-y-2 text-gray-400">
                            <p><i class="fas fa-phone mr-2"></i> +91 XXXXX XXXXX</p>
                            <p><i class="fas fa-envelope mr-2"></i> info@achariyadebdutta.com</p>
                            <p><i class="fas fa-map-marker-alt mr-2"></i> Mumbai, Maharashtra</p>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Achariya Debdutta. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}