// Модуль для работы с localStorage
// Ключ для хранения данных о заказе
const ORDER_STORAGE_KEY = 'lunchOrder';

// Сохранить выбранные блюда в localStorage
function saveOrderToLocalStorage(selectedDishes) {
  // Формируем объект с ID блюд
  const orderData = {
    soup: selectedDishes.soup ? selectedDishes.soup.id : null,
    main: selectedDishes.main ? selectedDishes.main.id : null,
    salad: selectedDishes.salad ? selectedDishes.salad.id : null,
    drink: selectedDishes.drink ? selectedDishes.drink.id : null,
    dessert: selectedDishes.dessert ? selectedDishes.dessert.id : null
  };

  // Сохраняем в localStorage
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderData));
}

// Загрузить ID выбранных блюд из localStorage
function loadOrderFromLocalStorage() {
  const orderDataString = localStorage.getItem(ORDER_STORAGE_KEY);

  if (!orderDataString) {
    return {
      soup: null,
      main: null,
      salad: null,
      drink: null,
      dessert: null
    };
  }

  try {
    return JSON.parse(orderDataString);
  } catch (error) {
    console.error('Ошибка при чтении данных заказа:', error);
    return {
      soup: null,
      main: null,
      salad: null,
      drink: null,
      dessert: null
    };
  }
}

// Очистить данные заказа из localStorage
function clearOrderFromLocalStorage() {
  localStorage.removeItem(ORDER_STORAGE_KEY);
}

// Получить выбранные блюда из массива dishes на основе сохранённых ID
function getSelectedDishesFromIds(orderIds, dishesArray) {
  return {
    soup: orderIds.soup ? dishesArray.find(d => d.id === orderIds.soup) || null : null,
    main: orderIds.main ? dishesArray.find(d => d.id === orderIds.main) || null : null,
    salad: orderIds.salad ? dishesArray.find(d => d.id === orderIds.salad) || null : null,
    drink: orderIds.drink ? dishesArray.find(d => d.id === orderIds.drink) || null : null,
    dessert: orderIds.dessert ? dishesArray.find(d => d.id === orderIds.dessert) || null : null
  };
}
