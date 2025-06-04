import { food_list } from './assets/guipaopao.js'; 
import FoodModel from './models/foodModel.js';
import { connectDB } from './config/db.js';

connectDB()
  .then(async () => {
    await FoodModel.deleteMany({});

    await FoodModel.insertMany(food_list);

    console.log("Data seeded!");
    process.exit();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
