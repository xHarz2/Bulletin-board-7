// Дані оголошень
const ads = [
    { title: 'Продам велосипед гірський', category: 'Речі', daysAgo: 5 },
    { title: 'Допоможу з ремонтом сантехніки у вашій квартирі', category: 'Послуги', daysAgo: 16 },
    { title: 'Віддам кошенят в добрі руки', category: 'Тварини', daysAgo: 2 },
    { title: 'Дриль-перфоратор напрокат', category: 'Речі', daysAgo: 20 },
    { title: 'Репетитор з вищої математики', category: 'Послуги', daysAgo: 10 }
];

// Класи бейджів для кожної категорії
const badgeClasses = {
    'Речі': 'badge-items',
    'Послуги': 'badge-services',
    'Тварини': 'badge-animals'
};

// Скорочує текст до n символів
const shorten = (text, n) => text.length > n ? text.slice(0, n) + '...' : text;

const listContainer = document.querySelector('#listings-list');
const countElement = document.querySelector('#listings-count');

// Прибираємо статичні картки з HTML
const staticCards = document.querySelectorAll('.static-card');
staticCards.forEach(card => card.remove());

// Рендер карток оголошень і підрахунок активних
function renderAds(adsArray) {
    listContainer.innerHTML = '';
    let activeCount = 0;

    for (const ad of adsArray) {
        const card = document.createElement('article');
        card.classList.add('card');

        // Бейдж категорії
        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = ad.category;
        if (badgeClasses[ad.category]) {
            badge.classList.add(badgeClasses[ad.category]);
        }

        const title = document.createElement('h3');
        title.textContent = shorten(ad.title, 30);

        // Картинка-заглушка з першим словом назви
        const img = document.createElement('img');
        const imgText = ad.title.split(' ')[0];
        img.src = `https://placehold.co/400x200/EEE/31343C?text=${imgText}`;
        img.alt = ad.title;

        const description = document.createElement('p');
        description.textContent = `Опубліковано днів тому: ${ad.daysAgo}`;

        card.dataset.daysAgo = ad.daysAgo;

        // Оголошення старші за 14 днів вважаються неактуальними
        if (ad.daysAgo > 14) {
            card.classList.add('outdated');
        } else {
            activeCount++;
        }

        card.append(badge, title, img, description);
        listContainer.append(card);
    }

    countElement.textContent = `Активних оголошень: ${activeCount}`;
}

renderAds(ads);
