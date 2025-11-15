const dishes = [
  // Супы (2 рыбных, 2 мясных, 2 вегетарианских)
  {
    keyword: 'thai-shark-soup',
    name: 'Тайский суп с акулой',
    price: 850,
    category: 'soup',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=60',
    kind: 'fish'
  },
  {
    keyword: 'salmon-soup',
    name: 'Норвежский суп из лосося',
    price: 780,
    category: 'soup',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=600&auto=format&fit=crop&q=60',
    kind: 'fish'
  },
  {
    keyword: 'crocodile-cream-soup',
    name: 'Крем-суп из крокодила',
    price: 920,
    category: 'soup',
    count: '400 мл',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'python-broth',
    name: 'Бульон с мясом питона и лемонграссом',
    price: 780,
    category: 'soup',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'tomato-gazpacho',
    name: 'Гаспачо из томатов',
    price: 650,
    category: 'soup',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },
  {
    keyword: 'mushroom-cream-soup',
    name: 'Грибной крем-суп',
    price: 720,
    category: 'soup',
    count: '400 мл',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },

  // Главные блюда (2 рыбных, 2 мясных, 2 вегетарианских)
  {
    keyword: 'smoked-eel',
    name: 'Копчёный угорь с рисом',
    price: 1350,
    category: 'main',
    count: '290 г',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&auto=format&fit=crop&q=60',
    kind: 'fish'
  },
  {
    keyword: 'tiger-shrimp',
    name: 'Тигровые креветки в соусе чили',
    price: 1750,
    category: 'main',
    count: '220 г',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=60',
    kind: 'fish'
  },
  {
    keyword: 'kangaroo-steak',
    name: 'Стейк из кенгуру medium-rare',
    price: 1650,
    category: 'main',
    count: '250 г',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'crocodile-stew',
    name: 'Рагу из крокодила с овощами',
    price: 1550,
    category: 'main',
    count: '300 г',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'peking-duck',
    name: 'Утка по-пекински с экзотическими специями',
    price: 1200,
    category: 'main',
    count: '280 г',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'ostrich-fillet',
    name: 'Филе страуса на гриле',
    price: 1450,
    category: 'main',
    count: '260 г',
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'tofu-teriyaki',
    name: 'Тофу терияки с овощами',
    price: 950,
    category: 'main',
    count: '280 г',
    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },
  {
    keyword: 'veggie-curry',
    name: 'Овощное карри с кокосовым молоком',
    price: 890,
    category: 'main',
    count: '320 г',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },

  // Салаты и стартеры (1 рыбный, 1 мясной, 4 вегетарианских)
  {
    keyword: 'tuna-tartare',
    name: 'Тартар из тунца с авокадо',
    price: 850,
    category: 'salad',
    count: '180 г',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&auto=format&fit=crop&q=60',
    kind: 'fish'
  },
  {
    keyword: 'duck-salad',
    name: 'Салат с утиной грудкой',
    price: 790,
    category: 'salad',
    count: '200 г',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60',
    kind: 'meat'
  },
  {
    keyword: 'greek-salad',
    name: 'Греческий салат',
    price: 550,
    category: 'salad',
    count: '250 г',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },
  {
    keyword: 'caesar-veggie',
    name: 'Вегетарианский цезарь',
    price: 620,
    category: 'salad',
    count: '220 г',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },
  {
    keyword: 'quinoa-salad',
    name: 'Салат с киноа и овощами гриль',
    price: 680,
    category: 'salad',
    count: '240 г',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },
  {
    keyword: 'burrata-tomato',
    name: 'Буратта с томатами и базиликом',
    price: 780,
    category: 'salad',
    count: '200 г',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&auto=format&fit=crop&q=60',
    kind: 'veg'
  },

  // Напитки (3 холодных, 3 горячих)
  {
    keyword: 'thai-tea',
    name: 'Тайский чай со льдом',
    price: 350,
    category: 'drink',
    count: '400 мл',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=60',
    kind: 'cold'
  },
  {
    keyword: 'mango-smoothie',
    name: 'Манговый смузи',
    price: 420,
    category: 'drink',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=60',
    kind: 'cold'
  },
  {
    keyword: 'lemonade',
    name: 'Домашний лимонад с мятой',
    price: 380,
    category: 'drink',
    count: '500 мл',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=60',
    kind: 'cold'
  },
  {
    keyword: 'matcha-latte',
    name: 'Матча латте',
    price: 450,
    category: 'drink',
    count: '350 мл',
    image: 'https://images.unsplash.com/photo-1536013266657-999fa65eb5b5?w=600&auto=format&fit=crop&q=60',
    kind: 'hot'
  },
  {
    keyword: 'espresso',
    name: 'Эспрессо',
    price: 250,
    category: 'drink',
    count: '30 мл',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=60',
    kind: 'hot'
  },
  {
    keyword: 'hot-chocolate',
    name: 'Горячий шоколад',
    price: 380,
    category: 'drink',
    count: '300 мл',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=60',
    kind: 'hot'
  },

  // Десерты (3 маленьких, 2 средних, 1 большой)
  {
    keyword: 'panna-cotta',
    name: 'Панна котта с ягодным соусом',
    price: 350,
    category: 'dessert',
    count: '150 г',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=60',
    kind: 'small'
  },
  {
    keyword: 'tiramisu-mini',
    name: 'Мини тирамису',
    price: 380,
    category: 'dessert',
    count: '120 г',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=60',
    kind: 'small'
  },
  {
    keyword: 'macarons',
    name: 'Макаронс (3 шт)',
    price: 320,
    category: 'dessert',
    count: '75 г',
    image: 'https://images.unsplash.com/photo-1558312657-7af9ea0c3186?w=600&auto=format&fit=crop&q=60',
    kind: 'small'
  },
  {
    keyword: 'cheesecake',
    name: 'Чизкейк Нью-Йорк',
    price: 550,
    category: 'dessert',
    count: '200 г',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&auto=format&fit=crop&q=60',
    kind: 'medium'
  },
  {
    keyword: 'brownie',
    name: 'Шоколадный брауни с мороженым',
    price: 480,
    category: 'dessert',
    count: '180 г',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=600&auto=format&fit=crop&q=60',
    kind: 'medium'
  },
  {
    keyword: 'chocolate-fondant',
    name: 'Шоколадный фондан XXL',
    price: 780,
    category: 'dessert',
    count: '350 г',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=60',
    kind: 'large'
  }
];
