import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Import this for ES Module compatibility
import transactionsRouter from './pages/api/transactions.js'; // Import the transactions router
import db from './db.js'; 

const app = express();
const PORT = 3000;

// Get the current directory (__dirname equivalent in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

const frontendPath = path.join(__dirname, './dist');
app.use(express.static(frontendPath));
app.use('/api/transactions', transactionsRouter); // Prefix with /budgetbuddy

// Serve static files for the frontend
app.use('/budgetbuddy', express.static(path.join(__dirname, 'dist')));
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params; // Capture the transaction ID from the URL parameter
  const query = 'DELETE FROM Transactions WHERE Transaction_id = ?';

  try {
    await db.run(query, [id]); // Delete the transaction from the database
    res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Failed to delete transaction.' });
  }
});
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params; // Capture the transaction ID from the URL parameter
  const { amount, description, date } = req.body; // Get the updated values from the request body

  const query = `
    UPDATE Transactions
    SET amount = ?, description = ?, date = ?
    WHERE Transaction_id = ?
  `;

  try {
    await db.run(query, [amount, description, date, id]); // Update the transaction in the database
    res.status(200).json({ message: 'Transaction updated successfully.' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Failed to update transaction.' });
  }
});

// Catch-all route to serve the frontend
app.get('', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
