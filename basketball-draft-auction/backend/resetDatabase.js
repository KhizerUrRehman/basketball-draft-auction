const mongoose = require('mongoose');
const Captain = require('./models/Captain');
const Player = require('./models/Player');

// MongoDB connection string
const mongoURI = 'mongodb+srv://admin:admin123@14900.xpyfq.mongodb.net/test?retryWrites=true&w=majority';

const resetDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Delete data from collections
    await Captain.deleteMany();
    await Player.deleteMany();

    console.log('Deleted all existing data.');

    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error resetting the database:', error);
    process.exit(1);
  }
};

resetDatabase();
