import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import transactionsRouter from './pages/api/transactions.js';
import userRouter from './routes/users.js'; 
import db from './db.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const frontendPath = path.join(__dirname, './dist');
app.use(express.static(frontendPath));

app.use('/budgetbuddy/api/transactions', transactionsRouter);
app.use('/budgetbuddy/api/users', userRouter);

app.delete('/budgetbuddy/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Transactions WHERE Transaction_id = ?';

  try {
    await db.run(query, [id]);
    res.status(200).json({ message: 'Transaction deleted successfully.' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Failed to delete transaction.' });
  }
});

app.put('/budgetbuddy/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, description, date } = req.body;

  const query = `
    UPDATE Transactions
    SET amount = ?, description = ?, date = ?
    WHERE Transaction_id = ?
  `;

  try {
    await db.run(query, [amount, description, date, id]);
    res.status(200).json({ message: 'Transaction updated successfully.' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Failed to update transaction.' });
  }
});

app.get('', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
