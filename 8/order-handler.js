const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function updateOrderDisplay() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const totalPriceElement = document.getElementById('total-price');

    if (!orderSummary) return;

    const hasSelection = selectedDishes.soup || selectedDishes.main ||
        selectedDishes.salad || selectedDishes.drink ||
        selectedDishes.dessert;

    if (!hasSelection) {
        orderSummary.innerHTML = '<p id="no-selection-message">Ничего не выбрано</p>';
        if (orderTotal) orderTotal.style.display = 'none';
        return;
    }

    let orderHTML = '';

    const categories = [
        { key: 'soup', label: 'Суп', emptyText: 'Блюдо не выбрано' },
        { key: 'main', label: 'Главное блюдо', emptyText: 'Блюдо не выбрано' },
        { key: 'salad', label: 'Салат или стартер', emptyText: 'Блюдо не выбрано' },
        { key: 'drink', label: 'Напиток', emptyText: 'Напиток не выбран' },
        { key: 'dessert', label: 'Десерт', emptyText: 'Десерт не выбран' }
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

    if (totalPriceElement) {
        totalPriceElement.textContent = `${totalPrice} руб`;
    }
    if (orderTotal) {
        orderTotal.style.display = 'block';
    }
}

function updateStickyPanel() {
    const panel = document.getElementById('sticky-panel');
    if (!panel) {
        console.warn('sticky panel not found in DOM');
        return;
    }

    const hasSelection = selectedDishes.soup || selectedDishes.main ||
        selectedDishes.salad || selectedDishes.drink ||
        selectedDishes.dessert;

    if (!hasSelection) {
        panel.style.display = 'none';
        return;
    }

    panel.style.display = 'block';

    let totalPrice = 0;
    if (selectedDishes.soup) totalPrice += selectedDishes.soup.price;
    if (selectedDishes.main) totalPrice += selectedDishes.main.price;
    if (selectedDishes.salad) totalPrice += selectedDishes.salad.price;
    if (selectedDishes.drink) totalPrice += selectedDishes.drink.price;
    if (selectedDishes.dessert) totalPrice += selectedDishes.dessert.price;

    const priceElement = panel.querySelector('#sticky-price');
    if (priceElement) {
        priceElement.textContent = `${totalPrice} ₽`;
    }

    const link = document.getElementById('checkout-link');
    if (!link) {
        console.error('checkout link not found');
        return;
    }

    const isValid = checkLunchCompositionSilent();

    console.log('validation result:', {
        isValid,
        soup: !!selectedDishes.soup,
        main: !!selectedDishes.main,
        salad: !!selectedDishes.salad,
        drink: !!selectedDishes.drink,
        dessert: !!selectedDishes.dessert
    });

    if (isValid) {
        link.classList.remove('disabled');
        link.removeAttribute('onclick');
        link.style.pointerEvents = 'auto';
        link.style.opacity = '1';
        link.style.cursor = 'pointer';
    } else {
        link.classList.add('disabled');
        link.setAttribute('onclick', 'return false;');
        link.style.pointerEvents = 'none';
        link.style.opacity = '0.5';
        link.style.cursor = 'not-allowed';
    }
}

function addDishToOrder(dishKeyword) {
    if (!dishes || dishes.length === 0) {
        console.error('dishes not loaded yet');
        return;
    }

    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) {
        console.error('dish not found:', dishKeyword);
        return;
    }

    selectedDishes[dish.category] = dish;
    saveOrder(selectedDishes);
    updateOrderDisplay();
    updateStickyPanel();
    updateDishButtons();
}

function updateDishButtons() {
    document.querySelectorAll('.dish-item').forEach(item => {
        const keyword = item.getAttribute('data-dish');
        const dish = dishes.find(d => d.keyword === keyword);

        if (!dish) return;

        const isSelected = selectedDishes[dish.category]?.keyword === keyword;
        const button = item.querySelector('button');

        if (button && button.textContent === 'Добавить') {
            if (isSelected) {
                button.textContent = 'Добавлено';
                button.style.backgroundColor = 'tomato';
                button.style.color = 'white';
            } else {
                button.textContent = 'Добавить';
                button.style.backgroundColor = '';
                button.style.color = '';
            }
        }
    });
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

    updateOrderDisplay();
    updateStickyPanel();
    updateDishButtons();
}

function checkLunchCompositionSilent() {
    const s = selectedDishes.soup;
    const m = selectedDishes.main;
    const sa = selectedDishes.salad;
    const d = selectedDishes.drink;
    const de = selectedDishes.dessert;

    const count = (s ? 1 : 0) + (m ? 1 : 0) + (sa ? 1 : 0) + (d ? 1 : 0) + (de ? 1 : 0);

    if (count === 0) return false;
    if (s && !m && !sa) return false;
    if (sa && !s && !m) return false;
    if ((d || de) && !s && !m && !sa) return false;
    if ((m || (s && sa) || s || sa) && !d) return false;

    return true;
}

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
        showNotification("Выберите главное блюдо/салат/стартер");
        return false;
    }

    if (sa && !s && !m) {
        showNotification("Выберите суп или главное блюдо");
        return false;
    }

    if ((d || de) && !s && !m && !sa) {
        showNotification("Выберите главное блюдо");
        return false;
    }

    if ((m || (s && sa) || s || sa) && !d) {
        showNotification("Выберите напиток");
        return false;
    }

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

function initializeOrderHandler() {
    if (!dishes || dishes.length === 0) {
        console.warn('dishes not loaded, retrying...');
        setTimeout(initializeOrderHandler, 100);
        return;
    }

    loadOrderFromStorage();

    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' &&
            (event.target.textContent.trim() === 'Добавить' ||
                event.target.textContent.trim() === 'Добавлено')) {
            const dishItem = event.target.closest('.dish-item');
            if (dishItem) {
                const dishKeyword = dishItem.getAttribute('data-dish');
                addDishToOrder(dishKeyword);
            }
        }
    });

    const form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (checkLunchComposition()) {
                event.target.submit();
            }
        });
    }
}