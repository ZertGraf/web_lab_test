const dishes = [
    // Супы (6 штук: 2 рыбных, 2 мясных, 2 вегетарианских)
    {
        keyword: 'thai-shark-soup',
        name: 'Тайский суп с акулой',
        price: 850,
        category: 'soup',
        kind: 'fish',
        count: '350 мл',
        image: 'images/Тайский суп с акулой.png'
    },
    {
        keyword: 'salmon-soup',
        name: 'Суп из лосося со сливками',
        price: 920,
        category: 'soup',
        kind: 'fish',
        count: '380 мл',
        image: 'images/salmon-soup.png'
    },
    {
        keyword: 'crocodile-cream-soup',
        name: 'Крем-суп из крокодила',
        price: 920,
        category: 'soup',
        kind: 'meat',
        count: '400 мл',
        image: 'images/Крем-суп из крокодила.png'
    },
    {
        keyword: 'python-broth',
        name: 'Бульон с мясом питона и лемонграссом',
        price: 780,
        category: 'soup',
        kind: 'meat',
        count: '350 мл',
        image: 'images/Бульон с мясом питона и лемонграссом.png'
    },
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 650,
        category: 'soup',
        kind: 'veg',
        count: '350 мл',
        image: 'images/gazpacho.png'
    },
    {
        keyword: 'mushroom-soup',
        name: 'Грибной крем-суп',
        price: 720,
        category: 'soup',
        kind: 'veg',
        count: '370 мл',
        image: 'images/mushroom-soup.png'
    },

    // Главные блюда (6 штук: 2 рыбных, 2 мясных, 2 вегетарианских)
    {
        keyword: 'smoked-eel',
        name: 'Копчёный угорь с рисом',
        price: 1350,
        category: 'main',
        kind: 'fish',
        count: '290 г',
        image: 'images/Копчёный угорь с рисом.png'
    },
    {
        keyword: 'tiger-shrimp',
        name: 'Тигровые креветки в соусе чили',
        price: 1750,
        category: 'main',
        kind: 'fish',
        count: '220 г',
        image: 'images/Тигровые креветки в соусе чили.png'
    },
    {
        keyword: 'kangaroo-steak',
        name: 'Стейк из кенгуру medium-rare',
        price: 1650,
        category: 'main',
        kind: 'meat',
        count: '250 г',
        image: 'images/Стейк из кенгуру medium-rare.png'
    },
    {
        keyword: 'crocodile-stew',
        name: 'Рагу из крокодила с овощами',
        price: 1550,
        category: 'main',
        kind: 'meat',
        count: '300 г',
        image: 'images/Рагу из крокодила с овощами.png'
    },
    {
        keyword: 'vegetable-curry',
        name: 'Овощное карри с нутом',
        price: 980,
        category: 'main',
        kind: 'veg',
        count: '320 г',
        image: 'images/vegetable-curry.png'
    },
    {
        keyword: 'tofu-teriyaki',
        name: 'Тофу терияки с овощами',
        price: 1050,
        category: 'main',
        kind: 'veg',
        count: '280 г',
        image: 'images/tofu-teriyaki.png'
    },

    // Салаты и стартеры (6 штук: 1 рыбный, 1 мясной, 4 вегетарианских)
    {
        keyword: 'tuna-salad',
        name: 'Салат с тунцом и авокадо',
        price: 780,
        category: 'salad',
        kind: 'fish',
        count: '230 г',
        image: 'images/tuna-salad.png'
    },
    {
        keyword: 'chicken-caesar',
        name: 'Цезарь с курицей',
        price: 720,
        category: 'salad',
        kind: 'meat',
        count: '250 г',
        image: 'images/chicken-caesar.png'
    },
    {
        keyword: 'greek-salad',
        name: 'Греческий салат',
        price: 620,
        category: 'salad',
        kind: 'veg',
        count: '240 г',
        image: 'images/greek-salad.png'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 680,
        category: 'salad',
        kind: 'veg',
        count: '200 г',
        image: 'images/caprese.png'
    },
    {
        keyword: 'vegetable-spring-rolls',
        name: 'Овощные спринг-роллы',
        price: 550,
        category: 'salad',
        kind: 'veg',
        count: '180 г',
        image: 'images/vegetable-spring-rolls.png'
    },
    {
        keyword: 'hummus-plate',
        name: 'Хумус с овощами',
        price: 590,
        category: 'salad',
        kind: 'veg',
        count: '220 г',
        image: 'images/hummus-plate.png'
    },

    // Напитки (6 штук: 3 холодных, 3 горячих)
    {
        keyword: 'thai-tea',
        name: 'Тайский чай со льдом',
        price: 350,
        category: 'drink',
        kind: 'cold',
        count: '400 мл',
        image: 'images/Тайский чай со льдом.png'
    },
    {
        keyword: 'mango-smoothie',
        name: 'Манговый смузи',
        price: 420,
        category: 'drink',
        kind: 'cold',
        count: '350 мл',
        image: 'images/Манговый смузи.png'
    },
    {
        keyword: 'lemonade',
        name: 'Домашний лимонад с мятой',
        price: 380,
        category: 'drink',
        kind: 'cold',
        count: '500 мл',
        image: 'images/Домашний лимонад с мятой.png'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 320,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/cappuccino.png'
    },
    {
        keyword: 'green-tea',
        name: 'Зелёный чай',
        price: 280,
        category: 'drink',
        kind: 'hot',
        count: '350 мл',
        image: 'images/green-tea.png'
    },
    {
        keyword: 'hot-chocolate',
        name: 'Горячий шоколад',
        price: 340,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/hot-chocolate.png'
    },

    // Десерты (6 штук: 3 маленькая порция, 2 средняя порция, 1 большая порция)
    {
        keyword: 'tiramisu-small',
        name: 'Тирамису',
        price: 450,
        category: 'dessert',
        kind: 'small',
        count: '120 г',
        image: 'images/tiramisu-small.png'
    },
    {
        keyword: 'panna-cotta-small',
        name: 'Панна котта',
        price: 420,
        category: 'dessert',
        kind: 'small',
        count: '130 г',
        image: 'images/panna-cotta-small.png'
    },
    {
        keyword: 'creme-brulee-small',
        name: 'Крем-брюле',
        price: 480,
        category: 'dessert',
        kind: 'small',
        count: '110 г',
        image: 'images/creme-brulee-small.png'
    },
    {
        keyword: 'cheesecake-medium',
        name: 'Чизкейк',
        price: 650,
        category: 'dessert',
        kind: 'medium',
        count: '180 г',
        image: 'images/cheesecake-medium.png'
    },
    {
        keyword: 'chocolate-fondant-medium',
        name: 'Шоколадный фондан',
        price: 680,
        category: 'dessert',
        kind: 'medium',
        count: '170 г',
        image: 'images/chocolate-fondant-medium.png'
    },
    {
        keyword: 'napoleon-cake-large',
        name: 'Торт Наполеон',
        price: 850,
        category: 'dessert',
        kind: 'large',
        count: '250 г',
        image: 'images/napoleon-cake-large.png'
    }
];
