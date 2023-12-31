import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRoutes from './components/users/routes.js';
import courseRoutes from './components/courses/routes.js';

dotenv.config();

const app = express();

app.use(morgan('combined'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully, under the name: ', process.env.MONGO_URI))
    .catch((error) => {
        console.log(error);
        process.exit(0);
    });

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection closed due to application termination');
        process.exit(0);
    });
});

// Middleware
app.use(express.json());

// Routes
app.use("/static", express.static('public'));
app.use('/courses', courseRoutes);
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end();
});

// Handle all other routes
app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Not Found',
    });
});

// Start server
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.statusCode || 500).json({
        status: error.statusText || 'error',
        message: error.message,
        data: null
    });
});

// Close connection at the end
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
