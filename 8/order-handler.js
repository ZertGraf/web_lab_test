// Объект для хранения выбранных блюд
let selectedDishes = {
  soup: null,
  main: null,
  salad: null,
  drink: null,
  dessert: null
};

// Обновление панели заказа
function updateOrderDisplay() {
  updateOrderPanel();
  highlightSelectedDishes();
}

// Обновление sticky-панели
function updateOrderPanel() {
  const orderPanel = document.getElementById('order-panel');
  const orderPanelPrice = document.getElementById('order-panel-price');
  const checkoutLink = document.getElementById('checkout-link');
  const comboWarning = document.getElementById('combo-warning');

  if (!orderPanel) return;

  // Проверяем, выбрано ли хоть одно блюдо
  const hasAnyDish = selectedDishes.soup || selectedDishes.main ||
                     selectedDishes.salad || selectedDishes.drink ||
                     selectedDishes.dessert;

  if (!hasAnyDish) {
    // Скрываем панель если ничего не выбрано
    orderPanel.style.display = 'none';
    return;
  }

  // Показываем панель
  orderPanel.style.display = 'block';

  // Рассчитываем общую стоимость
  let total = 0;
  if (selectedDishes.soup) total += selectedDishes.soup.price;
  if (selectedDishes.main) total += selectedDishes.main.price;
  if (selectedDishes.salad) total += selectedDishes.salad.price;
  if (selectedDishes.drink) total += selectedDishes.drink.price;
  if (selectedDishes.dessert) total += selectedDishes.dessert.price;

  orderPanelPrice.textContent = `${total} руб`;

  // Валидация комбо
  const comboValid = validateCombo();

  if (comboValid) {
    checkoutLink.classList.remove('disabled');
    checkoutLink.style.pointerEvents = 'auto';
    comboWarning.style.display = 'none';
  } else {
    checkoutLink.classList.add('disabled');
    checkoutLink.style.pointerEvents = 'none';
    comboWarning.style.display = 'block';
  }
}

// Валидация комбо
function validateCombo() {
  const hasSoup = !!selectedDishes.soup;
  const hasMain = !!selectedDishes.main;
  const hasSalad = !!selectedDishes.salad;
  const hasDrink = !!selectedDishes.drink;
  const hasDessert = !!selectedDishes.dessert;

  // Комбо 1: Суп, главное блюдо, салат, напиток
  if (hasSoup && hasMain && hasSalad && hasDrink && !hasDessert) {
    return true;
  }

  // Комбо 2: Суп, главное блюдо, напиток
  if (hasSoup && hasMain && !hasSalad && hasDrink && !hasDessert) {
    return true;
  }

  // Комбо 3: Суп, салат, напиток
  if (hasSoup && !hasMain && hasSalad && hasDrink && !hasDessert) {
    return true;
  }

  // Комбо 4: Главное блюдо, салат, напиток
  if (!hasSoup && hasMain && hasSalad && hasDrink && !hasDessert) {
    return true;
  }

  // Комбо 5: Главное блюдо, напиток
  if (!hasSoup && hasMain && !hasSalad && hasDrink && !hasDessert) {
    return true;
  }

  return false;
}

// Подсветка выбранных блюд
function highlightSelectedDishes() {
  // Убираем подсветку со всех блюд
  document.querySelectorAll('.dish-item').forEach(item => {
    item.classList.remove('selected');
  });

  // Добавляем подсветку к выбранным блюдам
  Object.values(selectedDishes).forEach(dish => {
    if (dish) {
      const dishCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
      if (dishCard) {
        dishCard.classList.add('selected');
      }
    }
  });
}

// Обработчик клика на карточку блюда
function handleDishClick(event) {
  const dishCard = event.currentTarget;
  const dishKeyword = dishCard.getAttribute('data-dish');

  // Находим блюдо в массиве
  const dish = dishes.find(d => d.keyword === dishKeyword);

  if (!dish) return;

  // Добавляем блюдо в соответствующую категорию
  if (dish.category === 'soup') {
    selectedDishes.soup = dish;
  } else if (dish.category === 'main') {
    selectedDishes.main = dish;
  } else if (dish.category === 'salad') {
    selectedDishes.salad = dish;
  } else if (dish.category === 'drink') {
    selectedDishes.drink = dish;
  } else if (dish.category === 'dessert') {
    selectedDishes.dessert = dish;
  }

  // Обновляем отображение заказа
  updateOrderDisplay();

  // Сохраняем в localStorage
  saveOrderToLocalStorage(selectedDishes);
}

// Инициализация обработчиков событий
function initOrderHandlers() {
  // Загружаем данные заказа из localStorage
  loadOrderFromStorage();

  // Добавляем обработчики клика на все карточки блюд
  document.addEventListener('click', function(event) {
    const dishCard = event.target.closest('.dish-item');
    if (dishCard) {
      handleDishClick({ currentTarget: dishCard });
    }
  });

  // Инициализируем отображение
  updateOrderDisplay();
}

// Загрузка заказа из localStorage
function loadOrderFromStorage() {
  // Получаем ID из localStorage
  const orderIds = loadOrderFromLocalStorage();

  // Восстанавливаем объекты блюд из массива dishes
  selectedDishes = getSelectedDishesFromIds(orderIds, dishes);
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initOrderHandlers);
