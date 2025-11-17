// Хранилище активных фильтров для каждой категории
const activeFilters = {
  soup: null,
  main: null,
  salad: null,
  drink: null,
  dessert: null
};

// Фильтрация и отображение блюд для конкретной категории
function filterAndDisplayDishes(category) {
  // Получаем контейнер для категории
  const containerMap = {
    soup: '#soups-container',
    main: '#mains-container',
    salad: '#salads-container',
    drink: '#drinks-container',
    dessert: '#desserts-container'
  };

  const container = document.querySelector(containerMap[category]);
  if (!container) return;

  // Очищаем контейнер
  container.innerHTML = '';

  // Фильтруем блюда по категории
  let filteredDishes = dishes.filter(dish => dish.category === category);

  // Если есть активный фильтр для этой категории, применяем его
  if (activeFilters[category]) {
    filteredDishes = filteredDishes.filter(dish => dish.kind === activeFilters[category]);
  }

  // Сортируем блюда по алфавиту
  filteredDishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  // Создаем и добавляем карточки блюд
  filteredDishes.forEach(dish => {
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

    container.appendChild(dishItem);
  });
}

// Обработка клика на кнопку фильтра
function handleFilterClick(event) {
  const button = event.target;

  // Проверяем, что клик был по кнопке фильтра
  if (!button.classList.contains('filter-button')) return;

  const category = button.getAttribute('data-category');
  const kind = button.getAttribute('data-kind');

  // Находим все кнопки фильтров для этой категории
  const categoryButtons = document.querySelectorAll(`.filter-button[data-category="${category}"]`);

  // Проверяем, активна ли кнопка
  const isActive = button.classList.contains('active');

  if (isActive) {
    // Если кнопка уже активна, деактивируем её и сбрасываем фильтр
    button.classList.remove('active');
    activeFilters[category] = null;
  } else {
    // Деактивируем все кнопки фильтров этой категории
    categoryButtons.forEach(btn => btn.classList.remove('active'));

    // Активируем нажатую кнопку и устанавливаем фильтр
    button.classList.add('active');
    activeFilters[category] = kind;
  }

  // Обновляем отображение блюд для этой категории
  filterAndDisplayDishes(category);
}

// Инициализация фильтров после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Находим все кнопки фильтров и добавляем обработчики
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
  });
});
