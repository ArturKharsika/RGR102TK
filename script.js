document.addEventListener('DOMContentLoaded', function() {
    const universitiesData = [
        {
            name: "Київський національний університет імені Тараса Шевченка",
            city: "Київ",
            description: "Один з найстаріших і найпрестижніших університетів України, заснований у 1834 році. Пропонує широкий спектр спеціальностей.",
            img: "img/KNU.jpg",
            link: "https://knu.ua/"
        },
        {
            name: "Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»",
            city: "Київ",
            description: "Провідний технічний університет України, відомий своїми інженерними та технологічними програмами.",
            img: "img/KPI.jpg",
            link: "https://kpi.ua/"
        },
        {
            name: "Львівський національний університет імені Івана Франка",
            city: "Львів",
            description: "Один з найстаріших університетів Східної Європи, заснований у 1661 році. Багатий історичний спадок та висока якість освіти.",
            img: "img/LNU.jpg",
            link: "https://lnu.edu.ua/"
        },
        {
            name: "Харківський національний університет імені В. Н. Каразіна",
            city: "Харків",
            description: "Один з найстаріших університетів Східної Європи, заснований у 1804 році. Багатий історичний спадок та висока якість освіти.",
            img: "img/KHNU.jpg",
            link: "https://karazin.ua/"
        },
        {
            name: "Одеський національний університет імені І. І. Мечникова",
            city: "Одеса",
            description: "Класичний університет, заснований у 1865 році. Відомий своїми гуманітарними та природничими науками.",
            img: "img/ONU.jpg",
            link: "https://onu.edu.ua/"
        },
        {
            name: "Національний університет «Львівська політехніка»",
            city: "Львів",
            description: "Один з найбільших технічних вишів України, заснований у 1816 році. Пропонує широкий вибір інженерних спеціальностей.",
            img: "img/LPNU.jpg",
            link: "https://lpnu.ua/"
        },
        {
            name: "Дніпровський національний університет імені Олеся Гончара",
            city: "Дніпро",
            description: "Провідний заклад вищої освіти в Дніпрі, заснований у 1918 році. Активно розвиває наукові дослідження.",
            img: "img/DNU.jpg",
            link: "https://www.dnu.dp.ua/"
        },
        {
            name: "Національний університет «Полтавська політехніка імені Юрія Кондратюка»",
            city: "Полтава",
            description: "Сучасний заклад вищої освіти в Полтаві, що готує фахівців у різних галузях, включаючи інформаційні технології та будівництво.",
            img: "img/NUPP.jpg",
            link: "https://nupp.edu.ua/"
        }
    ];

    function loadUniversitiesPage() {
        const universitiesList = document.getElementById('universities-list');
        if (!universitiesList) return;

        function displayUniversities(filterText = '') {
            universitiesList.innerHTML = '';

            const filteredUniversities = universitiesData.filter(uni =>
                uni.name.toLowerCase().includes(filterText.toLowerCase()) ||
                uni.city.toLowerCase().includes(filterText.toLowerCase()) ||
                uni.description.toLowerCase().includes(filterText.toLowerCase())
            );

            if (filteredUniversities.length === 0) {
                universitiesList.innerHTML = '<div class="col-12"><p class="text-center text-muted fs-4 py-5">На жаль, університетів за вашим запитом не знайдено.</p></div>';
                return;
            }

            filteredUniversities.forEach(university => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col animate__animated animate__fadeInUp';
                colDiv.innerHTML = `
                    <div class="card h-100 shadow-lg hover-shadow">
                        <div class="university-card-img">
                            <img src="${university.img}" class="img-fluid" alt="${university.name}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-primary">${university.name}</h5>
                            <p class="card-text text-muted mb-2"><i class="fas fa-map-marker-alt me-2"></i> ${university.city}</p>
                            <p class="card-text small mb-3">${university.description}</p>
                            <a href="${university.link}" target="_blank" class="btn btn-outline-primary btn-sm mt-auto align-self-start rounded-pill px-3 py-2">Детальніше <i class="fas fa-external-link-alt ms-2"></i></a>
                        </div>
                    </div>
                `;
                universitiesList.appendChild(colDiv);
            });
        }

        const universitySearchInput = document.getElementById('universitySearch');
        const searchButton = document.getElementById('searchButton');

        if (universitySearchInput) {
            universitySearchInput.addEventListener('keyup', function() {
                displayUniversities(this.value);
            });
        }
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                displayUniversities(universitySearchInput.value);
            });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            universitySearchInput.value = searchParam;
            displayUniversities(searchParam);
        } else {
            displayUniversities();
        }
    }

    function handleContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert(`Дякуємо, ${name}! Ваше повідомлення успішно надіслано.\nEmail: ${email}\nПовідомлення: ${message}`);
                contactForm.reset();
            } else {
                alert('Будь ласка, заповніть усі поля форми.');
            }
        });
    }
    
    function handleGlobalSearch() {
        const globalSearchInput = document.getElementById('globalSearchInput');
        const globalSearchButton = document.getElementById('globalSearchButton');
        const universitySearchMain = document.getElementById('universitySearchMain');
        const searchButtonMain = document.getElementById('searchButtonMain');

        if (globalSearchInput && globalSearchButton) {
            globalSearchButton.addEventListener('click', performGlobalSearch);
            globalSearchInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    performGlobalSearch();
                }
            });
        }

        if (universitySearchMain && searchButtonMain) {
            searchButtonMain.addEventListener('click', function() {
                const query = universitySearchMain.value;
                if (query) {
                    window.location.href = 'universities.html?search=' + encodeURIComponent(query);
                } else {
                    window.location.href = 'universities.html';
                }
            });
            universitySearchMain.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    const query = universitySearchMain.value;
                    if (query) {
                        window.location.href = 'universities.html?search=' + encodeURIComponent(query);
                    } else {
                        alert('Будь ласка, введіть пошуковий запит.');
                    }
                }
            });
        }

        function performGlobalSearch() {
            const query = globalSearchInput.value.toLowerCase();
            if (!query) {
                alert('Будь ласка, введіть пошуковий запит.');
                return;
            }

            const currentPath = window.location.pathname;
            let found = false;

            if (currentPath.includes('index.html') || currentPath === '/') {
                const heroText = document.getElementById('hero')?.innerText.toLowerCase() || '';
                const aboutUsText = document.getElementById('about-us')?.innerText.toLowerCase() || '';
                const featuresText = document.getElementById('features')?.innerText.toLowerCase() || '';

                if (heroText.includes(query) || aboutUsText.includes(query) || featuresText.includes(query)) {
                    alert(`Знайдено "${query}" на головній сторінці!`);
                    found = true;
                }
            }

            if (currentPath.includes('universities.html')) {
                const foundUniversities = universitiesData.filter(uni =>
                    uni.name.toLowerCase().includes(query) ||
                    uni.city.toLowerCase().includes(query) ||
                    uni.description.toLowerCase().includes(query)
                );
                if (foundUniversities.length > 0) {
                    alert(`Знайдено ${foundUniversities.length} університет(ів) за запитом "${query}" на сторінці університетів!`);
                    document.getElementById('universitySearch').value = query;
                    document.getElementById('searchButton').click();
                    found = true;
                }
            } else {
                const foundUniversities = universitiesData.filter(uni =>
                    uni.name.toLowerCase().includes(query) ||
                    uni.city.toLowerCase().includes(query) ||
                    uni.description.toLowerCase().includes(query)
                );
                if (foundUniversities.length > 0) {
                    window.location.href = 'universities.html?search=' + encodeURIComponent(query);
                    found = true;
                }
            }

            if (currentPath.includes('contact.html')) {
                const contactText = document.querySelector('main')?.innerText.toLowerCase() || '';
                if (contactText.includes(query)) {
                    alert(`Знайдено "${query}" на сторінці контактів!`);
                    found = true;
                }
            }

            if (!found) {
                alert(`Нічого не знайдено за запитом "${query}" на цьому сайті.`);
            }
        }
    }

    loadUniversitiesPage();
    handleContactForm();
    handleGlobalSearch();
});