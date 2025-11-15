// Объект для хранения выбранных блюд
const selectedDishes = {
  soup: null,
  main: null,
  salad: null,
  drink: null,
  dessert: null
};

// Обновление блока "Ваш заказ"
function updateOrderDisplay() {
  const orderContainer = document.querySelector('#selected-dishes');

  if (!orderContainer) return;

  // Проверяем, выбрано ли хоть одно блюдо
  const hasAnyDish = selectedDishes.soup || selectedDishes.main || selectedDishes.salad || selectedDishes.drink || selectedDishes.dessert;

  if (!hasAnyDish) {
    // Если ничего не выбрано
    orderContainer.innerHTML = '<p>Ничего не выбрано</p>';
    updateTotalPrice();
    return;
  }

  // Формируем HTML для каждой категории
  let html = '';

  // Суп
  html += '<div class="order-category">';
  html += '<h4>Суп</h4>';
  if (selectedDishes.soup) {
    html += `<p>${selectedDishes.soup.name} - ${selectedDishes.soup.price} руб</p>`;
  } else {
    html += '<p>Блюдо не выбрано</p>';
  }
  html += '</div>';

  // Главное блюдо
  html += '<div class="order-category">';
  html += '<h4>Главное блюдо</h4>';
  if (selectedDishes.main) {
    html += `<p>${selectedDishes.main.name} - ${selectedDishes.main.price} руб</p>`;
  } else {
    html += '<p>Блюдо не выбрано</p>';
  }
  html += '</div>';

  // Салат или стартер
  html += '<div class="order-category">';
  html += '<h4>Салат или стартер</h4>';
  if (selectedDishes.salad) {
    html += `<p>${selectedDishes.salad.name} - ${selectedDishes.salad.price} руб</p>`;
  } else {
    html += '<p>Блюдо не выбрано</p>';
  }
  html += '</div>';

  // Напиток
  html += '<div class="order-category">';
  html += '<h4>Напиток</h4>';
  if (selectedDishes.drink) {
    html += `<p>${selectedDishes.drink.name} - ${selectedDishes.drink.price} руб</p>`;
  } else {
    html += '<p>Напиток не выбран</p>';
  }
  html += '</div>';

  // Десерт
  html += '<div class="order-category">';
  html += '<h4>Десерт</h4>';
  if (selectedDishes.dessert) {
    html += `<p>${selectedDishes.dessert.name} - ${selectedDishes.dessert.price} руб</p>`;
  } else {
    html += '<p>Десерт не выбран</p>';
  }
  html += '</div>';

  orderContainer.innerHTML = html;
  updateTotalPrice();
}

// Обновление общей стоимости
function updateTotalPrice() {
  const totalPriceContainer = document.querySelector('#total-price');

  if (!totalPriceContainer) return;

  const hasAnyDish = selectedDishes.soup || selectedDishes.main || selectedDishes.salad || selectedDishes.drink || selectedDishes.dessert;

  if (!hasAnyDish) {
    totalPriceContainer.style.display = 'none';
    return;
  }

  let total = 0;
  if (selectedDishes.soup) total += selectedDishes.soup.price;
  if (selectedDishes.main) total += selectedDishes.main.price;
  if (selectedDishes.salad) total += selectedDishes.salad.price;
  if (selectedDishes.drink) total += selectedDishes.drink.price;
  if (selectedDishes.dessert) total += selectedDishes.dessert.price;

  totalPriceContainer.style.display = 'block';
  totalPriceContainer.innerHTML = `<h4>Стоимость заказа</h4><p>${total} руб</p>`;
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
}

// Инициализация обработчиков событий
function initOrderHandlers() {
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

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initOrderHandlers);
