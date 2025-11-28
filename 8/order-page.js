const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

let dishes = [];

async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        if (!response.ok) {
            throw new Error('failed to load dishes');
        }
        dishes = await response.json();
        dishes.sort((a, b) => a.name.localeCompare(b, 'ru'));
        return dishes;
    } catch (error) {
        console.error('error loading dishes:', error);
        return [];
    }
}

function createDishElement(dish, showDeleteButton = false) {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish-item';
    dishElement.setAttribute('data-dish', dish.keyword);
    dishElement.setAttribute('data-kind', dish.kind);

    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} руб</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button data-action="delete">${showDeleteButton ? 'Удалить' : 'Добавить'}</button>
    `;

    return dishElement;
}

function displayOrderDishes() {
    const container = document.getElementById('order-dishes-container');

    const hasSelection = selectedDishes.soup || selectedDishes.main ||
        selectedDishes.salad || selectedDishes.drink ||
        selectedDishes.dessert;

    if (!hasSelection) {
        container.innerHTML = '<p id="empty-order-message">Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу <a href="menu.html">Собрать ланч</a>.</p>';
        return;
    }

    container.innerHTML = '';

    for (const category in selectedDishes) {
        if (selectedDishes[category]) {
            const dishElement = createDishElement(selectedDishes[category], true);
            container.appendChild(dishElement);
        }
    }
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const totalPriceElement = document.getElementById('total-price');

    let orderHTML = '';

    const categories = [
        { key: 'soup', label: 'Суп', emptyText: 'Не выбран' },
        { key: 'main', label: 'Главное блюдо', emptyText: 'Не выбрано' },
        { key: 'salad', label: 'Салат или стартер', emptyText: 'Не выбран' },
        { key: 'drink', label: 'Напиток', emptyText: 'Не выбран' },
        { key: 'dessert', label: 'Десерт', emptyText: 'Не выбран' }
    ];

    categories.forEach(cat => {
        const dish = selectedDishes[cat.key];
        orderHTML += `
            <div class="order-category">
                <p><strong>${cat.label}</strong></p>
                <p>${dish ? `${dish.name} - ${dish.price} руб` : cat.emptyText}</p>
            </div>
        `;
    });

    orderSummary.innerHTML = orderHTML;

    let totalPrice = 0;
    for (const category in selectedDishes) {
        if (selectedDishes[category]) {
            totalPrice += selectedDishes[category].price;
        }
    }

    totalPriceElement.textContent = `${totalPrice} руб`;
    orderTotal.style.display = 'block';
}

function removeDishFromOrder(category) {
    selectedDishes[category] = null;
    saveOrder(selectedDishes);
    displayOrderDishes();
    updateOrderSummary();
}

async function loadOrderFromStorage() {
    const orderData = loadOrder();

    for (const category in orderData) {
        if (orderData[category]) {
            const dish = dishes.find(d => d.keyword === orderData[category]);
            if (dish) {
                selectedDishes[category] = dish;
            }
        }
    }

    displayOrderDishes();
    updateOrderSummary();
}

function checkLunchComposition() {
    const s = selectedDishes.soup;
    const m = selectedDishes.main;
    const sa = selectedDishes.salad;
    const d = selectedDishes.drink;

    if (!s && !m && !sa && !d && !selectedDishes.dessert) {
        alert("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    }

    if (s && !m && !sa) {
        alert("Выберите главное блюдо/салат/стартер");
        return false;
    }

    if (sa && !s && !m) {
        alert("Выберите суп или главное блюдо");
        return false;
    }

    if ((m || (s && sa) || s || sa) && !d) {
        alert("Выберите напиток");
        return false;
    }

    return true;
}

async function submitOrder(formData) {
    const API_KEY = 'ba0b77bc-55b4-4755-a071-796a40d633b7';
    const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/orders';

    const orderData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        subscribe: formData.get('subscribe') ? 1 : 0,
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: formData.get('delivery_type'),
        comment: formData.get('comment') || ''
    };

    if (formData.get('delivery_type') === 'by_time') {
        orderData.delivery_time = formData.get('delivery_time');
    }

    if (selectedDishes.soup) {
        const soupDish = dishes.find(d => d.keyword === selectedDishes.soup.keyword);
        if (soupDish) orderData.soup_id = soupDish.id;
    }
    if (selectedDishes.main) {
        const mainDish = dishes.find(d => d.keyword === selectedDishes.main.keyword);
        if (mainDish) orderData.main_course_id = mainDish.id;
    }
    if (selectedDishes.salad) {
        const saladDish = dishes.find(d => d.keyword === selectedDishes.salad.keyword);
        if (saladDish) orderData.salad_id = saladDish.id;
    }
    if (selectedDishes.drink) {
        const drinkDish = dishes.find(d => d.keyword === selectedDishes.drink.keyword);
        if (drinkDish) orderData.drink_id = drinkDish.id;
    }
    if (selectedDishes.dessert) {
        const dessertDish = dishes.find(d => d.keyword === selectedDishes.dessert.keyword);
        if (dessertDish) orderData.dessert_id = dessertDish.id;
    }

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'failed to submit order');
        }

        clearOrder();
        alert('Заказ успешно оформлен!');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error('error submitting order:', error);
        alert(`Ошибка при оформлении заказа: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    await loadOrderFromStorage();

    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.getAttribute('data-action') === 'delete') {
            const dishItem = event.target.closest('.dish-item');
            if (dishItem) {
                const dishKeyword = dishItem.getAttribute('data-dish');
                const dish = dishes.find(d => d.keyword === dishKeyword);
                if (dish) {
                    removeDishFromOrder(dish.category);
                }
            }
        }
    });

    document.getElementById('clear-order').addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите очистить корзину?')) {
            for (const cat in selectedDishes) {
                selectedDishes[cat] = null;
            }
            clearOrder();
            displayOrderDishes();
            updateOrderSummary();
        }
    });

    document.getElementById('order-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!checkLunchComposition()) {
            return;
        }

        const formData = new FormData(event.target);
        await submitOrder(formData);
    });
});