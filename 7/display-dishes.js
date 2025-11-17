// Сортировка блюд по алфавиту
function sortDishesByName(dishesArray) {
  return dishesArray.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

// Создание карточки блюда
function createDishCard(dish) {
  const dishItem = document.createElement('div');
  dishItem.className = 'dish-item';
  dishItem.setAttribute('data-dish', dish.keyword);

  dishItem.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <p class="dish-price">${dish.price} руб</p>
    <p class="dish-name">${dish.name}</p>
    <p class="dish-weight">${dish.count}</p>
    <button>Добавить</button>
  `;

  return dishItem;
}

// Отображение блюд на странице
function displayDishes() {
  // Сортируем блюда
  const sortedDishes = sortDishesByName([...dishes]);

  // Находим контейнеры для каждой категории
  const soupContainer = document.querySelector('#soups-container');
  const mainContainer = document.querySelector('#mains-container');
  const saladContainer = document.querySelector('#salads-container');
  const drinkContainer = document.querySelector('#drinks-container');
  const dessertContainer = document.querySelector('#desserts-container');

  // Очищаем контейнеры
  if (soupContainer) soupContainer.innerHTML = '';
  if (mainContainer) mainContainer.innerHTML = '';
  if (saladContainer) saladContainer.innerHTML = '';
  if (drinkContainer) drinkContainer.innerHTML = '';
  if (dessertContainer) dessertContainer.innerHTML = '';

  // Добавляем блюда в соответствующие контейнеры
  sortedDishes.forEach(dish => {
    const dishCard = createDishCard(dish);

    if (dish.category === 'soup' && soupContainer) {
      soupContainer.appendChild(dishCard);
    } else if (dish.category === 'main' && mainContainer) {
      mainContainer.appendChild(dishCard);
    } else if (dish.category === 'salad' && saladContainer) {
      saladContainer.appendChild(dishCard);
    } else if (dish.category === 'drink' && drinkContainer) {
      drinkContainer.appendChild(dishCard);
    } else if (dish.category === 'dessert' && dessertContainer) {
      dessertContainer.appendChild(dishCard);
    }
  });
}

// Запуск загрузки блюд после загрузки DOM
document.addEventListener('DOMContentLoaded', loadDishes);
