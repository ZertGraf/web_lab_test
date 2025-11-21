// Проверка состава ланча и показ уведомлений

// Получаем форму
const orderForm = document.getElementById('order-form');

// Добавляем обработчик на отправку формы
orderForm.addEventListener('submit', function(event) {
    // Получаем выбранные блюда
    const selectedDishes = getSelectedDishes();

    // Проверяем состав ланча
    const validationResult = validateLunchCombo(selectedDishes);

    // Если состав некорректный, предотвращаем отправку формы и показываем уведомление
    if (!validationResult.isValid) {
        event.preventDefault();
        showNotification(validationResult.message);
    }
});

// Функция получения выбранных блюд из заказа
function getSelectedDishes() {
    const orderSummary = document.getElementById('order-summary');
    const categories = {
        soup: false,
        main: false,
        salad: false,
        drink: false,
        dessert: false
    };

    // Проверяем наличие блюд каждой категории
    const soupDiv = orderSummary.querySelector('[data-category="soup"]');
    const mainDiv = orderSummary.querySelector('[data-category="main"]');
    const saladDiv = orderSummary.querySelector('[data-category="salad"]');
    const drinkDiv = orderSummary.querySelector('[data-category="drink"]');
    const dessertDiv = orderSummary.querySelector('[data-category="dessert"]');

    if (soupDiv) categories.soup = true;
    if (mainDiv) categories.main = true;
    if (saladDiv) categories.salad = true;
    if (drinkDiv) categories.drink = true;
    if (dessertDiv) categories.dessert = true;

    return categories;
}

// Функция проверки состава ланча
function validateLunchCombo(selected) {
    const hasSoup = selected.soup;
    const hasMain = selected.main;
    const hasSalad = selected.salad;
    const hasDrink = selected.drink;
    const hasDessert = selected.dessert;

    // Проверяем, выбрано ли хотя бы одно блюдо (исключая десерт)
    const hasAnyDish = hasSoup || hasMain || hasSalad || hasDrink;

    // Уведомление 1: Ничего не выбрано
    if (!hasAnyDish) {
        return {
            isValid: false,
            message: 'Ничего не выбрано. Выберите блюда для заказа'
        };
    }

    // Валидные комбо:
    // 1. Суп + Главное блюдо + Салат + Напиток (+ Десерт)
    // 2. Суп + Главное блюдо + Напиток (+ Десерт)
    // 3. Суп + Салат + Напиток (+ Десерт)
    // 4. Главное блюдо + Салат + Напиток (+ Десерт)
    // 5. Главное блюдо + Напиток (+ Десерт)

    const combo1 = hasSoup && hasMain && hasSalad && hasDrink;
    const combo2 = hasSoup && hasMain && !hasSalad && hasDrink;
    const combo3 = hasSoup && !hasMain && hasSalad && hasDrink;
    const combo4 = !hasSoup && hasMain && hasSalad && hasDrink;
    const combo5 = !hasSoup && hasMain && !hasSalad && hasDrink;

    const isValidCombo = combo1 || combo2 || combo3 || combo4 || combo5;

    if (isValidCombo) {
        return { isValid: true };
    }

    // Определяем, какое уведомление показать

    // Уведомление 2: Выберите напиток (если есть все, кроме напитка)
    if (!hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }

    // Уведомление 3: Выберите главное блюдо/салат/стартер (если есть суп, но нет главного/салата)
    if (hasSoup && !hasMain && !hasSalad) {
        return {
            isValid: false,
            message: 'Выберите главное блюдо/салат/стартер'
        };
    }

    // Уведомление 4: Выберите суп или главное блюдо (если есть салат, но нет супа/главного)
    if (hasSalad && !hasSoup && !hasMain) {
        return {
            isValid: false,
            message: 'Выберите суп или главное блюдо'
        };
    }

    // Уведомление 5: Выберите главное блюдо (если есть только напиток/десерт)
    if ((hasDrink || hasDessert) && !hasMain && !hasSoup && !hasSalad) {
        return {
            isValid: false,
            message: 'Выберите главное блюдо'
        };
    }

    // Дополнительные случаи
    if (hasSoup && hasSalad && !hasMain && !hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }

    if (hasSoup && hasMain && !hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }

    if (hasMain && hasSalad && !hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }

    if (hasMain && !hasSalad && !hasSoup && !hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }

    // По умолчанию
    return {
        isValid: false,
        message: 'Некорректный состав заказа'
    };
}

// Функция показа уведомления
function showNotification(message) {
    // Проверяем, нет ли уже уведомления на странице
    const existingNotification = document.querySelector('.notification-overlay');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    // Создаем блок уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';

    // Создаем текст уведомления
    const messageText = document.createElement('p');
    messageText.className = 'notification-message';
    messageText.textContent = message;

    // Создаем кнопку "Окей"
    const okButton = document.createElement('button');
    okButton.className = 'notification-button';
    okButton.textContent = 'Окей';

    // Обработчик закрытия уведомления
    okButton.addEventListener('click', function() {
        overlay.remove();
    });

    // Собираем уведомление
    notification.appendChild(messageText);
    notification.appendChild(okButton);
    overlay.appendChild(notification);

    // Добавляем на страницу
    document.body.appendChild(overlay);
}
