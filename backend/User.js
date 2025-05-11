
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Connecté à MongoDB');
        return mongoose.connection; // Ensure we return the connection
    } catch (error) {
        console.error('❌ Erreur MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;








