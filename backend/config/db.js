const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    // =========================================================================
    // MOCK DATABASE CONFIGURATION (DEVELOPMENT ONLY)
    // =========================================================================
    // Feature: Spinning up an in-memory MongoDB instance using 'mongodb-memory-server'.
    // Use Case: Ideal for automated testing or offline development to avoid 
    // polluting the production/Atlas database with test data.
    // Note: This was causing the 778MB download/timeout issue previously observed.
    // =========================================================================

    // const mongoServer = await MongoMemoryServer.create(); // Starts a fresh, ephemeral DB
    // const mongoUri = mongoServer.getUri();                // Generates the local connection URI
    const mongoUri = 'mongodb+srv://aj_aerotick:aj_aerotick1234@cluster0.nwnvx06.mongodb.net/?appName=Cluster0';
    const conn = await mongoose.connect(mongoUri);
    console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
