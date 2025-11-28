// storage.js
const STORAGE_KEY = 'lunch_order';

function saveOrder(selectedDishes) {
    const orderData = {
        soup: selectedDishes.soup?.keyword || null,
        main: selectedDishes.main?.keyword || null,
        salad: selectedDishes.salad?.keyword || null,
        drink: selectedDishes.drink?.keyword || null,
        dessert: selectedDishes.dessert?.keyword || null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
}

function loadOrder() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };
}

function clearOrder() {
    localStorage.removeItem(STORAGE_KEY);
}