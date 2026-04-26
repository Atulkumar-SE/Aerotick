const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany(); // Caution: Clears existing users

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user seeded: admin@example.com / password123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
