// Функция валидации заказа
function validateOrder() {
  const hasSoup = selectedDishes.soup !== null;
  const hasMain = selectedDishes.main !== null;
  const hasSalad = selectedDishes.salad !== null;
  const hasDrink = selectedDishes.drink !== null;
  const hasDessert = selectedDishes.dessert !== null;

  // Ничего не выбрано
  if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
    return {
      valid: false,
      message: 'Ничего не выбрано. Выберите блюда для заказа'
    };
  }

  // Проверка на валидные комбинации
  // Вариант 1: Суп + Главное блюдо + Салат + Напиток
  // Вариант 2: Суп + Главное блюдо + Напиток
  // Вариант 3: Суп + Салат + Напиток
  // Вариант 4: Главное блюдо + Салат + Напиток
  // Вариант 5: Главное блюдо + Напиток
  // Десерты можно добавлять к любому варианту

  // Проверяем валидные комбинации
  const validCombinations = [
    { soup: true, main: true, salad: true, drink: true },   // Вариант 1
    { soup: true, main: true, salad: false, drink: true },  // Вариант 2
    { soup: true, main: false, salad: true, drink: true },  // Вариант 3
    { soup: false, main: true, salad: true, drink: true },  // Вариант 4
    { soup: false, main: true, salad: false, drink: true }  // Вариант 5
  ];

  const currentOrder = {
    soup: hasSoup,
    main: hasMain,
    salad: hasSalad,
    drink: hasDrink
  };

  // Проверяем, совпадает ли текущий заказ с одной из валидных комбинаций
  const isValid = validCombinations.some(combo =>
    combo.soup === currentOrder.soup &&
    combo.main === currentOrder.main &&
    combo.salad === currentOrder.salad &&
    combo.drink === currentOrder.drink
  );

  if (isValid) {
    return { valid: true };
  }

  // Определяем, какое уведомление показать
  // Выбраны все необходимые блюда, кроме напитка
  if ((hasSoup || hasMain || hasSalad) && !hasDrink) {
    return {
      valid: false,
      message: 'Выберите напиток'
    };
  }

  // Выбран суп, но не выбраны главное блюдо/салат/стартер
  if (hasSoup && !hasMain && !hasSalad) {
    return {
      valid: false,
      message: 'Выберите главное блюдо/салат/стартер'
    };
  }

  // Выбран салат/стартер, но не выбраны суп/главное блюдо
  if (hasSalad && !hasSoup && !hasMain) {
    return {
      valid: false,
      message: 'Выберите суп или главное блюдо'
    };
  }

  // Выбран только напиток/десерт (без суп/главное/салат)
  if (!hasSoup && !hasMain && !hasSalad && (hasDrink || hasDessert)) {
    return {
      valid: false,
      message: 'Выберите главное блюдо'
    };
  }

  // Если нет напитка вообще
  if (!hasDrink) {
    return {
      valid: false,
      message: 'Выберите напиток'
    };
  }

  return {
    valid: false,
    message: 'Выберите главное блюдо'
  };
}

// Функция создания и отображения уведомления
function showNotification(message) {
  // Проверяем, нет ли уже отображаемого уведомления
  const existingNotification = document.querySelector('.notification-overlay');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Создаем overlay
  const overlay = document.createElement('div');
  overlay.className = 'notification-overlay';

  // Создаем контейнер уведомления
  const notification = document.createElement('div');
  notification.className = 'notification';

  // Создаем контент уведомления
  const messageElement = document.createElement('p');
  messageElement.className = 'notification-message';
  messageElement.textContent = message;

  // Создаем кнопку "Окей"
  const button = document.createElement('button');
  button.className = 'notification-button';
  button.textContent = 'Окей';

  // Обработчик клика на кнопку
  button.addEventListener('click', function() {
    overlay.remove();
  });

  // Собираем уведомление
  notification.appendChild(messageElement);
  notification.appendChild(button);
  overlay.appendChild(notification);

  // Добавляем в body
  document.body.appendChild(overlay);
}

// Обработчик отправки формы
function handleFormSubmit(event) {
  event.preventDefault();

  const validation = validateOrder();

  if (!validation.valid) {
    showNotification(validation.message);
    return false;
  }

  // Если валидация прошла успешно, отправляем форму
  event.target.submit();
}

// Инициализация обработчика формы
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#order-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
