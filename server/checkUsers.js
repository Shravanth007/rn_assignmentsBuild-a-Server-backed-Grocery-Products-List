import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Get all users
    const users = await User.find({}).select('name email createdAt');

    console.log('\n=== ALL USERS IN DATABASE ===');
    console.log('Total users:', users.length);
    console.log('\nUsers:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}, Email: ${user.email}, Created: ${user.createdAt}`);
    });

    console.log('\n=== END ===\n');

    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
