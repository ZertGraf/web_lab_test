// Конфигурация API
const API_KEY = 'ba0b77bc-55b4-4755-a071-796a40d633b7';
const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru';
const API_ORDERS_URL = `${API_BASE_URL}/labs/api/orders?api_key=${API_KEY}`;
const API_DISHES_URL = `${API_BASE_URL}/labs/api/dishes?api_key=${API_KEY}`;

// Глобальные переменные
let orders = [];
let dishes = [];
let currentOrderId = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initializeModals();
  loadDishes();
  loadOrders();
});

// Инициализация модальных окон
function initializeModals() {
  // Закрытие по клику на крестик
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeModal(closeBtn.dataset.modal);
    });
  });

  // Закрытие по клику на кнопки в футере модальных окон
  document.querySelectorAll('.modal-footer .btn-secondary, .modal-footer .btn-primary[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.modal) {
        closeModal(btn.dataset.modal);
      }
    });
  });

  // Закрытие по клику вне модального окна
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Обработчики для кнопок действий
  document.getElementById('save-edit-btn').addEventListener('click', saveEditedOrder);
  document.getElementById('confirm-delete-btn').addEventListener('click', confirmDeleteOrder);

  // Обработчик изменения типа доставки
  document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
    radio.addEventListener('change', handleDeliveryTypeChange);
  });
}

// Загрузка списка блюд
async function loadDishes() {
  try {
    const response = await fetch(API_DISHES_URL);
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных о блюдах');
    }
    dishes = await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке блюд:', error);
    showNotification('Ошибка при загрузке данных о блюдах', 'error');
  }
}

// Загрузка списка заказов
async function loadOrders() {
  const loadingMessage = document.getElementById('loading-message');
  const ordersList = document.getElementById('orders-list');

  try {
    const response = await fetch(API_ORDERS_URL);
    if (!response.ok) {
      throw new Error('Ошибка загрузки заказов');
    }

    orders = await response.json();

    // Сортировка по убыванию даты (новые заказы сначала)
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    loadingMessage.style.display = 'none';

    if (orders.length === 0) {
      ordersList.innerHTML = '<p style="text-align: center; color: #666;">У вас пока нет заказов</p>';
    } else {
      displayOrders();
    }
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error);
    loadingMessage.textContent = 'Ошибка при загрузке заказов';
    showNotification('Ошибка при загрузке заказов', 'error');
  }
}

// Отображение списка заказов
function displayOrders() {
  const ordersList = document.getElementById('orders-list');
  ordersList.innerHTML = '';

  orders.forEach((order, index) => {
    const orderCard = createOrderCard(order, index + 1);
    ordersList.appendChild(orderCard);
  });
}

// Создание карточки заказа
function createOrderCard(order, orderNumber) {
  const card = document.createElement('div');
  card.className = 'order-card';

  const orderDate = new Date(order.created_at).toLocaleString('ru-RU');
  const composition = getOrderComposition(order);
  const deliveryTime = order.delivery_type === 'by_time'
    ? `К ${order.delivery_time}`
    : 'Как можно скорее (с 7:00 до 23:00)';

  const totalPrice = calculateOrderPrice(order);

  card.innerHTML = `
    <div class="order-header">
      <div class="order-number">Заказ №${orderNumber}</div>
      <div class="order-date">${orderDate}</div>
    </div>
    <div class="order-body">
      <div class="order-info-row">
        <span class="order-info-label">Состав заказа:</span>
        <span class="order-info-value">${composition}</span>
      </div>
      <div class="order-info-row">
        <span class="order-info-label">Стоимость:</span>
        <span class="order-info-value order-price">${totalPrice} ₽</span>
      </div>
      <div class="order-info-row">
        <span class="order-info-label">Время доставки:</span>
        <span class="order-info-value">${deliveryTime}</span>
      </div>
    </div>
    <div class="order-actions">
      <button class="btn btn-info" onclick="viewOrder(${order.id})">
        <i class="bi bi-eye"></i> Подробнее
      </button>
      <button class="btn btn-warning" onclick="editOrder(${order.id})">
        <i class="bi bi-pencil"></i> Редактировать
      </button>
      <button class="btn btn-danger" onclick="deleteOrder(${order.id})">
        <i class="bi bi-trash"></i> Удалить
      </button>
    </div>
  `;

  return card;
}

// Получить состав заказа (названия блюд)
function getOrderComposition(order) {
  const dishNames = [];

  if (order.soup_id) {
    const dish = dishes.find(d => d.id === order.soup_id);
    if (dish) dishNames.push(dish.name);
  }

  if (order.main_course_id) {
    const dish = dishes.find(d => d.id === order.main_course_id);
    if (dish) dishNames.push(dish.name);
  }

  if (order.salad_id) {
    const dish = dishes.find(d => d.id === order.salad_id);
    if (dish) dishNames.push(dish.name);
  }

  if (order.drink_id) {
    const dish = dishes.find(d => d.id === order.drink_id);
    if (dish) dishNames.push(dish.name);
  }

  if (order.dessert_id) {
    const dish = dishes.find(d => d.id === order.dessert_id);
    if (dish) dishNames.push(dish.name);
  }

  return dishNames.length > 0 ? dishNames.join(', ') : 'Не указано';
}

// Рассчитать стоимость заказа
function calculateOrderPrice(order) {
  let total = 0;

  if (order.soup_id) {
    const dish = dishes.find(d => d.id === order.soup_id);
    if (dish) total += dish.price;
  }

  if (order.main_course_id) {
    const dish = dishes.find(d => d.id === order.main_course_id);
    if (dish) total += dish.price;
  }

  if (order.salad_id) {
    const dish = dishes.find(d => d.id === order.salad_id);
    if (dish) total += dish.price;
  }

  if (order.drink_id) {
    const dish = dishes.find(d => d.id === order.drink_id);
    if (dish) total += dish.price;
  }

  if (order.dessert_id) {
    const dish = dishes.find(d => d.id === order.dessert_id);
    if (dish) total += dish.price;
  }

  return total;
}

// Просмотр деталей заказа
function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modalBody = document.getElementById('view-modal-body');
  const orderDate = new Date(order.created_at).toLocaleString('ru-RU');
  const deliveryTime = order.delivery_type === 'by_time'
    ? `К ${order.delivery_time}`
    : 'Как можно скорее (с 7:00 до 23:00)';
  const totalPrice = calculateOrderPrice(order);
  const composition = getOrderComposition(order);

  modalBody.innerHTML = `
    <div class="order-detail-row">
      <span class="order-detail-label">ID заказа:</span>
      <span class="order-detail-value">${order.id}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Дата создания:</span>
      <span class="order-detail-value">${orderDate}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Имя:</span>
      <span class="order-detail-value">${order.full_name}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Email:</span>
      <span class="order-detail-value">${order.email}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Телефон:</span>
      <span class="order-detail-value">${order.phone}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Адрес доставки:</span>
      <span class="order-detail-value">${order.delivery_address}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Время доставки:</span>
      <span class="order-detail-value">${deliveryTime}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Состав заказа:</span>
      <span class="order-detail-value">${composition}</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Стоимость:</span>
      <span class="order-detail-value" style="font-weight: bold; color: tomato;">${totalPrice} ₽</span>
    </div>
    <div class="order-detail-row">
      <span class="order-detail-label">Комментарий:</span>
      <span class="order-detail-value">${order.comment || 'Нет комментария'}</span>
    </div>
  `;

  openModal('view-modal');
}

// Редактирование заказа
function editOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  currentOrderId = orderId;

  // Заполнение формы данными заказа
  document.getElementById('edit-order-id').value = order.id;
  document.getElementById('edit-full-name').value = order.full_name;
  document.getElementById('edit-email').value = order.email;
  document.getElementById('edit-phone').value = order.phone;
  document.getElementById('edit-delivery-address').value = order.delivery_address;
  document.getElementById('edit-comment').value = order.comment || '';

  // Установка типа доставки
  if (order.delivery_type === 'now') {
    document.getElementById('edit-delivery-now').checked = true;
    document.getElementById('edit-delivery-time').disabled = true;
    document.getElementById('edit-delivery-time').value = '';
  } else {
    document.getElementById('edit-delivery-by-time').checked = true;
    document.getElementById('edit-delivery-time').disabled = false;
    document.getElementById('edit-delivery-time').value = order.delivery_time || '';
  }

  openModal('edit-modal');
}

// Обработка изменения типа доставки
function handleDeliveryTypeChange(e) {
  const deliveryTimeInput = document.getElementById('edit-delivery-time');
  if (e.target.value === 'now') {
    deliveryTimeInput.disabled = true;
    deliveryTimeInput.value = '';
  } else {
    deliveryTimeInput.disabled = false;
  }
}

// Сохранение отредактированного заказа
async function saveEditedOrder() {
  const form = document.getElementById('edit-form');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
  const deliveryTime = document.getElementById('edit-delivery-time').value;

  // Валидация времени доставки
  if (deliveryType === 'by_time' && !deliveryTime) {
    showNotification('Укажите время доставки', 'error');
    return;
  }

  const updatedData = {
    full_name: document.getElementById('edit-full-name').value,
    email: document.getElementById('edit-email').value,
    phone: document.getElementById('edit-phone').value,
    delivery_address: document.getElementById('edit-delivery-address').value,
    delivery_type: deliveryType,
    comment: document.getElementById('edit-comment').value
  };

  if (deliveryType === 'by_time') {
    updatedData.delivery_time = deliveryTime;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/labs/api/orders/${currentOrderId}?api_key=${API_KEY}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при обновлении заказа');
    }

    closeModal('edit-modal');
    showNotification('Заказ успешно изменён', 'success');
    await loadOrders();
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    showNotification(error.message, 'error');
  }
}

// Удаление заказа
function deleteOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  currentOrderId = orderId;

  const orderDate = new Date(order.created_at).toLocaleString('ru-RU');
  document.getElementById('delete-order-info').textContent = `Заказ от ${orderDate}`;

  openModal('delete-modal');
}

// Подтверждение удаления заказа
async function confirmDeleteOrder() {
  try {
    const response = await fetch(`${API_BASE_URL}/labs/api/orders/${currentOrderId}?api_key=${API_KEY}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при удалении заказа');
    }

    closeModal('delete-modal');
    showNotification('Заказ успешно удалён', 'success');
    await loadOrders();
  } catch (error) {
    console.error('Ошибка при удалении заказа:', error);
    showNotification(error.message, 'error');
  }
}

// Открыть модальное окно
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
}

// Закрыть модальное окно
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
}

// Показать уведомление
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}
