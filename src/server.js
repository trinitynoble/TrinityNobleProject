import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import this for ES Module compatibility
import transactionsRouter from './pages/api/transactions.js'; // Import the transactions router

const app = express();
const PORT = 3000;

// Get the current directory (__dirname equivalent in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Use the transactions router with the base URL
app.use('/budgetbuddy/pages/api/transactions', transactionsRouter); // Prefix with /budgetbuddy

// Serve static files for the frontend
app.use('/budgetbuddy', express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the frontend for non-API requests
app.get('/budgetbuddy/*', (req, res) => {
  if (!req.originalUrl.startsWith('/budgetbuddy/pages/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).send('API route not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/budgetbuddy`);
});
