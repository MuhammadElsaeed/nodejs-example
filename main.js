import express from 'express';
import courseRoutes from './components/courses/routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

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
app.use('/courses', courseRoutes);

// Default route
app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end();
    console.log('I am route handler /');
});

// Start server
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Close connection at the end
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
