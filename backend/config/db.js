const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Ensure database directory and file exist
function initializeDB() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const defaultFoodItems = [
    {
      _id: "food_bowl_1",
      name: "Ahi Poke Curation Bowl",
      description: "Wild-caught yellowfin tuna, sliced avocado, pickled heirloom radishes, and organic black rice tossed in a light sesame-ginger glaze.",
      price: 18.50,
      category: "Signature Bowls",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      ingredients: "Yellowfin Tuna, Avocado, Radish, Black Rice, Sesame-Ginger Glaze",
      sourcing: "Pacific Fjord Harvest, Seattle, WA",
      prepTime: "12 mins",
      nutrients: { calories: "320 kcal", protein: "24g", carbs: "38g", fats: "10g", sodium: "290mg" }
    },
    {
      _id: "food_bowl_2",
      name: "Truffle Wild Mushroom Bowl",
      description: "Pan-seared forest mushrooms, charred organic asparagus, roasted truffled quinoa, and creamy cashew-garlic cheese.",
      price: 21.00,
      category: "Signature Bowls",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
      ingredients: "Forest Mushrooms, Asparagus, Quinoa, Cashew Cheese, Truffle Oil",
      sourcing: "Beverly Terraces Microgreens, Los Angeles, CA",
      prepTime: "15 mins",
      nutrients: { calories: "410 kcal", protein: "14g", carbs: "48g", fats: "16g", sodium: "320mg" }
    },
    {
      _id: "food_roll_1",
      name: "Prosciutto & Fig Fire-Roll",
      description: "Crisp wood-fired artisanal dough, 24-month aged Parma prosciutto, sweet organic mission figs, and fresh buffalo mozzarella.",
      price: 16.00,
      category: "Wood-Fired Rolls",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
      ingredients: "Artisan Dough, Parma Prosciutto, Mission Figs, Buffalo Mozzarella, Balsamic Glaze",
      sourcing: "Modena Vineyards, Emilia-Romagna, Italy",
      prepTime: "10 mins",
      nutrients: { calories: "480 kcal", protein: "21g", carbs: "52g", fats: "18g", sodium: "410mg" }
    },
    {
      _id: "food_roll_2",
      name: "Smoked Salmon Brioche Roll",
      description: "Hickory-cold smoked Atlantic salmon, whipped dill cream cheese, baby capers, and organic microgreens inside toasted brioche.",
      price: 17.50,
      category: "Wood-Fired Rolls",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800",
      ingredients: "Atlantic Salmon, Toasted Brioche, Dill Cream Cheese, Capers, Microgreens",
      sourcing: "Pacific Fjord Harvest, Seattle, WA",
      prepTime: "14 mins",
      nutrients: { calories: "390 kcal", protein: "26g", carbs: "35g", fats: "15g", sodium: "380mg" }
    },
    {
      _id: "food_dessert_1",
      name: "Saffron Cardamom Panna Cotta",
      description: "Silky premium cream infused with natural Kashmiri saffron and organic green cardamom, crowned with caramelized pistachios.",
      price: 9.50,
      category: "Artisan Desserts",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
      ingredients: "Fresh Cream, Kashmiri Saffron, Green Cardamom, Caramelized Pistachios",
      sourcing: "Ojai Saffron Meadows, Ojai, CA",
      prepTime: "8 mins",
      nutrients: { calories: "290 kcal", protein: "5g", carbs: "32g", fats: "14g", sodium: "95mg" }
    },
    {
      _id: "food_dessert_2",
      name: "Valrhona Ganache Cake",
      description: "72% Valrhona single-origin dark chocolate cake layered with Madagascar vanilla mousse and flaked French sea salt.",
      price: 12.00,
      category: "Artisan Desserts",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
      ingredients: "72% Valrhona Chocolate, Organic Flour, Madagascar Vanilla, Fleur de Sel",
      sourcing: "Valrhona Studio, Tain-l'Hermitage, France",
      prepTime: "6 mins",
      nutrients: { calories: "450 kcal", protein: "7g", carbs: "48g", fats: "26g", sodium: "120mg" }
    },
    {
      _id: "food_sandwich_1",
      name: "Aged Gruyere & Truffle Melt",
      description: "Slow-baked artisanal sourdough, caves-aged imported Swiss Gruyere, sweet caramelized onions, and stone-pressed white truffle butter.",
      price: 14.50,
      category: "Gourmet Sandwiches",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
      ingredients: "Artisanal Sourdough, Swiss Gruyere, Caramelized Onions, White Truffle Butter",
      sourcing: "Sourdough Craft Guild, NY",
      prepTime: "11 mins",
      nutrients: { calories: "510 kcal", protein: "19g", carbs: "45g", fats: "22g", sodium: "460mg" }
    },
    {
      _id: "food_sandwich_2",
      name: "Slow-Roasted Pork Belly Banh Mi",
      description: "24-hour slow-braised pork belly, pickled daikon radish, matchstick cucumber, fresh cilantro, and organic garlic-lime aioli.",
      price: 15.00,
      category: "Gourmet Sandwiches",
      image: "https://images.unsplash.com/photo-1540713434306-53f2485e493b?auto=format&fit=crop&q=80&w=800",
      ingredients: "Braised Pork Belly, Crusty Baguette, Pickled Daikon, Cucumber, Garlic Aioli",
      sourcing: "Redwood Pasture Farms, Sonoma, CA",
      prepTime: "15 mins",
      nutrients: { calories: "580 kcal", protein: "24g", carbs: "50g", fats: "28g", sodium: "530mg" }
    },
    {
      _id: "food_salad_1",
      name: "Burrata & Heirloom Tomato Salad",
      description: "Handmade local burrata cheese, vibrant organic heirloom tomatoes, cold-pressed basil pesto glaze, and aged Modena balsamic reduction.",
      price: 14.00,
      category: "Curated Salads",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      ingredients: "Burrata Cheese, Heirloom Tomatoes, Basil Pesto, Aged Balsamic Reduction",
      sourcing: "Heirloom Greens & Artisanal Dairy, CA",
      prepTime: "9 mins",
      nutrients: { calories: "340 kcal", protein: "12g", carbs: "14g", fats: "24g", sodium: "280mg" }
    },
    {
      _id: "food_salad_2",
      name: "Warm Goat Cheese & Pear Salad",
      description: "Crisp organic baby arugula, warm pecan-crusted French goat cheese rounds, sliced red pears, and local maple-mustard vinaigrette.",
      price: 15.50,
      category: "Curated Salads",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800",
      ingredients: "Baby Arugula, French Goat Cheese, Red Pears, Pecan Crust, Maple-Mustard Vinaigrette",
      sourcing: "Ojai Saffron Meadows, Ojai, CA",
      prepTime: "10 mins",
      nutrients: { calories: "380 kcal", protein: "10g", carbs: "26g", fats: "22g", sodium: "310mg" }
    },
    {
      _id: "food_pasta_1",
      name: "Lobster Saffron Ravioli",
      description: "Hand-rolled egg pasta sheets stuffed with sweet Maine lobster claw meat in a velvet saffron-chardonnay cream reduction.",
      price: 26.00,
      category: "Special Pasta",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
      ingredients: "Egg Pasta, Maine Lobster, Saffron, Chardonnay, Heavy Cream",
      sourcing: "Maine Shellfish Dock & Ojai Saffron Meadows, USA",
      prepTime: "18 mins",
      nutrients: { calories: "620 kcal", protein: "34g", carbs: "55g", fats: "28g", sodium: "590mg" }
    },
    {
      _id: "food_pasta_2",
      name: "Wild Boar Ragu Pappardelle",
      description: "Thick-cut fresh pappardelle tossed in a 12-hour slow-simmered wild boar shoulder ragu, topped with aged Pecorino Romano.",
      price: 23.50,
      category: "Special Pasta",
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=800",
      ingredients: "Fresh Pappardelle, Wild Boar Shoulder, Tomatoes, Pecorino Romano Cheese",
      sourcing: "Wild Game Provisions, Montana, USA",
      prepTime: "20 mins",
      nutrients: { calories: "680 kcal", protein: "38g", carbs: "62g", fats: "25g", sodium: "610mg" }
    },
    {
      _id: "food_african_1",
      name: "Moroccan Saffron Tagine",
      description: "Slow-braised organic grass-fed lamb, soft honeyed apricots, roasted almonds, and authentic Moroccan saffron couscous.",
      price: 24.50,
      category: "African Curations",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800",
      ingredients: "Grass-Fed Lamb, Honeyed Apricots, Saffron Couscous, Roasted Almonds, Spices",
      sourcing: "Atlas Valley Cooperatives, Morocco",
      prepTime: "25 mins",
      nutrients: { calories: "580 kcal", protein: "32g", carbs: "64g", fats: "22g", sodium: "480mg" }
    },
    {
      _id: "food_african_2",
      name: "Senegalese Jollof Rice",
      description: "Perfectly-steeped jasmine rice cooked in a rich, spiced reduction of organic red peppers, vine tomatoes, seared tiger prawns, and charred plantains.",
      price: 22.00,
      category: "African Curations",
      image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800",
      ingredients: "Spiced Jasmine Rice, Tiger Prawns, Red Peppers, Tomatoes, Charred Plantains",
      sourcing: "Dakar Coastal Co-op, Senegal",
      prepTime: "22 mins",
      nutrients: { calories: "490 kcal", protein: "28g", carbs: "58g", fats: "14g", sodium: "420mg" }
    },
    {
      _id: "food_african_3",
      name: "Ethiopian Spiced Doro Wat",
      description: "Tender chicken slow-braised in a complex berbere spice blend, organic clarified butter (niter kibbeh), served with soft fermented teff injera.",
      price: 23.00,
      category: "African Curations",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800",
      ingredients: "Braised Chicken, Berbere Spice, Clarified Butter, Fermented Teff Injera",
      sourcing: "Addis Highlands Organic Farms, Ethiopia",
      prepTime: "24 mins",
      nutrients: { calories: "520 kcal", protein: "35g", carbs: "45g", fats: "19g", sodium: "490mg" }
    }
  ];

  if (!fs.existsSync(dbPath)) {
    const initialData = {
      users: [
        // default admin user for initial testing
        {
          _id: "admin_user_01",
          name: "AMOH JOEL",
          email: "joelamoh65@gmail.com",
          password: "$2a$10$tiY2X0XwVT4ANsQF4axUAuEFAQrczXKmNEfUQymnmHPDlcYzyL7c.", // "admin123" salt-hashed
          cartData: {},
          isAdmin: true
        }
      ],
      foods: defaultFoodItems,
      orders: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log("Database initialized with seed data at " + dbPath);
  } else {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      if (!parsed.foods || parsed.foods.length === 0) {
        parsed.foods = defaultFoodItems;
        fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf-8');
        console.log("Seeded database items into existing db file.");
      }
    } catch (e) {
      console.error("DB initialization check failed, resetting to defaults", e);
    }
  }
}

function readDB() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { users: [], foods: [], orders: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error writing to database:", error);
    return false;
  }
}

module.exports = {
  initializeDB,
  readDB,
  writeDB
};
