const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...Atul Jaiswal');
});

const PORT = process.env.PORT || 5000;

const seedAdminUser = async () => {
  const User = require('./models/User');
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });
      console.log('Admin user seeded: admin@example.com / password123');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  seedAdminUser();
});
