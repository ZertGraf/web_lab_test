// Сортируем блюда по алфавиту
const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

// Функция для создания HTML-элемента блюда
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

// Функция для отображения блюд на странице
function displayDishes() {
    const soupsContainer = document.getElementById('soups-container');
    const mainContainer = document.getElementById('main-container');
    const saladsContainer = document.getElementById('salads-container');
    const drinksContainer = document.getElementById('drinks-container');
    const dessertsContainer = document.getElementById('desserts-container');

    sortedDishes.forEach(dish => {
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

// Отображаем блюда при загрузке страницы
document.addEventListener('DOMContentLoaded', displayDishes);
