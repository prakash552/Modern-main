const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB successfully connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const productsData = {
    men: [
        {
            id: 1,
            name: "Classic Overcoat",
            price: 299,
            image: "https://images.unsplash.com/photo-1599388147253-abda18abfd8b?q=80&w=600&auto=format&fit=crop",
            category: "men",
            stock: 15,
            description: "A premium wool overcoat for men.",
            rating: 4.5,
            reviews: 12
        },
        {
            id: 2,
            name: "Minimalist T-Shirt",
            price: 45,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
            category: "men",
            stock: 50,
            description: "Essential minimalist t-shirt.",
            rating: 4.8,
            reviews: 42
        },
        {
            id: 3,
            name: "Tailored Trousers",
            price: 120,
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop",
            category: "men",
            stock: 30,
            description: "Sharp and tailored trousers for everyday elegance.",
            rating: 4.6,
            reviews: 18
        }
    ],
    women: [
        {
            id: 4,
            name: "Silk Slip Dress",
            price: 185,
            image: "https://images.unsplash.com/photo-1595777457583-95e059f581ce?q=80&w=600&auto=format&fit=crop",
            category: "women",
            stock: 20,
            description: "Beautiful and elegant silk slip dress.",
            rating: 4.9,
            reviews: 35
        },
        {
            id: 5,
            name: "Cashmere Sweater",
            price: 220,
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
            category: "women",
            stock: 25,
            description: "Cozy and warm cashmere sweater.",
            rating: 4.7,
            reviews: 24
        },
        {
            id: 6,
            name: "Pleated Skirt",
            price: 85,
            image: "https://images.unsplash.com/photo-1583496661160-c5dcb4c0ce3d?q=80&w=600&auto=format&fit=crop",
            category: "women",
            stock: 40,
            description: "Classic pleated skirt design.",
            rating: 4.5,
            reviews: 15
        }
    ],
    kids: [
        {
            id: 7,
            name: "Cotton Play Set",
            price: 55,
            image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=600&auto=format&fit=crop",
            category: "kids",
            stock: 35,
            description: "Comfortable play set for kids.",
            rating: 4.8,
            reviews: 40
        },
        {
            id: 8,
            name: "Denim Overalls",
            price: 65,
            image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
            category: "kids",
            stock: 22,
            description: "Durable denim overalls.",
            rating: 4.6,
            reviews: 18
        },
        {
            id: 9,
            name: "Organic Sleepwear",
            price: 40,
            image: "https://images.unsplash.com/photo-1522771930-78848d926c56?q=80&w=600&auto=format&fit=crop",
            category: "kids",
            stock: 45,
            description: "Soft and safe organic sleepwear.",
            rating: 4.9,
            reviews: 50
        }
    ]
};

const seedDatabase = async () => {
    try {
        await Product.deleteMany();
        
        let allProducts = [];
        for (const cat in productsData) {
            allProducts = allProducts.concat(productsData[cat]);
        }
        
        // Convert 'id' to somewhat numeric if needed, but mongo will auto-gen _id.
        // We can just rely on auto-generated _id mapping to id via virtuals.
        const insertedProducts = await Product.insertMany(allProducts);
        console.log(`Seeded ${insertedProducts.length} products`);

        await User.deleteMany();
        console.log('Cleared users collection');

        // Create initial admin user
        const bcrypt = require('bcryptjs');
        const adminWait = await User.create({
            name: 'Admin',
            email: 'admin@elevate.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Created Admin User: admin@elevate.com / admin123');

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedDatabase();
