// Функция для фильтрации блюд в секции
function filterDishes(section, kind) {
    const dishesContainer = section.querySelector('.dishes-container');
    const dishes = dishesContainer.querySelectorAll('.dish-item');

    dishes.forEach(dish => {
        if (kind === null || dish.getAttribute('data-kind') === kind) {
            dish.style.display = '';
        } else {
            dish.style.display = 'none';
        }
    });
}

// Инициализация фильтров
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');

    sections.forEach(section => {
        const filterButtons = section.querySelectorAll('.filter-button');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const kind = button.getAttribute('data-kind');

                // Проверяем, была ли кнопка уже активна
                const wasActive = button.classList.contains('active');

                // Убираем класс active у всех кнопок фильтров в этой секции
                filterButtons.forEach(btn => btn.classList.remove('active'));

                if (wasActive) {
                    // Если кнопка была активна, показываем все блюда
                    filterDishes(section, null);
                } else {
                    // Иначе делаем кнопку активной и фильтруем
                    button.classList.add('active');
                    filterDishes(section, kind);
                }
            });
        });
    });
});
