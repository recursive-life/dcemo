require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shopez';
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('⚠️  MongoDB is not available. Some features may not work.');
    console.log('💡 To fix this:');
    console.log('   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
    console.log('   2. Or use MongoDB Atlas: https://www.mongodb.com/atlas');
    console.log('   3. Or set MONGO_URI environment variable');
    
    // Don't exit the process, let the server run without database
    // The server will still start but database operations will fail
  }
};

module.exports = connectDB; 