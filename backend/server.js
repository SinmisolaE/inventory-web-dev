const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//const { initializeRoles } = require('./utils/roleInitializer');

const authRoutes = require('./routes/authRoute');
const saleRoutes = require('./routes/saleRoute');
const stockRoutes = require('./routes/stockRoute');
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// auth
app.use('/auth', authRoutes);

// sale endpoint for super admin
app.use('/sales', saleRoutes);

// stock endpoint
app.use('/stocks', stockRoutes);

// user endpoint
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(async () => {
    app.listen(PORT);
    console.log(`Database connected - Server running on port ${PORT}`);
}).catch(err => {
    console.error('Database connection failed:', err);
});

