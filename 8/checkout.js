// Объект для хранения выбранных блюд
let selectedDishes = {
  soup: null,
  main: null,
  salad: null,
  drink: null,
  dessert: null
};

// API конфигурация
const API_URL = 'http://lab8-api.std-900.ist.mospolytech.ru';
const API_KEY = 'ba0b77bc-55b4-4755-a071-796a40d633b7';

// Загрузка заказа при инициализации страницы
function loadOrderOnCheckoutPage() {
  // Получаем ID из localStorage
  const orderIds = loadOrderFromLocalStorage();

  // Восстанавливаем объекты блюд из массива dishes
  selectedDishes = getSelectedDishesFromIds(orderIds, dishes);

  // Отображаем заказ
  displayOrderComposition();
  updateOrderSummary();
}

// Отображение состава заказа
function displayOrderComposition() {
  const container = document.getElementById('selected-dishes-container');
  const emptyMessage = document.getElementById('empty-order-message');

  if (!container) return;

  // Проверяем, есть ли выбранные блюда
  const hasAnyDish = selectedDishes.soup || selectedDishes.main ||
                     selectedDishes.salad || selectedDishes.drink ||
                     selectedDishes.dessert;

  if (!hasAnyDish) {
    emptyMessage.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  emptyMessage.style.display = 'none';
  container.innerHTML = '';

  // Отображаем каждое выбранное блюдо
  Object.entries(selectedDishes).forEach(([category, dish]) => {
    if (dish) {
      const dishCard = createCheckoutDishCard(dish, category);
      container.appendChild(dishCard);
    }
  });
}

// Создание карточки блюда для страницы оформления заказа
function createCheckoutDishCard(dish, category) {
  const dishItem = document.createElement('div');
  dishItem.className = 'dish-item';
  dishItem.setAttribute('data-dish', dish.keyword);
  dishItem.setAttribute('data-category', category);

  dishItem.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <p class="dish-price">${dish.price} руб</p>
    <p class="dish-name">${dish.name}</p>
    <p class="dish-weight">${dish.count}</p>
    <button class="remove-button" data-category="${category}">Удалить</button>
  `;

  // Добавляем обработчик для кнопки "Удалить"
  const removeButton = dishItem.querySelector('.remove-button');
  removeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    removeDishFromOrder(category);
  });

  return dishItem;
}

// Удаление блюда из заказа
function removeDishFromOrder(category) {
  selectedDishes[category] = null;

  // Сохраняем изменения в localStorage
  saveOrderToLocalStorage(selectedDishes);

  // Обновляем отображение
  displayOrderComposition();
  updateOrderSummary();
}

// Обновление сводки заказа в форме
function updateOrderSummary() {
  // Суп
  const soupDisplay = document.getElementById('soup-display');
  const soupPrice = document.getElementById('soup-price');
  if (selectedDishes.soup) {
    soupDisplay.textContent = selectedDishes.soup.name;
    soupPrice.textContent = `${selectedDishes.soup.price} руб`;
  } else {
    soupDisplay.textContent = 'Не выбран';
    soupPrice.textContent = '0 руб';
  }

  // Главное блюдо
  const mainDisplay = document.getElementById('main-display');
  const mainPrice = document.getElementById('main-price');
  if (selectedDishes.main) {
    mainDisplay.textContent = selectedDishes.main.name;
    mainPrice.textContent = `${selectedDishes.main.price} руб`;
  } else {
    mainDisplay.textContent = 'Не выбрано';
    mainPrice.textContent = '0 руб';
  }

  // Салат
  const saladDisplay = document.getElementById('salad-display');
  const saladPrice = document.getElementById('salad-price');
  if (selectedDishes.salad) {
    saladDisplay.textContent = selectedDishes.salad.name;
    saladPrice.textContent = `${selectedDishes.salad.price} руб`;
  } else {
    saladDisplay.textContent = 'Не выбран';
    saladPrice.textContent = '0 руб';
  }

  // Напиток
  const drinkDisplay = document.getElementById('drink-display');
  const drinkPrice = document.getElementById('drink-price');
  if (selectedDishes.drink) {
    drinkDisplay.textContent = selectedDishes.drink.name;
    drinkPrice.textContent = `${selectedDishes.drink.price} руб`;
  } else {
    drinkDisplay.textContent = 'Не выбран';
    drinkPrice.textContent = '0 руб';
  }

  // Десерт
  const dessertDisplay = document.getElementById('dessert-display');
  const dessertPrice = document.getElementById('dessert-price');
  if (selectedDishes.dessert) {
    dessertDisplay.textContent = selectedDishes.dessert.name;
    dessertPrice.textContent = `${selectedDishes.dessert.price} руб`;
  } else {
    dessertDisplay.textContent = 'Не выбран';
    dessertPrice.textContent = '0 руб';
  }

  // Итого
  const totalPrice = calculateTotalPrice();
  document.getElementById('total-price').textContent = `${totalPrice} руб`;
}

// Расчет общей стоимости
function calculateTotalPrice() {
  let total = 0;
  if (selectedDishes.soup) total += selectedDishes.soup.price;
  if (selectedDishes.main) total += selectedDishes.main.price;
  if (selectedDishes.salad) total += selectedDishes.salad.price;
  if (selectedDishes.drink) total += selectedDishes.drink.price;
  if (selectedDishes.dessert) total += selectedDishes.dessert.price;
  return total;
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
    return { valid: true, combo: 1 };
  }

  // Комбо 2: Суп, главное блюдо, напиток
  if (hasSoup && hasMain && !hasSalad && hasDrink && !hasDessert) {
    return { valid: true, combo: 2 };
  }

  // Комбо 3: Суп, салат, напиток
  if (hasSoup && !hasMain && hasSalad && hasDrink && !hasDessert) {
    return { valid: true, combo: 3 };
  }

  // Комбо 4: Главное блюдо, салат, напиток
  if (!hasSoup && hasMain && hasSalad && hasDrink && !hasDessert) {
    return { valid: true, combo: 4 };
  }

  // Комбо 5: Главное блюдо, напиток
  if (!hasSoup && hasMain && !hasSalad && hasDrink && !hasDessert) {
    return { valid: true, combo: 5 };
  }

  return { valid: false, combo: null };
}

// Обработка отправки формы
async function handleFormSubmit(event) {
  event.preventDefault();

  // Валидация комбо
  const comboValidation = validateCombo();
  if (!comboValidation.valid) {
    alert('Выбранный состав заказа не соответствует ни одному из доступных комбо. Пожалуйста, проверьте состав заказа.');
    return;
  }

  // Сбор данных формы
  const formData = new FormData(event.target);

  const orderData = {
    full_name: formData.get('name'),
    email: formData.get('email'),
    subscribe: formData.get('subscribe') === 'on' ? 1 : 0,
    phone: formData.get('phone'),
    delivery_address: formData.get('address'),
    delivery_type: formData.get('delivery-time-type'),
    delivery_time: formData.get('delivery-time') || '',
    comment: formData.get('comment') || '',
    soup_id: selectedDishes.soup ? selectedDishes.soup.id : null,
    main_course_id: selectedDishes.main ? selectedDishes.main.id : null,
    salad_id: selectedDishes.salad ? selectedDishes.salad.id : null,
    drink_id: selectedDishes.drink ? selectedDishes.drink.id : null,
    dessert_id: selectedDishes.dessert ? selectedDishes.dessert.id : null
  };

  try {
    // Отправка заказа на сервер
    const response = await fetch(`${API_URL}/api/orders?api_key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при отправке заказа');
    }

    const result = await response.json();

    // Успешная отправка - очищаем localStorage
    clearOrderFromLocalStorage();

    alert('Заказ успешно оформлен!');

    // Перенаправляем на главную страницу
    window.location.href = 'index.html';

  } catch (error) {
    console.error('Ошибка при отправке заказа:', error);
    alert(`Ошибка при оформлении заказа: ${error.message}`);
  }
}

// Инициализация страницы
function initCheckoutPage() {
  // Загружаем заказ после загрузки блюд
  loadOrderOnCheckoutPage();

  // Добавляем обработчик отправки формы
  const form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

// Запуск после загрузки блюд
document.addEventListener('DOMContentLoaded', () => {
  // Ждем загрузки блюд
  const checkDishesLoaded = setInterval(() => {
    if (dishes && dishes.length > 0) {
      clearInterval(checkDishesLoaded);
      initCheckoutPage();
    }
  }, 100);
});
