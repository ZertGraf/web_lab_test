// Объект для хранения выбранных блюд
const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Функция для обновления отображения заказа
function updateOrderDisplay() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const totalPriceElement = document.getElementById('total-price');

    // Проверяем, есть ли выбранные блюда
    const hasSelection = selectedDishes.soup || selectedDishes.main || selectedDishes.salad || selectedDishes.drink || selectedDishes.dessert;

    if (!hasSelection) {
        // Если ничего не выбрано
        orderSummary.innerHTML = '<p id="no-selection-message">Ничего не выбрано</p>';
        orderTotal.style.display = 'none';
        return;
    }

    // Формируем HTML для заказа
    let orderHTML = '';

    // Суп
    if (selectedDishes.soup) {
        orderHTML += `
            <div class="order-category">
                <p><strong>Суп</strong></p>
                <p>${selectedDishes.soup.name} - ${selectedDishes.soup.price} руб</p>
            </div>
        `;
    } else {
        orderHTML += `
            <div class="order-category">
                <p><strong>Суп</strong></p>
                <p>Блюдо не выбрано</p>
            </div>
        `;
    }

    // Главное блюдо
    if (selectedDishes.main) {
        orderHTML += `
            <div class="order-category">
                <p><strong>Главное блюдо</strong></p>
                <p>${selectedDishes.main.name} - ${selectedDishes.main.price} руб</p>
            </div>
        `;
    } else {
        orderHTML += `
            <div class="order-category">
                <p><strong>Главное блюдо</strong></p>
                <p>Блюдо не выбрано</p>
            </div>
        `;
    }

    // Салат или стартер
    if (selectedDishes.salad) {
        orderHTML += `
            <div class="order-category">
                <p><strong>Салат или стартер</strong></p>
                <p>${selectedDishes.salad.name} - ${selectedDishes.salad.price} руб</p>
            </div>
        `;
    } else {
        orderHTML += `
            <div class="order-category">
                <p><strong>Салат или стартер</strong></p>
                <p>Блюдо не выбрано</p>
            </div>
        `;
    }

    // Напиток
    if (selectedDishes.drink) {
        orderHTML += `
            <div class="order-category">
                <p><strong>Напиток</strong></p>
                <p>${selectedDishes.drink.name} - ${selectedDishes.drink.price} руб</p>
            </div>
        `;
    } else {
        orderHTML += `
            <div class="order-category">
                <p><strong>Напиток</strong></p>
                <p>Напиток не выбран</p>
            </div>
        `;
    }

    // Десерт
    if (selectedDishes.dessert) {
        orderHTML += `
            <div class="order-category">
                <p><strong>Десерт</strong></p>
                <p>${selectedDishes.dessert.name} - ${selectedDishes.dessert.price} руб</p>
            </div>
        `;
    } else {
        orderHTML += `
            <div class="order-category">
                <p><strong>Десерт</strong></p>
                <p>Десерт не выбран</p>
            </div>
        `;
    }

    orderSummary.innerHTML = orderHTML;

    // Подсчитываем итоговую стоимость
    let totalPrice = 0;
    if (selectedDishes.soup) totalPrice += selectedDishes.soup.price;
    if (selectedDishes.main) totalPrice += selectedDishes.main.price;
    if (selectedDishes.salad) totalPrice += selectedDishes.salad.price;
    if (selectedDishes.drink) totalPrice += selectedDishes.drink.price;
    if (selectedDishes.dessert) totalPrice += selectedDishes.dessert.price;

    // Отображаем итоговую стоимость
    totalPriceElement.textContent = `${totalPrice} руб`;
    orderTotal.style.display = 'block';
}

// Функция для добавления блюда в заказ
function addDishToOrder(dishKeyword) {
    // Находим блюдо в массиве
    const dish = dishes.find(d => d.keyword === dishKeyword);

    if (!dish) return;

    // Добавляем блюдо в соответствующую категорию
    selectedDishes[dish.category] = dish;

    // Обновляем отображение заказа
    updateOrderDisplay();
}

// Обработчик клика на кнопку "Добавить"
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Добавить') {
            const dishItem = event.target.closest('.dish-item');
            if (dishItem) {
                const dishKeyword = dishItem.getAttribute('data-dish');
                addDishToOrder(dishKeyword);
            }
        }
    });

    document.getElementById('order-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (checkLunchComposition()) {
            event.target.submit();
        }
    });
});

function checkLunchComposition() {
    const s = selectedDishes.soup;
    const m = selectedDishes.main;
    const sa = selectedDishes.salad;
    const d = selectedDishes.drink;
    const de = selectedDishes.dessert;

    const count = (s ? 1 : 0) + (m ? 1 : 0) + (sa ? 1 : 0) + (d ? 1 : 0) + (de ? 1 : 0);

    if (count === 0) {
        showNotification("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    }

    if (s && !m && !sa) {
        return showNotification("Выберите главное блюдо/салат/стартер");
    }

    if (sa && !s && !m) {
        return showNotification("Выберите суп или главное блюдо");
    }

    if ((d || de) && !s && !m && !sa) {
        return showNotification("Выберите главное блюдо");
    }

    if ((m || (s && sa) || s || sa) && !d) {
        return showNotification("Выберите напиток");
    }

    // Valid combos check
    // 1. S+M+Sa+D
    // 2. S+M+D
    // 3. S+Sa+D
    // 4. M+Sa+D
    // 5. M+D

    return true;
}

function showNotification(message) {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const box = document.createElement('div');
    box.className = 'notification-box';

    const msg = document.createElement('p');
    msg.className = 'notification-message';
    msg.textContent = message;

    const btn = document.createElement('button');
    btn.className = 'notification-button';
    btn.textContent = 'Окей';

    btn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    box.appendChild(msg);
    box.appendChild(btn);
    overlay.appendChild(box);

    document.body.appendChild(overlay);

    return false;
}