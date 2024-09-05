document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-switch');
    const body = document.body;
    const carConfigForm = document.getElementById('car-config-form');
    const priceOutput = document.getElementById('price');
    const buyButton = document.getElementById('buy-button');
    const animationContainer = document.getElementById('animation-container');
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    const contactForm = document.getElementById('contact-form');

    // Переключение темы
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('night-theme');
        body.classList.toggle('day-theme');
        const currentTheme = body.classList.contains('night-theme') ? 'night' : 'day';
        localStorage.setItem('theme', currentTheme);
    });

    // Загрузка темы из localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        body.classList.remove('day-theme');
        body.classList.add('night-theme');
        themeToggle.checked = true; // Устанавливаем тумблер во включенное состояние
    } else if (savedTheme === 'day') {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        themeToggle.checked = false; // Устанавливаем тумблер в выключенное состояние
    }

    // Конфигуратор машины функциональность
    document.getElementById('calculate-price').addEventListener('click', () => {
        const brand = carConfigForm.brand.value;
        const bodyType = carConfigForm['body-type'].value;
        const engine = carConfigForm.engine.value;
        const color = carConfigForm.color.value;
        const interior = carConfigForm.interior.value;

        // Простая оценка
        let price = 1000000; // Базовая цена
        if (brand === 'brand2') price += 200000;
        if (bodyType === 'suv') price += 300000;
        price += engine * 50000;
        if (interior === 'leather') price += 100000;

        priceOutput.textContent = price;
        localStorage.setItem('lastPrice', price);
    });

    // Загрущка цены из localStorage
    const lastPrice = localStorage.getItem('lastPrice');
    if (lastPrice) {
        priceOutput.textContent = lastPrice;
    }

    // Кнопка "купить" с анимацией
    buyButton.addEventListener('click', () => {
        const carData = {
            brand: carConfigForm.brand.value,
            bodyType: carConfigForm['body-type'].value,
            engine: carConfigForm.engine.value,
            color: carConfigForm.color.value,
            interior: carConfigForm.interior.value,
            price: priceOutput.textContent
        };

        localStorage.setItem('carData', JSON.stringify(carData));

        animationContainer.innerHTML = `
            <div id="car-animation">
                <svg class="car-svg" viewBox="0 0 210 250" xmlns="http://www.w3.org/2000/svg" >

            <rect x="10" y="60" width="230" height="30" fill="#333" />

            <path d="M10,60 L50,30 Q60,10 160,43 T100,60 Z" fill="#555" />
            <path d="M60,40 L50,30 Q60,10 130,29 T100,40 Z" fill="#333" />
            <rect x="150" y="60" width="50" height="30" fill="#333" />
            <circle cx="228" cy="38" r="36" fill="white" class="wheel" />

            <!-- Первое окно -->
            <path d="M 41 40 Q 80 5 78 40 T 76 90 Q 90 65 41 70 Z" fill="#333" />

            <!-- Второе окно -->
            <path d="M 105 25 Q 105 25 145 40 T 145 90 Q 105 65 125 70 Z" fill="#333" />

            <!-- Колеса -->
            <circle cx="50" cy="90" r="17" fill="#555" class="wheel2" />
            <circle cx="150" cy="90" r="17" fill="#555" class="wheel2" /> <!-- передние серые колеса-->

            <circle cx="60" cy="88" r="14" fill="#333" class="wheel" /> <!-- тени-->
            <circle cx="158" cy="88" r="15" fill="#333" class="wheel" /><!-- тени-->

            <circle cx="60" cy="87" r="15" fill="#333" class="wheel3" /> <!-- черные штуки-->
            <circle cx="158" cy="87" r="15" fill="#333" class="wheel3" /><!-- черные вертящиеся штуки-->
            <!-- Диски -->
            <circle cx="50" cy="90" r="10" fill="#ccc" class="wheel1" />
            <circle cx="150" cy="90" r="10" fill="#ccc" class="wheel1" />

            <span class="flare"></span></svg> <!-- подключение блеска на машине-->
                <div id="confirmation">Заявка принята!</div>
            </div>
        `;
        animationContainer.style.display = 'block';
        setTimeout(() => {
            animationContainer.style.display = 'none';
        }, 3000);
    });

    // Проверка сохраненности из cardata
    const savedCarData = localStorage.getItem('carData');
    if (savedCarData) {
        const carData = JSON.parse(savedCarData);
        console.log('Saved car data:', carData);
        // Display saved car data or notify user
    }

    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 14,
        });
        const marker = new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0060 },
            map: map,
        });
    }

    const mapScript = document.createElement('script');
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    mapScript.async = true;
    document.head.appendChild(mapScript);

    // Contact form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Ваша заявка принята!');
    });

    // Гамбургер меню
    navToggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.style.display = navbar.style.display === 'block' ? 'none' : 'block';
        }
    });

    // Закрытие меню при нажатии на другое место на сайте в мобильном режиме
    document.addEventListener('click', (event) => {
        if (!event.target.closest('header') && window.innerWidth <= 768) {
            navbar.style.display = 'none';
        }
    });

    // Меню в десктопе
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.style.display = 'flex';
        } else {
            navbar.style.display = 'none';
        }
    });


    if (window.innerWidth > 768) {
        navbar.style.display = 'flex';
    }

    const reviewsSection = document.getElementById('reviews');
    const faqSection = document.getElementById('faq');

    // Ревью динамично
    const reviews = [
        { text: "Отличный сервис! Очень доволен покупкой.", author: "Иван Петров" },
    ];

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
        <p>"${review.text}"</p>
        <p>- ${review.author}</p>
    `;
        reviewsSection.appendChild(reviewElement);
    });


    // FAQ динамично
    const faqs = [
        {
            question: "Как записаться на тест-драйв?",
            answer: "Вы можете записаться на тест-драйв, заполнив форму на нашем сайте или позвонив по телефону."
        },
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
        `;
        faqSection.appendChild(faqItem);
    });

    const detailsButtons = document.querySelectorAll('.details-button');

    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const detailsUrl = button.getAttribute('href');
            window.location.href = detailsUrl;
        });
    });
});

const wheels = document.querySelectorAll('.wheel');

wheels.forEach(wheel => {
    let rotation = 0;

    const rotate = () => {
        rotation += 10;
        wheel.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotate);
    };

    rotate();
});

document.addEventListener('DOMContentLoaded', () => {
    const carsData = {
        car1: {
            images: ['car1_1.jpg', 'car1_2.jpg'],
            details: {
                engine: '4.0L V6',
                transmission: 'Автомат',
                year: 2011,
                mileage: '80,000 km',
                price: '4 680 000 ₽',
            },
        },
        car2: {
            images: ['car2_1.jpg', 'car2_2.jpg'],
            details: {
                engine: '3.0L I6',
                transmission: 'Автомат',
                year: 2010,
                mileage: '90,000 km',
                price: '1 554 000 ₽',
            },
        },
    };

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-car-content');
    const closeModal = document.querySelector('.close');

    document.querySelectorAll('.car').forEach(car => {
        car.addEventListener('click', () => {
            const carId = car.getAttribute('data-car');
            const carData = carsData[carId];
            if (carData) {
                modalContent.innerHTML = `
          <div class="modal-images">
            ${carData.images.map(img => `<img src="${img}" alt="Car Image">`).join('')}
          </div>
          <div class="modal-details">
            <h2>${car.querySelector('.car-title').innerText}</h2>
            <p><strong>Двигатель:</strong> ${carData.details.engine}</p>
            <p><strong>Коробка:</strong> ${carData.details.transmission}</p>
            <p><strong>Год выпуска:</strong> ${carData.details.year}</p>
            <p><strong>Пробег:</strong> ${carData.details.mileage}</p>
            <p><strong>Цена:</strong> ${carData.details.price}</p>
          </div>
        `;
                modal.style.display = 'block';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});