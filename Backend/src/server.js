import express, { json } from 'express';
import { createServer } from 'http'; // For creating an HTTP server
import { Server } from 'socket.io';  // Socket.IO server
import { config } from 'dotenv';
import connectDB from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import protect from './middleware/auth.middleware.js';
import cors from 'cors'; // Import CORS middleware

config(); // Load environment variables

const app = express();
connectDB(); // Connect to MongoDB

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true, // Allow credentials (like cookies, authorization headers)
}));

app.use(json()); // Body parser middleware

const httpServer = createServer(app); // Create the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',  // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allowed HTTP methods
  },
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Welcome user with ID: ${req.user}` });
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Listen for messages
  socket.on('message', (data) => {
    // Broadcast the message to everyone
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
