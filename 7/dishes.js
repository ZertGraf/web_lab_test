// Глобальный массив для хранения данных о блюдах
let dishes = [];

// Функция для загрузки данных о блюдах с API
async function loadDishes() {
  try {
    // URL API для получения данных о блюдах
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    // Выполняем запрос к API
    const response = await fetch(apiUrl);

    // Проверяем, что запрос выполнен успешно
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Получаем данные в формате JSON
    const data = await response.json();

    // Сохраняем данные в глобальный массив
    dishes = data;

    console.log('Блюда успешно загружены:', dishes.length);

    // После загрузки данных отображаем блюда на странице
    displayDishes();

  } catch (error) {
    console.error('Ошибка при загрузке блюд:', error);

    // Показываем пользователю сообщение об ошибке
    const containers = [
      '#soups-container',
      '#mains-container',
      '#salads-container',
      '#drinks-container',
      '#desserts-container'
    ];

    containers.forEach(selector => {
      const container = document.querySelector(selector);
      if (container) {
        container.innerHTML = '<p style="color: red;">Ошибка загрузки данных. Пожалуйста, обновите страницу.</p>';
      }
    });
  }
}
