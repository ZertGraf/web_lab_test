let dishes = [];
let dishesLoadedPromise = null;

function normalizeCategoryName(category) {
    const mapping = {
        'soup': 'soup',
        'main-course': 'main',
        'salad': 'salad',
        'drink': 'drink',
        'dessert': 'dessert'
    };
    return mapping[category] || category;
}

async function loadDishes() {
    if (dishesLoadedPromise) {
        return dishesLoadedPromise;
    }

    dishesLoadedPromise = (async () => {
        try {
            const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
            if (!response.ok) {
                throw new Error('failed to load dishes');
            }
            const rawDishes = await response.json();

            dishes = rawDishes.map(dish => ({
                ...dish,
                category: normalizeCategoryName(dish.category)
            }));

            dishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
            console.log('loaded and normalized dishes:', dishes.length);
            return dishes;
        } catch (error) {
            console.error('error loading dishes:', error);
            dishes = [];
            return [];
        }
    })();

    return dishesLoadedPromise;
}

function createDishElement(dish) {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish-item';
    dishElement.setAttribute('data-dish', dish.keyword);
    dishElement.setAttribute('data-kind', dish.kind);

    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} руб</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button>Добавить</button>
    `;

    return dishElement;
}

function displayDishes() {
    const soupsContainer = document.getElementById('soups-container');
    const mainContainer = document.getElementById('main-container');
    const saladsContainer = document.getElementById('salads-container');
    const drinksContainer = document.getElementById('drinks-container');
    const dessertsContainer = document.getElementById('desserts-container');

    if (!soupsContainer) return;

    dishes.forEach(dish => {
        const dishElement = createDishElement(dish);

        if (dish.category === 'soup') {
            soupsContainer.appendChild(dishElement);
        } else if (dish.category === 'main') {
            mainContainer.appendChild(dishElement);
        } else if (dish.category === 'salad') {
            saladsContainer.appendChild(dishElement);
        } else if (dish.category === 'drink') {
            drinksContainer.appendChild(dishElement);
        } else if (dish.category === 'dessert') {
            dessertsContainer.appendChild(dishElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    displayDishes();

    if (typeof initializeOrderHandler === 'function') {
        initializeOrderHandler();
    }
});